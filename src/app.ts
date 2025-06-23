import express, { NextFunction, Request, Response } from "express";
import { authRouter } from "./app/auth/auth.route";

const app = express();
app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Roadmap server is running!");
});

app.use((req: Request, res: Response) => {
  res.json({ message: "Route not found", success: false });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if(error) {
        res.status(400).json({
          message:
            error.name === "ValidationError"
              ? "Validation failed"
              : error.name === "castError"
              ? "Cannot get by this id"
              : "Unknown Error Occured",
          success: false,
          error,
        });
    }
})

export default app;
