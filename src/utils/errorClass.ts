class ErrorClass extends Error {
  public statusCode: number;
  public status: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Object.setPrototypeOf(this, ErrorClass.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
export default ErrorClass;
