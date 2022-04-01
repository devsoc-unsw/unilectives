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

export const PostReviewSchema = Joi.object({
  authorId: Joi.string().required(),
  authorName: Joi.string().required(),
  description: Joi.string().required(),
  courseCode: Joi.string().required(),
  rating: Joi.number().required(),
  termTaken: Joi.string().required(),
})