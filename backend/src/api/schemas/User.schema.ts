import Joi from "@hapi/joi";

export const CreateUserSchema = Joi.object({
  zid: Joi.string().required(),
}).required();
