import { Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  status: "pending" | "in-progress" | "resolved";
  createdAt?: Date;
  updatedAt?: Date;
}
