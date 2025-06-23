import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/authRouter.js";
import error from "./utils/error.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = 8888;

// app.use(cors());
// app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", authRouter);

app.use(error);
// app.use(notFound);

app.listen(8888, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
