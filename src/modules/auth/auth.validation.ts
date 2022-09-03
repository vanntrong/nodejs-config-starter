import { Joi, Segments, validate } from "@/config/validation";

export const login = validate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const signup = validate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().trim().required().min(2),
  }),
});
