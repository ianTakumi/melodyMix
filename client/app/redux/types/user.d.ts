import { Document } from "mongoose";
import { ISubscription } from "./subscription";

export interface IUser extends Document {
  subscription: string | ISubscription;
  stripeCustomerId: string;
  name: string;
  email: string;
  dob: Date;
  gender: string;
  phoneNumber: string;
  profile_picture: {
    public_id: string;
    url: string;
  };
  role: string;
  socialAccounts: {
    provider: "google" | "facebook";
    provider_id: string;
  }[];
  fcm_token: string;
  getJwtToken(): string;
  comparePassword(enteredPassword: string): Promise<boolean>;
  createDefaultSubscription(): void;
  createCustomerStripe(): void;
}
