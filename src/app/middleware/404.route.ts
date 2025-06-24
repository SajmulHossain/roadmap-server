import { Request, Response } from "express";

export const routeNotFound = (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found", success: false, route: req.url });
};
