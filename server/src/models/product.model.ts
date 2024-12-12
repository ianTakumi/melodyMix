import { Schema, model } from "mongoose";
import { IProduct } from "../types/product";

const ProductSchema = new Schema(
  {
    artistId: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Clothing",
        "Music & Vinyl",
        "Accessories",
        "Collectibles",
        "Home Decor",
        "Live Event Merchandise",
        "Special Editions",
        "Beauty & Lifestyle",
        "Tech Gadgets",
      ],
    },
    images: [
      {
        public_id: {
          type: String,
          trim: true,
        },
        url: {
          type: String,
          trim: true,
        },
      },
    ],
    stock: {
      type: Number,
      required: [true, "Number of stock is required"],
      min: [0, "Stock cannot be negative"],
    },
    sales_count: {
      type: Number,
      default: 0,
    },
    views_count: {
      type: Number,
      default: 0,
    },
  },
  { collection: "products", timestamps: true }
);

const Product = model<IProduct>("Product", ProductSchema);
export default Product;
