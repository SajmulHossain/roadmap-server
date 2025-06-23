import express, { Request, Response } from "express";
import { Roadmaps } from "../models/roadmap.model";
import { verifyToken } from "../middleware/verifyToken";

export const roadmapRouter = express.Router();

roadmapRouter.get("", verifyToken, async (req: Request, res: Response) => {
  const data = await Roadmaps.find();

  res.json({
    success: true,
    message: "Data retrived successfully",
    data,
  });
});

roadmapRouter.post("", verifyToken, async (req: Request, res: Response) => {
  if (!req?.user?.isAdmin) {
    res.status(403).json({
      success: false,
      name: "ValidationError",
      message: "Admin access only",
    });
    return;
  }
  const { body } = req;
  const data = await Roadmaps.create(body);

  res.status(201).json({
    success: true,
    message: "Data created successfully",
    data,
  });
});
