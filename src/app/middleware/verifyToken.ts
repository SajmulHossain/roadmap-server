import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { secret_token } from "../config/env.config";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req?.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized access" });
  }

  jwt.verify(token, secret_token, (err: any, decoded: any) => {
    if (err) {
      return res.status(400).send({ message: "Unauthorized access" });
    }

    next();
  });
};
