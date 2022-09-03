import { Body, Controller, Next, Post, Res } from '@/utils/expressDecorators';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Inject, Service } from 'typedi';
import { AuthService } from './auth.service';
import * as authValidation from './auth.validation';

@Service()
@Controller('/auth')
export class AuthController {
  @Inject()
  private authService: AuthService;

  @Post('/login', [authValidation.login])
  async login(@Res() res: Response, @Body() body: any) {
    try {
      const response = await this.authService.login(body);
      return res.status(httpStatus.OK).json(response);
    } catch (error) {
      throw error;
    }
  }

  @Post('/signup', [authValidation.signup])
  async signup(@Res() res: Response, @Body() body: any) {
    try {
      const response = await this.authService.register(body);
      return res.status(httpStatus.OK).json(response);
    } catch (error) {
      throw error;
    }
  }
}
