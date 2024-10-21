import express from "express";
import { notFoundHandler } from "./middlewares/not-found";
import { errorHandler } from "./middlewares/errorHandler";
import allRoutes from "./routes";
import { ErrorResponse } from "./errors/errorResponses";
import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import logger from "./utils/logger";

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Routes
app.use("/api", allRoutes);

// Catch 404 routes
app.use(notFoundHandler);

// global error handler
app.use(
  (
    err: ErrorResponse | Prisma.PrismaClientKnownRequestError | Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    errorHandler(err, req, res, next);
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
