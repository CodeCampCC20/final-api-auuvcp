import express from "express";
import { registerDoctor } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register/doctor", registerDoctor);

export default authRouter;
