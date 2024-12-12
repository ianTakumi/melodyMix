import { Document } from "mongoose";

export interface ISong extends Document {
  artistId: string;
  albumId: string;
  title: string;
}
