import express from "express";
import { registerUser } from "../controllers/user.js";
import authRouter from "./authRouter.js";

const userRouter = express.Router();

userRouter.post("/register/user", registerUser);

export default userRouter;
