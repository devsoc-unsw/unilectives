import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../utils/logger";
import { ReviewService } from "../services/review.service";
import verifyToken from "../api/middlewares/auth";
import validationMiddleware from "../api/middlewares/validation";
import { HTTPError } from "../utils/errors";
import { badRequest } from "../utils/constants";
import { IController } from "IController";
import {
  PostReviewSchema,
  BookmarkReviewSchema,
  UpvoteReviewSchema,
  PostReviewRequestBody,
  PutReviewRequestBody,
  BookmarkReview,
  UpvoteReview,
  PutReviewRequestBodySchema,
} from "../api/schemas/review.schema";

export class ReviewController implements IController {
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
            this.logger.info(`Responding to client in GET /reviews`);
            return res.status(200).json({ ...result });
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /reviews ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .get(
        "/reviews/scraped",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in /reviews/scraped`);
          try {
            const result = await this.reviewService.getAllReviewsScraped();
            this.logger.info(`Responding to client in GET /reviews/scraped`);
            return res.status(200).json({ ...result });
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /reviews/scraped ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .get(
      "/wrapped/reviews/most-liked",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in /wrapped/reviews/most-liked`);
          try {
            const result = await this.reviewService.getMostLiked();
            this.logger.info(
              `Responding to client in GET /wrapped/reviews/most-liked`,
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /wrapped/reviews/most-liked ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .get(
        "/reviews/:courseCode",
        async (
          req: Request<{ courseCode: string }, unknown>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug(`Received request in /reviews/:courseCode`);
          try {
            const courseCode: string = req.params.courseCode;
            const result =
              await this.reviewService.getCourseReviews(courseCode);
            this.logger.info(
              `Responding to client in GET /reviews/${courseCode}`,
            );
            return res.status(200).json({ ...result });
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /reviews ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .get(
        "/reviews/scraped/:courseCode",
        async (
          req: Request<{ courseCode: string }, unknown>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug(
            `Received request in /reviews/scraped/:courseCode`,
          );
          try {
            const courseCode: string = req.params.courseCode;
            const result =
              await this.reviewService.getCourseReviewsScraped(courseCode);
            this.logger.info(
              `Responding to client in GET /reviews/scraped/${courseCode}`,
            );
            return res.status(200).json({ ...result });
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /reviews/scraped ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .get(
        "/reviews/scraped/maxId/:source",
        async (
          req: Request<{ source: string }, unknown>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug(
            `Received request in /reviews/scraped/maxId/:source`,
          );
          try {
            const source: string = req.params.source;
            const result =
              await this.reviewService.getSourceReviewScrapedMaxId(source);
            this.logger.info(
              `Responding to client in GET /reviews/scraped/maxId/${source}`,
            );
            return res.status(200).json({ ...result });
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /reviews/scraped/maxId ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .post(
        "/reviews",
        [verifyToken, validationMiddleware(PostReviewSchema, "body")],
        async (
          req: Request<Record<string, never>, unknown, PostReviewRequestBody>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug("Received request in POST /reviews");
          try {
            const reviewDetails = req.body;
            if (!reviewDetails) throw new HTTPError(badRequest);
            const result = await this.reviewService.postReview(reviewDetails);
            this.logger.info(`Responding to client in POST /reviews`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /reviews ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .put(
        "/reviews/:reviewId",
        [verifyToken, validationMiddleware(PutReviewRequestBodySchema, "body")],
        async (
          req: Request<{ reviewId: string }, unknown, PutReviewRequestBody>,
          res: Response,
          next: NextFunction,
        ) => {
          const { reviewId } = req.params;
          this.logger.debug(`Received request in PUT /reviews/${reviewId}`);
          try {
            const updatedReviewDetails = req.body;
            if (!updatedReviewDetails) throw new HTTPError(badRequest);
            const result = await this.reviewService.updateReview(
              updatedReviewDetails,
              reviewId,
            );
            this.logger.info(
              `Responding to client in PUT /reviews/${reviewId}`,
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /reviews ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .delete(
        "/reviews/:reviewId",
        [verifyToken],
        async (
          req: Request<{ reviewId: string }, unknown>,
          res: Response,
          next: NextFunction,
        ) => {
          const { reviewId } = req.params;
          this.logger.debug(`Received request in DELETE /reviews/${reviewId}`);
          try {
            const reviewId: string = req.params.reviewId;
            const result = await this.reviewService.deleteReview(reviewId);
            this.logger.info(
              `Responding to client in DELETE /reviews/${reviewId}`,
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to DELETE /reviews ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .post(
        "/reviews/bookmark",
        [verifyToken, validationMiddleware(BookmarkReviewSchema, "body")],
        async (
          req: Request<Record<string, never>, unknown, BookmarkReview>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug(`Received request in POST /reviews/bookmark`);
          try {
            const reviewDetails = req.body;
            if (!reviewDetails) throw new HTTPError(badRequest);
            const result =
              await this.reviewService.bookmarkReview(reviewDetails);
            this.logger.info(`Responding to client in POST /reviews/bookmark`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /reviews/bookmark ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .post(
        "/reviews/upvote",
        [verifyToken, validationMiddleware(UpvoteReviewSchema, "body")],
        async (
          req: Request<Record<string, never>, unknown, UpvoteReview>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug(`Received request in POST /reviews/upvote`);
          try {
            const reviewDetails = req.body;
            const result = await this.reviewService.upvoteReview(reviewDetails);
            this.logger.info(`Responding to client in POST /reviews/upvote`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /reviews/upvote ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      );
  }

  getPrefix(): string {
    return this.prefix;
  }

  getRouter(): Router {
    return this.router;
  }
}
