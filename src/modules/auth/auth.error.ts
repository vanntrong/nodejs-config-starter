import { AppError } from '@/errors/AppError';

export enum AuthErrorMessage {
  EMAIL_OR_PASSWORD_INCORRECT = 'Email or Password incorrect',
  UNAUTHORIZED = 'Unauthorized',
  USER_EXIST = 'User already exist',
}

export class AuthError extends AppError {
  constructor(msg: string, status: number) {
    super({ message: msg, status: status, code: status, err: msg });
  }
}
