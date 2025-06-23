import express from "express";
import {
  getUser,
  loginUser,
  patchUser,
  registerUser,
} from "../controllers/user.js";
import { userCheck } from "../middlewares/user.middlewares.js";
import { healthPost } from "../controllers/health.js";

const userRouter = express.Router();

userRouter.post("/register/user", registerUser);
userRouter.post("/login/user", loginUser);
userRouter.get("/users/me", userCheck, getUser);
userRouter.patch("/users/me", userCheck, patchUser);
userRouter.post("/health-records", userCheck, healthPost);

export default userRouter;
