class AppError extends Error {
  public statusCode: number;

  constructor(message: string | undefined, statusCode: number) {
    super(message);
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
