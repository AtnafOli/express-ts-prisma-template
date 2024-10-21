export class ErrorResponse extends Error {
  public statusCode: number;

  constructor(
    message: string = "Internal server error",
    statusCode: number = 500
  ) {
    super(message);

    // Validate statusCode is a number
    if (isNaN(parseInt(statusCode.toString(), 10))) {
      throw new TypeError(
        `HTTP status code must be a number, received: ${statusCode}`
      );
    }

    // Validate message is a non-empty string
    if (typeof message !== "string" || message.trim().length === 0) {
      throw new TypeError(
        `Message must be a non-empty string, received: ${message}`
      );
    }

    this.statusCode = statusCode;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}
