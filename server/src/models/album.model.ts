import { Schema, model } from "mongoose";
import { IAlbum } from "../types/album";

const AlbumSchema = new Schema({
  artistId: {
    type: Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  release_date: {
    type: Date,
    required: [true, "Release Date is required"],
    default: Date.now,
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
  song_count: {
    type: Number,
    required: [true, "Song count is required"],
  },
  genres: {
    type: [String],
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
});

const Album = model<IAlbum>("Album", AlbumSchema);
export default Album;
