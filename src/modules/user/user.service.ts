import logger from '@/config/logger';
import appDataSource from '@/db';
import { User } from '@/models/User';
import { BaseQuery } from '@/types/common';
import { toUserResponse } from '@/utils/common';
import { Service } from 'typedi';

@Service()
export class UserService {
  private UserRepo;

  constructor() {
    this.UserRepo = appDataSource.getRepository(User);
  }

  getList = async (filter: any, query: BaseQuery) => {
    try {
      const queryBuilder = this.UserRepo.createQueryBuilder('user');
      // .orWhere("username ILIKE :q", { q: `%${query.q}%` });

      const count = await this.UserRepo.count();
      const items = await queryBuilder
        .skip((query.page - 1) * query.per_page)
        .take(query.per_page)
        .where(filter)
        .where('user.name ILIKE :q', { q: `%${query.q || ''}%` })
        .orWhere('username ILIKE :q', { q: `%${query.q || ''}%` })
        .addOrderBy(query.sort_by || 'name', query.sort_order || 'ASC')
        .getMany();

      logger.info(`User query:: ${JSON.stringify(query)}`);
      return { totalCount: count, items: items.map((item) => toUserResponse(item)) };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  };
}
