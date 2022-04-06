import Joi from "@hapi/joi";

export const CreateReportSchema = Joi.object({
  reviewId: Joi.string().required(),
  zid: Joi.string().required(),
  reason: Joi.string().required(),
});
