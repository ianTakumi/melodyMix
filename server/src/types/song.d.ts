import { Document } from "mongoose";

export interface ISong extends Document {
  _id: string;
  artistId: string;
  albumId: string;
  title: string;
  genres: string[];
  audio: {
    public_id: string;
    url: string;
  };
  coverPic: {
    public_id: string;
    url: string;
  };
  lyrics?: string;
  play_count: number;
  release_date: Date;
  deleteSongFile(): Promise<void>;
  deletePicFile(): Promise<void>;
}
