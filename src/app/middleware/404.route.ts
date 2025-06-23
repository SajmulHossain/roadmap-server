import { Request, Response } from "express";

export const routeNotFound = (req: Request, res: Response) => {
  res.json({ message: "Route not found", success: false });
};
