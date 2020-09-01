import mongoose from "mongoose";
import { nanoid } from "nanoid";

const { String } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    unique: true,
    default: nanoid,
  },
  mediaUrl: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
