import express, { Request, Response } from 'express';
import { Comments } from '../models/comment.model';

export const commentsRouter = express.Router();

commentsRouter.post("", async(req: Request, res:Response) => {
    const { body} = req;
    const data= await Comments.create(body);

    res.status(201).json({
        success: true,
        message: 'Comment created successfully',
        data
    })
})