import { User } from '@/models/User';
import { BaseQuery } from '@/types/common';
import { omit } from 'lodash';

export const buildQueryFilter = <T>(reqQuery: BaseQuery & T) => {
  const { page, per_page, sort_by, sort_order, q, ...filter } = reqQuery;
  return {
    filter,
    query: { page, per_page, sort_by, sort_order, q },
  };
};

export const toUserResponse = (user: User) => {
  return omit(user, ['password', 'isDeleted']);
};
