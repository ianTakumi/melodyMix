import { Document } from "mongoose";

export interface IArtist extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  profile_picture: {
    public_id: string;
    url: string;
  };
  getJwtToken: () => string;
}
