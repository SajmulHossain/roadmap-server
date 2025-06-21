import express, { NextFunction, Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Roadmap server is running!");
});

app.use((req: Request, res: Response) => {
  res.json({ message: "Route not found", success: false });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if(error) {
        res.status(400).json({
            message: error.message === 'ValidationError' ? 'Validation failed' : error.message === 'CastError' ? "Cannot get by this id" : 'Unknown Error Occured',
            success: false,
            error
        })
    }
})

export default app;
