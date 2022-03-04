import Joi from "@hapi/joi";

export const RequestSchema = Joi.object({
  name: Joi.string().required(),
});
