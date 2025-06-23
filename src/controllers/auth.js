import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        password: hashPassword,
        specialization: specialization,
      },
    });

    res.json({ message: `Register ${result.username} Success!` });
  } catch (error) {
    next(error);
  }
};

export const loginDoctor = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username,
      },
    });
    if (!doctor) {
      createError(400, "Email or Password is Invalid!!");
    }
    const checkPassword = bcrypt.compareSync(password, doctor.password);

    if (!checkPassword) {
      createError(400, "Email or Password is Invalid!!");
    }
    const payload = {
      id: doctor.id,
    };

    const token = jwt.sign(payload, process.env.DOCTOR_SECRET, {
      expiresIn: "12h",
    });

    res.status(200).json({ message: "Login Successful!!", accessToken: token });
  } catch (error) {
    next(error);
  }
};

export const getDoctor = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(id);
    const doctor = await prisma.doctor.findFirst({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
    res.json({
      result: doctor,
    });
  } catch (error) {
    next(error);
  }
};

export const patchDoctor = async (req, res, next) => {
  try {
    const { username, password, specialization } = req.body;
    const { id } = req.user;
    console.log(id);
    const doctor = await prisma.doctor.update({
      where: {
        id,
      },
      data: {
        username,
        password,
        specialization,
      },
    });
    res.json({ message: `Updated ${doctor.username}`, doctor });
  } catch (error) {
    next(error);
  }
};
