import config from "@/config";
import { UserResponse } from "@/modules/auth/auth.type";
import * as jwt from "jsonwebtoken";
import { pick } from "lodash";

export const generateToken = (user: UserResponse) => {
  try {
    const token = jwt.sign(
      pick(user, ["id", "name", "email", "role"]),
      config.ACCESS_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: Number(config.ACCESS_TOKEN_LIFE),
      }
    );
    return { token, exp: Number(config.ACCESS_TOKEN_LIFE) };
  } catch (error) {
    return null;
  }
};

export const decodeToken = (token: string) => {
  try {
    const user = jwt.decode(token);

    return user;
  } catch (error) {
    return null;
  }
};
