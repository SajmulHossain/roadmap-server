import { NextFunction, Request, Response } from "express";

export const handleError = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    res.status(error.code || error.statusCode || error.status || 400).json({
      name: error?.name || "Internal server error",
      message: error?.message || "Something went wrong!",
      success: false,
      error,
    });
  }

  next();
};
