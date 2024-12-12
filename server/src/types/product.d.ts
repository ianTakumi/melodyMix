import { Document } from "mongoose";

interface ImageItem {
  public_id: string;
  url: string;
}

export interface IProduct extends Document {
  artistId: string;
  name: string;
  price: number;
  category: string;
  images: ImageItem[];
  stock: number;
  sales_count: number;
  views_count: number;
}
