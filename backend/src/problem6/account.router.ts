import { Router } from "express";
import accountController from "./account.controller";
import deserializeUser from "../middleware/deserializeUser";

const router = Router();

router.post("/", accountController.registerAccountHandler);
router.post("/login", accountController.loginAccountHandler);

router.get("/me", deserializeUser, accountController.getMeHandler);

router.put(
  "/update-score",
  deserializeUser,
  accountController.updateScoreHandler
);

export default router;
