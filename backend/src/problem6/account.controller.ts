import accountService from "./account.service";
import { IAccount } from "./account.interface";

//[POST] localhost:3000/api/v1/accounts/login
const loginAccountHandler = async (req: any, res: any) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: false,
      message: "Missing login information",
      data: {},
    });
  }

  const account = await accountService.validatePassword({ email, password });

  if (!account) {
    return res.status(401).json({
      status: false,
      message: "Email or password is not match",
      data: {},
    });
  }

  const access_token = accountService.generateTokens({
    _id: account!._id,
    email: account!.email,
  });

  // return token
  return res.status(201).json({
    status: true,
    message: "Login successfully",
    data: {
      access_token,
    },
  });
};

// [POST] localhost:3000/api/v1/accounts
const registerAccountHandler = async (req: any, res: any) => {
  const { email, password }: IAccount = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Missing login information",
        data: {},
      });
    }

    const accountExisted = await accountService.findAccount({ email });
    if (accountExisted) {
      return res.status(400).json({
        status: false,
        message: "Email already exists",
        data: {},
      });
    }

    const newAccount = await accountService.registerAccount({
      email,
      password,
      scores: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    });

    return res.status(201).json({
      status: newAccount ? true : false,
      message: newAccount
        ? "Account created successfully."
        : "Something went wrong, please try again!",
      data: newAccount,
    });
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
};

// [GET] localhost:3000/api/v1/accounts/me
const getMeHandler = async (req: any, res: any) => {
  try {
    const { email } = req.user;
    const accountInfo = await accountService.findAccount({ email });

    if (accountInfo === undefined)
      return res.status(404).json({
        status: false,
        message: "Account not found",
      });

    return res.status(200).json({
      status: true,
      message: "Account found",
      data: accountInfo,
    });
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
};

// [PUT] localhost:3000/api/v1/accounts/update-score
const updateScoreHandler = async (req: any, res: any) => {
  try {
    const { _id } = req.user;
    const account = await accountService.findAccount({ _id });
    if (!account) {
      return res.status(404).json({
        status: false,
        message: "Account not found",
      });

    }
    const updatedAccount = await accountService.updateScore(account);

    //sort scores 
    updatedAccount.scores.sort((a, b) => b - a);
    return res.status(200).json({
      status: true,
      message: "Update score successfully",
      data: updatedAccount,
    });
  } catch (e: any) {
    return res.status(500).json({
      status: false,
      message: e.message,
    });
  }
};

const accountController = {
  loginAccountHandler,
  registerAccountHandler,
  getMeHandler,
  updateScoreHandler,
};

export default accountController;
