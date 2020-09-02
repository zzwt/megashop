import Order from "../../models/Order";
import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  if (!"authorization" in req.headers) {
    return res.status(400).send("Please login.");
  }
  const { userId } = jwt.verify(
    req.headers.authorization,
    process.env.JWT_SECRET
  );
  try {
    const orders = await Order.find({ user: userId })
      .sort({
        createdAt: "desc",
      })
      .populate({
        path: "products.product",
        model: "Product",
      });
    return res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
