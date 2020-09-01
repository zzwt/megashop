import connectDb from "../../utils/connectDb";
import Cart from "../../models/Cart";
import Product from "../../models/Product";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

connectDb();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      getCart(req, res);
      break;
    case "PUT":
      addToCart(req, res);
      break;
    case "DELETE":
      removeCartItem(req, res);
      break;
    default:
      return res.status(400).send(`Unsupported Method ${req.method}`);
  }
};

const getCart = async (req, res) => {
  if (!"authorization" in req.headers) {
    return res.status(400).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product",
    });
    return res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json("Error fetching cart items. Please contact admin.");
  }
};

const removeCartItem = async (req, res) => {
  const { productId } = req.query;
  if (!"authorization" in req.headers) {
    return res.status(400).send("No authorization token");
  }
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: { products: { product: productId } },
      },
      { new: true }
    ).populate({
      path: "products.product",
      model: "Product",
    });
    return res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json("Error fetching cart items. Please contact admin.");
  }
};

const addToCart = async (req, res) => {
  const { ObjectId } = mongoose.Types;
  const { productId, userId, quantity } = req.body;
  if (!productId || !userId) {
    return res
      .status(422)
      .send("Missing info adding to Cart. Please try later... ");
  }
  try {
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      console.log(cart);

      const productInCart = cart.products.find((cartItem) => {
        return ObjectId(productId).equals(cartItem.product);
      });
      if (productInCart) {
        await Cart.findOneAndUpdate(
          {
            _id: cart._id,
            "products.product": productId,
          },
          {
            $inc: { "products.$.quantity": quantity },
          }
        );
        // cart.products[productInCart].quantity += quantity;
      } else {
        await Cart.findOneAndUpdate(
          {
            _id: cart._id,
          },
          {
            $addToSet: { products: { quantity, product: productId } },
          }
        );
      }
      return res.status(200).send("Cart Updated.");
    } else {
      return res
        .status(500)
        .send("Can't added product to cart. Contact Admin.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Can't added product to cart. Contact Admin.");
  }
};
