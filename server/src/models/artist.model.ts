import { Schema, model } from "mongoose";
import { IArtist } from "../types/artist";
import jwt from "jsonwebtoken";

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

ArtistSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_TIME as string,
  });
};

const Artist = model<IArtist>("Artist", ArtistSchema);
export default Artist;
