import redisClient from "@/db/redis";
import { AppError } from "@/errors/AppError";
import { decodeToken } from "@/utils/token";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const protect = async (
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw new AppError({
        message: "MISSING TOKEN",
        code: httpStatus.UNAUTHORIZED,
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    const user = decodeToken(token) as any;

    if (!user) {
      throw new AppError({
        message: "TOKEN EXPIRED",
        code: httpStatus.FORBIDDEN,
      });
    }

    const cache = await redisClient.get(user.id);
    if (!cache) {
      throw new AppError({
        message: "TOKEN EXPIRED",
        code: httpStatus.FORBIDDEN,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
