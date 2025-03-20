import { Schema, model } from "mongoose";
import cloudinary from "../config/cloudinary.config.js";

const SongSchema = new Schema({
  artistId: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  albumId: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  genres: {
    type: String,
    required: [true, "Genres are required"],
    enum: [
      "Pop",
      "Rock",
      "Jazz",
      "Hip-Hop",
      "Classical",
      "Electronic",
      "Country",
      "Indie",
      "Blues",
      "Reggae",
    ],
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"],
  },
  audio: {
    public_id: {
      type: String,
      required: [true, "Public Id is required"],
    },
    url: {
      type: String,
      required: [true, "Song url is required"],
    },
  },
  coverPic: {
    public_id: {
      type: String,
      required: [true, "Public Id is required"],
    },
    url: {
      type: String,
      required: [true, "Song url is required"],
    },
  },
  lyrics: {
    type: String,
  },
  play_count: {
    type: Number,
    default: 0,
  },
  release_date: {
    type: Date,
    required: [true, "Release Date is required"],
    default: Date.now,
  },
});

SongSchema.methods.deleteSongFile = async function () {
  if (!this.audio || !this.audio.public_id) {
    console.log("No audio file to delete");
    return;
  }

  try {
    const songPublicId = this.audio.public_id;
    await cloudinary.uploader.destroy(songPublicId);
    console.log(
      `Successfully deleted song file with public_id: ${songPublicId}`
    );
  } catch (error) {
    console.log("Error deleting song file", error);
  }
};

SongSchema.methods.deletePicFile = async function () {
  if (!this.audio || !this.audio.public_id) {
    console.log("No pic file to delete");
    return;
  }

  try {
    const picPublicId = this.coverPic.public_id;
    await cloudinary.uploader.destroy(picPublicId);
    console.log(`Successfully deleted pic file with public_id: ${picPublicId}`);
  } catch (error) {
    console.log("Error deleting pic file", error);
  }
};

const Song = model("Song", SongSchema);
export default Song;
