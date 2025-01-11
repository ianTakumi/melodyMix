import { Schema, model } from "mongoose";
import cloudinary from "../config/cloudinary.config.js";

const PlaylistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    coverPic: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
  },
  { timestamps: true, collection: "playlists" }
);

PlaylistSchema.index({ userId: 1 });

PlaylistSchema.methods.deleteCoverPic = async function () {
  if (!this.coverPic || !this.coverPic.url) {
    console.log("No cover pic to delete");
    return;
  }

  try {
    const coverPicPublicId = this.coverPic.public_id;
    await cloudinary.uploader.destroy(coverPicPublicId);
    console.log("Successfully deleted cover pic file");
  } catch (error) {
    console.log("Error deleting cover pic file", error);
  }
};

const Playlist = model("Playlist", PlaylistSchema);
export default Playlist;
