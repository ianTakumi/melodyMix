import { Schema, model } from "mongoose";
import { IOrder } from "../types/order";

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Pending",
    enum: ["Pending", "Preparing", "For delivery", "Delivered"],
  },
});

const Order = model<IOrder>("Order", OrderSchema);
export default Order;
