import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
