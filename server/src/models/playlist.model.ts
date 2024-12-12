import { Schema, model } from "mongoose";
import { IPlaylist } from "../types/playlist";

const PlaylistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

const Playlist = model<IPlaylist>("Playlist", PlaylistSchema);
export default Playlist;
