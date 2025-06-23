import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secret_token } from "../config/env.config";
import { Users } from "../models/user.model";
interface AuthReq extends Request {
  user: {
    email?: string;
    isAdmin?: boolean;
  };
}

export const verifyToken = (
  req: AuthReq,
  res: Response,
  next: NextFunction
) => {
  const token = req?.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  jwt.verify(token, secret_token, async (err: any, decoded: any) => {
    if (err) {
      return res.status(400).send({ message: "Unauthorized access" });
    }

    const user = await Users.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).send({ message: "Unauthorized access" });
    }

    req.user = {
      email: user.email,
      isAdmin: user.role === "admin",
    };

    next();
  });
};
