import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (user) {
      createError(400, "This username is already exist!!");
    }
    const hashPassword = bcrypt.hashSync(password, 10);

    const result = await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });

    res.json({ message: `Register ${result.username} Success!` });
  } catch (error) {
    next(error);
  }
};
