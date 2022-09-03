import httpStatus from "http-status";

export const ValidationFailed = {
  message: "Validation failed",
  err: "validation_failed",
  code: 0,
  status: httpStatus.BAD_REQUEST,
};

export const UnknownError = {
  message: "Unknown error",
  err: "unknown_error",
  code: 1,
  status: httpStatus.INTERNAL_SERVER_ERROR,
};
