import { Schema, model } from "mongoose";

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
        "T-Shirt",
        "Hoodie",
        "Cap",
        "Poster",
        "Sticker",
        "Vinyl",
        "CD",
        "Cassette",
        "Keychain",
        "Mug",
        "Other",
      ],
    },
    image: {
      public_id: {
        type: String,
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
    },

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

ProductSchema.methods.deleteImages = async function () {
  try {
  } catch (error) {
    console.log(error);
  }
};

const Product = model("Product", ProductSchema);
export default Product;
