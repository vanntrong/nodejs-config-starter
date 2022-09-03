import appDataSource from '@/db';
import redisClient from '@/db/redis';
import { User } from '@/models/User';
import { generateToken } from '@/utils/token';
import bcryptjs from 'bcryptjs';
import httpStatus from 'http-status';
import { omit } from 'lodash';
import { AuthError, AuthErrorMessage } from './auth.error';
import { Login, Signup } from './auth.type';
import { Service } from 'typedi';
import logger from '@/config/logger';
import { toUserResponse } from '@/utils/common';

const isPasswordCorrect = (userPassword: string, bodyPassword: string): boolean => {
  return bcryptjs.compareSync(bodyPassword, userPassword);
};

@Service()
export class AuthService {
  private userRepo;
  private redisClient;

  constructor() {
    this.userRepo = appDataSource.getRepository(User);
    this.redisClient = redisClient;
  }

  login = async (payload: Login) => {
    try {
      const user = await this.userRepo.findOneBy({
        email: payload.email,
        isDeleted: false,
      });
      if (!user) {
        throw new AuthError(AuthErrorMessage.EMAIL_OR_PASSWORD_INCORRECT, httpStatus.BAD_REQUEST);
      }

      if (!isPasswordCorrect(user.password, payload.password)) {
        throw new AuthError(AuthErrorMessage.EMAIL_OR_PASSWORD_INCORRECT, httpStatus.BAD_REQUEST);
      }

      const { token, exp } = generateToken(user);
      this.redisClient.setex(user.id, exp, token);

      if (!token) {
        throw new AuthError(AuthErrorMessage.UNAUTHORIZED, httpStatus.UNAUTHORIZED);
      }

      logger.info(`User logged in: ${payload.email}`);
      return { data: toUserResponse(user), token, exp };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };

  register = async (payload: Signup) => {
    try {
      const user = await this.userRepo.findOneBy({
        email: payload.email,
        isDeleted: false,
      });

      if (user) {
        throw new AuthError(AuthErrorMessage.USER_EXIST, httpStatus.BAD_REQUEST);
      }

      payload.password = bcryptjs.hashSync(payload.password, 12);

      const newUser = this.userRepo.create({
        ...payload,
        createdAt: new Date(),
      });

      const userSaved = await this.userRepo.save(newUser);

      if (!userSaved) {
        throw new AuthError('INTERNAL_SERVER_ERROR', httpStatus.INTERNAL_SERVER_ERROR);
      }

      const { token, exp } = generateToken(userSaved);

      this.redisClient.setex(userSaved.id, exp, token);

      logger.info(`User registered: ${payload.email}`);
      return { data: toUserResponse(userSaved), token, exp };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };
}
