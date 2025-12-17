import mongoose from "mongoose";

const productshema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    people: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productshema);

export default Product;
