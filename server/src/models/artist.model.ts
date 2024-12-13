import { Schema, model } from "mongoose";
import { IArtist } from "../types/artist";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const ArtistSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    phoneNumber: {
      type: String,
      unique: true,
    },
    profile_picture: {
      public_id: {
        type: String,
        default: "cihdkwnga1whsejrbmkb",
      },
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dydg4oqy5/image/upload/v1733662639/cihdkwnga1whsejrbmkb.png",
      },
    },
  },
  { collection: "artists", timestamps: true }
);

ArtistSchema.methods.getJwtToken = function (): string {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_TIME as string,
  });
};

// Encrypting password before saving to db
ArtistSchema.pre("save", async function (next): Promise<void> {
  const artist = this;

  if (!artist.isModified("password")) {
    return next();
  }

  if (typeof artist.password !== "string") {
    return next(new Error("Password is required and must be a string."));
  }

  try {
    const salt = await bcrypt.genSalt(10);
    artist.password = await bcrypt.hash(artist.password, salt);
    next();
  } catch (error) {
    console.log(error);
  }
});

// Comparing password for login and reset password
ArtistSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Artist = model<IArtist>("Artist", ArtistSchema);
export default Artist;
