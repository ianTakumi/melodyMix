import { Schema, model, Document } from "mongoose";
import { IUser } from "../types/user";
import jwt from "jsonwebtoken";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Man", "Woman", "Prefer not to say"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    profile_picture: {
      public_id: {
        type: String,
        default: "cihdkwnga1whsejrbmkb",
        trim: true,
      },
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dydg4oqy5/image/upload/v1733662639/cihdkwnga1whsejrbmkb.png",
        trim: true,
      },
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      default: "customer",
      enum: ["customer", "admin", "artist"],
      trim: true,
    },
    socialAccounts: [
      {
        provider: {
          type: String,
          enum: ["google", "facebook"],
          required: true,
        },
        provider_id: {
          type: String,
          required: true,
        },
      },
    ],
    fcm_token: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_TIME as string,
  });
};

const User = model<IUser>("User", UserSchema);
export default User;
