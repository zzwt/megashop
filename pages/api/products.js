import Product from "../../models/Product";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  try {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pageSize);
    const docNum = await Product.countDocuments();
    const totalPages = Math.ceil(docNum / pageSize);
    let products;
    if (page === 1) {
      products = await Product.find().limit(pageSize);
    } else {
      const skip = pageSize * (page - 1);
      products = await Product.find().skip(skip).limit(pageSize);
    }

    return res.status(200).json({ products, totalPages });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
