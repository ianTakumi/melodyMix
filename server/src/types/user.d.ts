import { Document } from "mongoose";

export interface IUser extends Document {
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
}
