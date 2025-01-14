import express from "express";
import { problem4 } from "./problem4";
import connectDB from "./db/db";
import userRouter from "./problem5/user.router";
import accountRouter from "./problem6/account.router";

const PORT = 3000;

const app = express();
app.use(express.json());

connectDB();

// Problem 4
problem4()

// Problem 5
app.use("/api/v1/users", userRouter);
app.use("/api/v1/accounts", accountRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
