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

commentsRouter.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await Comments.find({ roadmap: id }).populate([
    "author",
    "replies.author",
  ]);

  res.json({
    success: true,
    message: "Data retrived successfully",
    data,
  });
});

// * deleting a comment
commentsRouter.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await Comments.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "Comment deleted successfully",
    data,
  });
});

// * edit comment
commentsRouter.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const data = await Comments.findByIdAndUpdate(id, {...body, isEdited: true}, {new: true});

  res.status(201).json({
    success: true,
    message: "Comment modified",
    data,
  });
});

// * reply post
commentsRouter.patch("/reply/:id", async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  const data = await Comments.findByIdAndUpdate(
    id,
    {
      $addToSet: { replies: body },
    }
  );

  res.status(201).json({
    success: true,
    message: "Replied successfully",
    data,
  });
});
