import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secret_token } from "../config/env.config";
import { Users } from "../models/user.model";
// interface AuthReq extends Request {
//   user?: {
//     email: string;
//     isAdmin: boolean;
//   };
// }

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req?.cookies?.token;

  if (!token) {
    res.status(401).send({ message: "Token not found!" });
    return;
  }

  jwt.verify(token, secret_token, async (err: any, decoded: any) => {
    if (err) {
      res.status(401).send({ message: "Token invalid or expired" });
      return;
    }

    const user = await Users.findOne({ email: decoded.email });

    if (!user) {
      res.status(403).send({ message: "Unauthorized access" });
      return;
    }

    req.user = {
      email: user.email,
      isAdmin: user.role === "admin",
    };

    next();
  });
};
