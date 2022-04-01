import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { ReviewService } from "../services/Review.service";
import validationMiddleware from "../middlewares/validation";
import {
  PostReviewSchema
} from "../schemas/Review.schema";
import { HTTPError } from "../../utils/Errors";
import { badRequest } from "../../utils/Constants";
import {
  IPostReviewRequestBody,
} from "IApiResponses";
export class ReviewRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly reviewService: ReviewService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .get(
        "/reviews",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in /reviews`);
          try {
            const result = await this.reviewService.getAllReviews();
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /reviews ${formatError(err)}`
            );
            return next(err);
          }
        }
      )
      .get(
        "/reviews/:courseCode",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in /reviews/specific_course`);
          try {
            const courseCode: string = req.params.courseCode;
            const result = await this.reviewService.getCourseReviews(courseCode);
            this.logger.info(`Responding to client in GET /reviews/specific_course`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /reviews ${formatError(err)}`
            );
            return next(err);
          }
        }
      )
      .post(
        "/reviews",
        validationMiddleware(PostReviewSchema, "body"),
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in POST /reviews`);
          try {
            const reviewDetails = req.body as IPostReviewRequestBody;
            if (!reviewDetails) throw new HTTPError(badRequest);
            const result = await this.reviewService.postReview(
              reviewDetails
            );
            this.logger.info(`Responding to client in POST /reviews`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /reviews ${formatError(
                err
              )}`
            );
            return next(err);
          }
        }
      );
  }

  getPrefix(): string {
    return this.prefix;
  }

  getRouter(): Router {
    return this.router;
  }
}