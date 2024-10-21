import { Request, Response, NextFunction } from "express";
import { NotFoundError } from "../errors/errorResponses";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotFoundError(`Route not found`));
};
