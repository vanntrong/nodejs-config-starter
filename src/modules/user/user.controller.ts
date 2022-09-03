import { BaseQuery } from '@/types/common';
import { buildQueryFilter } from '@/utils/common';
import { Controller, Get, Query, Res } from '@/utils/expressDecorators';
import { Response } from 'express';
import httpStatus from 'http-status';
import { Inject, Service } from 'typedi';
import { UserService } from './user.service';
import * as userValidation from './user.validation';

@Service()
@Controller('/users')
export class UserController {
  @Inject()
  private userService: UserService;

  @Get('/', [userValidation.getList])
  async getList(@Query() _query: BaseQuery, @Res() res: Response) {
    try {
      const { filter, query } = buildQueryFilter(_query);
      const response = await this.userService.getList(filter, query);
      res.status(httpStatus.OK).json(response);
    } catch (error) {
      throw error;
    }
  }
}
