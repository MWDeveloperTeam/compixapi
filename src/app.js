import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// app.use(express.json({ limit: `16kb` }));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: `16kb` }));
app.use(express.static("public"));
app.use(cookieParser());
// using routes from here
import userRouter from "./routes/user.routes.js";
import studentRouter from "./routes/student.routes.js";
import feesRouter from "./routes/fee.routes.js";
import examRouter from "./routes/exam.routes.js";

//routes declarations
app.use("/api/v1", studentRouter, feesRouter, examRouter);
app.use("/api/v1/user", userRouter);

export { app };
