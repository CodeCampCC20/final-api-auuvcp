import express from "express";
import {
  getDoctor,
  loginDoctor,
  patchDoctor,
  registerDoctor,
} from "../controllers/auth.js";
import { docCheck } from "../middlewares/doctor.middlewares.js";

const docRouter = express.Router();

docRouter.post("/register/doctor", registerDoctor);
docRouter.post("/login/doctor", loginDoctor);
docRouter.get("/doctors/me", docCheck, getDoctor);
docRouter.patch("/doctors/me", docCheck, patchDoctor);

export default docRouter;
