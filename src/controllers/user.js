import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        password: hashPassword,
      },
    });

    res.json({ message: `Register ${result.username} Success!` });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) {
      createError(400, "Email or Password is Invalid!!");
    }
    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      createError(400, "Email or Password is Invalid!!");
    }

    const payload = {
      id: user.id,
    };

    const token = jwt.sign(payload, process.env.USER_SECRET, {
      expiresIn: "12h",
    });

    res.status(200).json({ message: "Login Successful!!", accessToken: token });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    console.log(id);
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
    res.json({
      result: user,
    });
  } catch (error) {
    next(error);
  }
};

export const patchUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const { id } = req.user;
    console.log(id);
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
        password,
      },
    });
    res.json({ message: `Updated ${user.username}`, user });
  } catch (error) {
    next(error);
  }
};
