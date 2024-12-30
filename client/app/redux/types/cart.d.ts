import { Document } from "mongoose";

interface CartItem {
  productId: string;
  quantity: number;
}

export interface ICart extends Document {
  _id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
}
