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

// * api for voting
roadmapRouter.post("/vote/:id", verifyToken, async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;
  if(req?.user?.email !== body.email) {
    res.status(403).json({
      success: false,
      message: 'Unauthorized access',
      data: null
    })

    return;
  }
  const isVoted = await Roadmaps.isVoted(body.email, id);

  
  if (isVoted) {
    res.status(400).json({
      success: false,
      message: "Already voted this",
      data: null,
    });

    return;
  }

  const data = await Roadmaps.findByIdAndUpdate(id, {
    $addToSet: { upvotes: {user: body.email} },
  });

  res.status(201).json({
    success: true,
    message: 'Voted Successfully',
    data
  });
});
