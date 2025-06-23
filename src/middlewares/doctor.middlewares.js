import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export async function docCheck(req, res, next) {
  try {
    const headers = req.headers.authorization;

    if (!headers) {
      createError(401, "Token is Invalid!!");
    }
    const token = headers.split(" ")[1];

    const payload = jwt.verify(token, process.env.DOCTOR_SECRET, {
      algorithms: ["HS256"],
    });

    const doctor = await prisma.doctor.findFirst({
      where: {
        id: payload.id,
      },
    });
    req.user = doctor;
    next();
  } catch (error) {
    next(error);
  }
}
