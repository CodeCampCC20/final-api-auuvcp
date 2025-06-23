import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";

export const registerDoctor = async (req, res, next) => {
  try {
    const { username, password, specialization } = req.body;

    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username,
      },
    });

    if (doctor) {
      createError(400, "This username is already exist!!");
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const result = await prisma.doctor.create({
      data: {
        username: username,
        password: password,
        specialization: specialization,
      },
    });

    res.json({ message: `Register ${result.username} Success!` });
  } catch (error) {
    next(error);
  }
};
