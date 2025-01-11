import { Schema, model } from "mongoose";
import cloudinary from "../config/cloudinary.config.js";

const CategorySchema = new Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

CategorySchema.methods.deleteImage = async function () {
  try {
    if (this.image.public_id !== null && this.image.url !== "") {
      const publicId = this.image.public_id;
      await cloudinary.uploader.destroy(publicId);
      console.log("Successfully deleted profile picture ");
    }
  } catch (error) {
    console.log(error);
  }
};

const Category = model("Category", CategorySchema);
export default Category;
