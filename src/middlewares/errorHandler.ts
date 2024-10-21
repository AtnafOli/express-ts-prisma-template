import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ErrorResponse } from "../errors/errorResponses";
import logger from "../utils/logger";

export function errorHandler(
  err: ErrorResponse | Prisma.PrismaClientKnownRequestError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body || {},
  });

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const errorMap: { [key: string]: { message: string; statusCode: number } } =
      {
        P2002: {
          message: "Duplicate field value: Unique constraint failed",
          statusCode: 409,
        },
        P2025: { message: "Record not found", statusCode: 404 },
        P2003: { message: "Foreign key constraint violation", statusCode: 400 },
      };

    const { message, statusCode } = errorMap[err.code] || {
      message: "Unknown database error",
      statusCode: 500,
    };
    return res.status(statusCode).json({ status: "fail", message });
  }

  if (err instanceof ErrorResponse) {
    return res.status(err.statusCode).json({
      status: err.statusCode >= 500 ? "error" : "fail",
      message: err.message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
}
