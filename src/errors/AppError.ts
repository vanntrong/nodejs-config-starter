import httpStatus from "http-status";

export type AppErrorType = {
  err?: string;
  message: string;
  code?: number;
  errors?: any;
  status?: number;
  payload?: any;
};

export class AppError extends Error {
  code: number | null;
  errors: any | null;
  status: number | null;
  payload: any | null;
  err: string | null;

  constructor({
    err = "",
    code = 0,
    errors = [],
    status = httpStatus.INTERNAL_SERVER_ERROR,
    payload,
    message,
  }: AppErrorType) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.err = err;
    this.code = code;
    this.status = status;
    this.errors = errors;
    this.payload = payload;
    // if (Error.captureStackTrace) {
    //   Error.captureStackTrace(this, this.constructor);
    // } else {
    //   this.stack = new Error().stack;
    // }
    Error.captureStackTrace(this, this.constructor);
  }
}
