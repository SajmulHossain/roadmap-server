import express, { NextFunction, Request, Response } from "express";
import { authRouter } from "./app/auth/auth.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import { handleError } from "./app/middleware/errorHandler";
import { routeNotFound } from "./app/middleware/404.route";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Roadmap server is running!");
});

app.use(routeNotFound);
app.use(handleError);

export default app;
