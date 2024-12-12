import { Document } from "mongoose";

export interface IAlbum extends Document {
  artistId: string;
  title: string;
  release_date: Date;
  coverPic: {
    public_id: string;
    url: string;
  };
  songCount: number;
  genres: string[];
  duration: number;
}
