import mongoose from "mongoose";
import Item from "./Item";

Item.discriminator(
  "Book",
  new mongoose.Schema({
    author: { type: String, required: true, text: true },
  })
);

export default mongoose.model("Book");
