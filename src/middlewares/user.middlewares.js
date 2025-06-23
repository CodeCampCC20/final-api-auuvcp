import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

export async function userCheck(req, res, next) {
  try {
    const headers = req.headers.authorization;

    if (!headers) {
      createError(401, "Token is Invalid!!");
    }
    const token = headers.split(" ")[1];

    const payload = jwt.verify(token, process.env.USER_SECRET, {
      algorithms: ["HS256"],
    });

    const user = await prisma.user.findFirst({
      where: {
        id: payload.id,
      },
    });
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
