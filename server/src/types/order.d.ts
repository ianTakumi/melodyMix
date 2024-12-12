import { Document } from "mongoose";

interface OrderItem {
  productId: string;
  quantity: number;
}

export interface IOrder extends Document {
  userId: string;
  orderDate: Date;
  items: OrderItem[];
  status: string;
}
