import mongoose from "mongoose";
import { IUser } from "./user.interface";

export interface UserDocument extends IUser, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

var userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model<UserDocument>("users", userSchema);
export default userModel;
