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
    enum: ["Active", "Expired", "Cancelled", "Inactive"],
  },
  payment_method: {
    type: String,
    required: [true, "Payment method is required"],
    default: "Card",
  },
  renewal_date: {
    type: Date,
  },
  members: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});

SubscriptionSchema.methods.disableDefaultSubscription = async function (
  userId: string
) {
  try {
    const subscription = await Subscription.findOne({
      userId: userId,
      planType: "Free",
    });
    if (subscription) {
      subscription.status = "Inactive";
      await subscription.save();
    }
  } catch (error) {
    console.log(error);
  }
};

const Subscription = model<ISubscription>("Subscription", SubscriptionSchema);
export default Subscription;
