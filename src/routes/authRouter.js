import express from "express";
import { getDoctor, loginDoctor, registerDoctor } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register/doctor", registerDoctor);
authRouter.post("/login/doctor", loginDoctor);
authRouter.get("/doctors/me", getDoctor)

export default authRouter;
