import connectDb from "../../utils/connectDb";
import Product from "../../models/Product";
import Cart from "../../models/Cart";
import Order from "../../models/Order";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import calculateCartTotal from "../../utils/calculateCartTotal";
import Stripe from "stripe";
import uuidv4 from "uuid/v4";
connectDb();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { paymentData } = req.body;

  try {
    // 1. verify token and get userId
    if (!"authorization" in req.headers) {
      return res.status(400).send("No authorization token");
    }
    console.log(req.headers.authorization);
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    // 2. find cart for the user based on userId and populate products
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product",
    });
    // return res.status(200).json(cart.products);

    // 3. recaculate and verify cart total
    const { cartTotal, stripeTotal } = calculateCartTotal(cart.products);

    // 4. lookup if stripe account with provided email address existed
    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1,
    });
    const existingCustomer = prevCustomer.data.length > 0;
    // 5. if not, create new account
    let newCustomer;
    if (!existingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id,
      });
    }
    // 6. create charge with total and send receipt email
    const customer =
      (existingCustomer && prevCustomer.data[0].id) || newCustomer.id;
    await stripe.charges.create(
      {
        currency: "AUD",
        amount: stripeTotal,
        receipt_email: paymentData.email,
        customer,
        description: `Checkout | ${paymentData.email} | ${paymentData.id}`,
      },
      {
        idempotency_key: uuidv4(),
      }
    );

    // 7. create order
    await new Order({
      user: userId,
      email: paymentData.email,
      total: cartTotal,
      products: cart.products,
    }).save();
    // 8. clear cart
    await Cart.findOneAndUpdate(
      {
        _id: cart._id,
      },
      {
        $set: { products: [] },
      }
    );
    // 9. send success response
    return res.status(200).send("Checkout Success.");
  } catch (error) {
    console.error(error);
    return res.status(500).json("Error processing charge.");
  }
};
