import { IUser } from "./user.interface";
import UserModel, { UserDocument } from "./user.model";
import { UpdateQuery } from "mongoose";

const createUser = async (user: IUser) => {
  return await UserModel.create(user);
};

const findUserById = async (id: string) => {
  return await UserModel.findById(id).select("-__v");
};

const findUsersByFilters = async ({
  user_name,
  phone,
  address,
}: {
  user_name: string;
  phone: string;
  address: string;
}) => {
  const query: any = {};

  if (user_name) query.user_name = { $regex: user_name, $options: "i" };

  if (phone) query.phone = phone;

  if (address) query.address = { $regex: address, $options: "i" };

  return await UserModel.find(query).sort({ createdAt: -1 }).select("-__v");
};

const updateUser = async (id: string, update: UpdateQuery<UserDocument>) => {
  return await UserModel.findByIdAndUpdate(id, update, { new: true }).select(
    "-__v"
  );
};

const deleteUserById = async (id: string) => {
  return await UserModel.findByIdAndDelete(id);
};

const userService = {
  createUser,
  findUserById,
  findUsersByFilters,
  updateUser,
  deleteUserById,
};

export default userService;
