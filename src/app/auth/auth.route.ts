import express, { Request, Response } from "express";
import { Users } from "../models/user.model";
import { addCookies } from "../config/jwt.config";

export const authRouter = express.Router();

authRouter.post("/sign-up", async (req: Request, res: Response) => {
  const { body } = req;
  const user = await Users.create(body);
  const token = addCookies(body.email);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .status(201)
    .json({
      success: true,
      message: "Sign up successful",
      data: user,
    });
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { body } = req;
  const user = await Users.isExist(body.email, body.password);
  console.log('login hitted');
  const token = addCookies(body.email);

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    })
    .status(200)
    .json({
      success: true,
      message: "Login successful",
      data: user,
    });
});

authRouter.get("/logout", (req: Request, res: Response) => {
  res.clearCookie("token", {
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
  }).send({
    success: true,
    message: "Logout successful"
  })
})
