import express, { Request, Response } from 'express'
import { Users } from '../models/user.model';

export const authRouter = express.Router();

authRouter.post("/sign-up", async(req: Request, res: Response) => {
    const { body } = req;
    const user = await Users.create(body);

    res.status(201).json({
        success: true,
        message: "Sign up successful",
        data: user
    })
})

authRouter.get("/login", async(req: Request, res: Response) => {
    console.log(req.body);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: ''
    })
})