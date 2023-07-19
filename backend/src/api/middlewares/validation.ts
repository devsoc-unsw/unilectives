import { NextFunction, Request, Response } from "express";
import { getLogger } from "../../utils/logger";
import { ZodSchema } from "zod";

const logger = getLogger();

const validationMiddleware =
  (schema: ZodSchema, property: "body" | "query") =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[property]);
    if (!result.success) {
      console.log(result.error);
      console.log(req.body)
      logger.info(
        `Invalid request was made - Error: ${
          result.error.issues[0].message
        } - Data: ${JSON.stringify(req[property])}`
      );
      res.status(400).json({
        message: `Invalid request was made - Error: ${result.error.issues[0].message}`,
        data: req.body,
      });
      return;
    }

    next();
  };

export default validationMiddleware;
