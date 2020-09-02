import Product from "../../models/Product";
import Cart from "../../models/Cart";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      getProduct(req, res);
      break;
    case "POST":
      createProduct(req, res);
      break;
    case "DELETE":
      deleteProduct(req, res);
      break;
    default:
      return res.status(405).send(`Method ${req.method} not allowed.`);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.query._id });
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const createProduct = async (req, res) => {
  const { name, price, description, mediaUrl } = req.body;
  if (!name || !price || !description || !mediaUrl) {
    return res.status(422).send("Product missing one or more fields.");
  }
  try {
    let product = new Product({
      name,
      price,
      description,
      mediaUrl,
    });
    product = await product.save();
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
const deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndRemove({ _id: req.query._id });
    await Cart.updateMany(
      { "products.product": req.query._id },
      {
        $pull: { products: { product: req.query._id } },
      }
    );
    return res.status(200).send("Product Removed");
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
