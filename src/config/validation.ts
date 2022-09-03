import { celebrate, Joi as J, Segments as S } from "celebrate";

/**
 * Configure Celebrate middleware
 *
 * @param {Object} schema
 * @return {e.RequestHandler}
 */
export const validate = (schema = {}) =>
  celebrate(schema, {
    abortEarly: false,
  });

export const Joi = J;

export const Segments = S;
