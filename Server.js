import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./Config/DB.js";
import { data } from "react-router-dom";
import Product from "./ProductSchema/product.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/booking", async (req, res) => {
  try {
    const item = await Product.find({});

    res.status(201).json({ succes: true, data: item });
  } catch (error) {
    console.error("error getting products");
    res.status(500).json({ succes: false, mssge: "server error" });
  }
});

app.post("/api/booking", async (req, res) => {
  const item = req.body;

  if (
    !item.name ||
    !item.email ||
    !item.departure ||
    !item.arrival ||
    !item.address ||
    !item.phone ||
    !item.people ||
    !item.type
  ) {
    return res.status(400).json({ success: false, message: "fill the blank" });
  }

  const newProduct = new Product(item);

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("error to save product");
    res.status(500).json({ success: false, message: "server error" });
  }
});

app.delete("/api/booking/ :id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ succes: true, msge: "item deleted" });
  } catch (error) {
    res.status(400).json({ succes: false, msge: "error deleting" });
  }
});

app.put("/api/booking/ :id", async (req, res) => {
  const { id } = req.params;

  try {
    const updateditem = await Product.findByIdAndUpdate(id);
    res.status(200).json({ success: true, updateditem });
  } catch (error) {
    res.status(404).json({ success: false, msge: "Not found" });
  }
});

app.listen(port, () => {
  connectDb();
  console.log(`🚀 Server running on http://localhost:${port}`);
});
