import { Schema, model } from "mongoose";
import { ISubscription } from "../types/subscription";

const SubscriptionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  planType: {
    type: String,
    default: "Free",
    enum: ["Free", "Mini", "Duo", "Family", "Student", "Individual"],
    required: true,
  },
  start_date: {
    type: Date,
    default: Date.now,
  },
  end_date: {
    type: Date,
  },
  status: {
    type: String,
    required: [true, "Status is required"],
    default: "Active",
    enum: ["Active", "Expired", "Cancelled"],
  },
  payment_method: {
    type: String,
    required: [true, "Payment method is required"],
    default: "Card",
  },
  renewal_date: {
    type: Date,
  },
});

const Subscription = model<ISubscription>("Subscription", SubscriptionSchema);
export default Subscription;
