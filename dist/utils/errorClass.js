class ErrorClass extends Error {
    statusCode;
    status;
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        Object.setPrototypeOf(this, ErrorClass.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
export default ErrorClass;
