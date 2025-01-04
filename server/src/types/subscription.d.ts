import { Document } from "mongoose";
export interface ISubscription extends Document {
  _id: string;
  userId: string;
  status: string;
  planType: string;
  start_date: Date;
  end_date: Date;
  status: string;
  payment_method: string;
  renewal_date: Date;
}
