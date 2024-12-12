import { Document } from "mongoose";

export interface IPlaylist extends Document {
  userId: string;
  title: string;
  description: string;
  songs: [{ type: Schema.Types.ObjectId; ref: "Song" }];
}
