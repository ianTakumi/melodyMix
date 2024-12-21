import { Schema, model, Document } from "mongoose";
import { IUser } from "../types/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.config";

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
    password: {
      type: String,
      trim: true,
      minlength: [8, "Password must be at least 8 characters long"],
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
        trim: true,
      },
      url: {
        type: String,
        trim: true,
      },
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      default: "customer",
      enum: ["customer", "admin"],
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

// Getting jwt token based on the env JWT secret
UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_TIME as string,
  });
};

// Encrypting password before saving to db
UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  if (typeof user.password !== "string") {
    return next(new Error("Password is required and must be a string."));
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    console.log(error);
  }
});

// Comparing password for login and reset password
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.deleteProfilePicture = async function (): Promise<void> {
  try {
    if (
      this.profile_picture.public_id !== null &&
      this.profile_picture.url !== null
    ) {
      const publicId = this.profile_picture.public_id;
      await cloudinary.uploader.destroy(publicId);
      console.log("Successfully deleted profile picture");
    }
  } catch (error) {
    console.log("Error deleting profile picture");
  }
};

const User = model<IUser>("User", UserSchema);
export default User;
