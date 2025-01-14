import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IAccount } from "./account.interface";
import { NextFunction } from "express";
import { SALT_WORK_FACTOR } from "../config";

export interface AccountDocument extends IAccount, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
  hashedPassword(next: NextFunction): Promise<Boolean>;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

var accountSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    scores: {
      type: [Number],
    },
  },
  {
    timestamps: true,
  }
);

accountSchema.methods.hashedPassword = async function (
  next: NextFunction
): Promise<any> {
  let account = this as AccountDocument;
  if (!account.isModified("password")) return next();
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hashedPassword = await bcrypt.hash(account.password, salt);
  account.password = hashedPassword;
};

accountSchema.pre("save", accountSchema.methods.hashedPassword);

accountSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const account = this as AccountDocument;
  return bcrypt.compare(candidatePassword, account.password);
};

const AccountModel = mongoose.model<AccountDocument>("accounts", accountSchema);
export default AccountModel;
