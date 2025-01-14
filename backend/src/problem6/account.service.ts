import { FilterQuery } from "mongoose";
import AccountModel, { AccountDocument } from "./account.model";
import { IAccount } from "./account.interface";
import { signJwt } from "../utils/jwt.util";
import { ACCESS_TOKEN_TTL } from "../config";

const registerAccount = async (account: IAccount) => {
  return await AccountModel.create(account);
};

const findAccount = async (query: FilterQuery<AccountDocument>) => {
  return await AccountModel.findOne(query).select("-__v -password");
};

const validatePassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const account = await AccountModel.findOne({ email });
  if (!account) return false;

  const isValid = await account.comparePassword(password);
  if (!isValid) return false;

  return account.toJSON();
};

const updateScore = async (account: AccountDocument) => {
  // Randomly increase one of the scores
  const randomIndex = Math.floor(Math.random() * account.scores.length);

  account.scores[randomIndex] += 1;

  return await account.save();
};

const generateTokens = ({ _id, email }: { _id: any; email: string }) => {
  // Create an access token
  const access_token = signJwt(
    {
      _id,
      email,
    },
    { expiresIn: ACCESS_TOKEN_TTL }
  );

  return access_token;
};

const authService = {
  registerAccount,
  findAccount,
  updateScore,
  generateTokens,
  validatePassword,
};

export default authService;
