export type Login = {
  email: string;
  password: string;
};

export type Signup = {
  email: string;
  password: string;
  name: string;
};

export type UserResponse = {
  id: string;
  name: string;
  locate?: string;
  email: string;
  role: string;
  username?: string;
  avatar?: string;
  bio?: string;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt?: Date;
};
