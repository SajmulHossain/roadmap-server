import { secret_token } from "../config/env.config";
import jwt from "jsonwebtoken";

export const addCookies = (email: string): string => {
  const token = jwt.sign({ email }, secret_token, {
    expiresIn: "1d",
  });

  return token;
};
