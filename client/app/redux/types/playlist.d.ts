import { Document } from "mongoose";

export interface IPlaylist extends Document {
  userId: Types.ObjectId;
  title: string;
  songs: Types.ObjectId[];
  coverPic: {
    public_id: string | null;
    url: string | null;
  };
  createdAt: Date;
  updatedAt: Date;
  deleteCoverPic(): Promise<void>;
}
