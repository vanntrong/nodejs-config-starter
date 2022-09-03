/* eslint-disable no-unused-vars */
import logger from '@/config/logger';
import { isCelebrateError } from 'celebrate';
import { NextFunction, Request, Response } from 'express';
import { AppError } from './AppError';
import { UnknownError, ValidationFailed } from './CommonError';

const convertError = (err: any) => {
  if (err instanceof AppError) return err;

  if (isCelebrateError(err)) {
    let errorDetail: any = {};
    let message = '';
    err.details.forEach((_err: any) => {
      message = _err.message;
      errorDetail = _err.details.map((item: any) => {
        // eslint-disable-next-line no-console
        const key = item.path[0];
        const typeErr = item.type;
        return { key, rule: typeErr };
      });
    });
    return new AppError({
      ...ValidationFailed,
      errors: errorDetail,
      message,
    } as any);
  }

  return new AppError({ ...UnknownError, message: err.message });
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const { code, message, err: errorMessage, errors, status, payload } = convertError(err);

  logger.error(err);
  return res.status(status).json({
    err: errorMessage,
    message,
    code,
    payload,
    ...(errors.length && { errors }),
  });
};
