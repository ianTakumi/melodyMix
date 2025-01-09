import { Document } from "mongoose";
import { IArtist } from "./artist";

export interface ICategory extends Document {
  artist: IProduct;
  name: string;
  description: string;
  image: {
    public_id: string;
    url: string;
  };
  products: string[] | IProduct[];
  deleteImage: () => Promise<void>;
}
