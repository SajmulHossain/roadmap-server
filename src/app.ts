import express, { Request, Response } from "express";
import { authRouter } from "./app/auth/auth.route";
import cors from "cors";
import cookieParser from "cookie-parser";
import { handleError } from "./app/middleware/errorHandler";
import { routeNotFound } from "./app/middleware/404.route";
import { roadmapRouter } from "./app/controllers/roadmaps.controller";
import { commentsRouter } from "./app/controllers/comments.controller";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://roadmap-sajmul.vercel.app",
      "http://192.168.0.213:5173",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/roadmaps", roadmapRouter);
app.use("/api/comments", commentsRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("Roadmap server is running!");
});

app.use(routeNotFound);
app.use(handleError);

export default app;
