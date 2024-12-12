import { Schema, model } from "mongoose";
import { ISong } from "../types/song";

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

const Song = model<ISong>("Song", SongSchema);
export default Song;
