import { AuthController } from '@/modules/auth/auth.controller';
import { UserController } from '@/modules/user/user.controller';
import { attachControllers } from '@/utils/expressDecorators';
import { Application, Router } from 'express';

const route = Router();

export const routerV1 = (app: Application) => {
  app.use('/v1', route);
  attachControllers(route, [AuthController, UserController]);
};
