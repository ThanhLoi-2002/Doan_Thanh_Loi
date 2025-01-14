import userService from "./user.service";
import { IUser } from "./user.interface";

//[POST] localhost:3000/api/v1/users
const createUserHandler = async (req: any, res: any) => {
  try {
    const { user_name, phone, address }: IUser = req.body;

    if (!user_name || !phone || !address) {
      return res.status(400).json({
        status: false,
        message: "User name, phone and address are required.",
      });
    }

    const newUser = await userService.createUser({
      ...req.body,
    });

    return res.status(201).json({
      status: newUser ? true : false,
      message: newUser
        ? "User created successfully."
        : "Something went wrong, please try again!",
      data: newUser,
    });
  } catch (error: any) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//[GET] localhost:3000/api/v1/users/all?user_name=John&phone=123456&address=Hanoi
const getUsersHandler = async (req: any, res: any) => {
  const { user_name, phone, address } = req.query;
  const users = await userService.findUsersByFilters({
    user_name,
    phone,
    address,
  });

  return res.status(200).json({
    status: true,
    message: "Users found.",
    data: users,
  });
};

//[GET] localhost:3000/api/v1/users/:id
const getUserByIdHandler = async (req: any, res: any) => {
  const { id } = req.params;
  const user = await userService.findUserById(id);

  return res.status(200).json({
    status: user ? true : false,
    message: user ? "User found." : "User not found",
    data: user,
  });
};

//[PUT] localhost:3000/api/v1/users/:id
const updateUserByIdHandler = async (req: any, res: any) => {
  const { id } = req.params;
  const { user_name, phone, address }: IUser = req.body;
  try {
    if (!user_name || !phone || !address) {
      return res.status(400).json({
        status: false,
        message: "User name, phone and address are required.",
      });
    }

    const existedUser = await userService.findUserById(id);
    if (!existedUser) {
      return res.status(400).json({
        status: false,
        message: "User Id not found.",
      });
    }

    const user = await userService.updateUser(id, req.body);
    return res.status(200).json({
      status: true,
      message: "Updated successfully.",
      data: user,
    });
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
};

//[DELETE] localhost:3000/api/v1/users/:id
const deleteUserByIdHandler = async (req: any, res: any) => {
  const { id } = req.params;

  const existedUser = await userService.findUserById(id);
  if (!existedUser) {
    return res.status(404).json({
      status: false,
      message: "User Id not found.",
    });
  }

  await userService.deleteUserById(id);

  return res.status(200).json({
    status: true,
    message: "Deleted successfully.",
  });
};

const userController = {
  createUserHandler,
  getUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
};

export default userController;
