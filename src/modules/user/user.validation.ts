import { Joi, Segments, validate } from "@/config/validation";

export const getList = validate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number().default(1),
    per_page: Joi.number().default(10),
    sort_by: Joi.string(),
    sort_order: Joi.string(),
    q: Joi.string(),
  }),
});
