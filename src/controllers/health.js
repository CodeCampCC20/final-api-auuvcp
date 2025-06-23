import prisma from "../config/prisma.js";

export const healthPost = async (req, res, next) => {
  try {
    const { type, value } = req.body;
    const healthRec = await prisma.healthRecord.create({
      data: {
        type,
        value,
      },
    });
    res.status(201).json({ message: "Post created.", healthRec });
  } catch (error) {
    next(error);
  }
};
