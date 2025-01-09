import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
dotenv.config();

const allowedTypes = ["image/jpeg", "image/png", "image/gif", "images/jpg"];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = (file: any) => {
  return new Promise((resolve, reject) => {
    if (!allowedTypes.includes(file.mimetype)) {
      reject(
        new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed.")
      );
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "categories" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

export default cloudinary;
