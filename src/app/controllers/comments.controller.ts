import express, { Request, Response } from "express";
import { Comments } from "../models/comment.model";

export const commentsRouter = express.Router();

commentsRouter.post("", async (req: Request, res: Response) => {
  const { body } = req;
  const data = await Comments.create(body);

  res.status(201).json({
    success: true,
    message: "Comment created successfully",
    data,
  });
});

commentsRouter.get("/:id", async(req: Request, res: Response) => {
    const { id } = req.params;
    const data = await Comments.find({roadmap: id}).populate("author");

    res.json({
        success: true,
        message: 'Data retrived successfully',
        data
    })
})