export class ErrorResponse extends Error {
  public statusCode: number;

  constructor(
    message: string = "Internal server error",
    statusCode: number = 500
  ) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class BadRequestError extends ErrorResponse {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}

export class UnauthorizedError extends ErrorResponse {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

