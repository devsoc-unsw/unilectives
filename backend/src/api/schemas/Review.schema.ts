import Joi from "@hapi/joi";

export const CommonReviewSchema = Joi.object({
  userId: Joi.string()
    .uuid({ version: ["uuidv4"] })
    .required(),
  widgets: Joi.array()
    .items(
      Joi.object({
        widgetType: Joi.string()
          .pattern(/ARTICLE/)
          .required(),
        articleId: Joi.string()
          .uuid({ version: ["uuidv4"] })
          .required(),
      })
    )
    .required(),
}).options({ allowUnknown: true });