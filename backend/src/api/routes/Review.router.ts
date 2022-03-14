import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { ReviewService } from "../services/Review.service";

export class ReviewRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly reviewService: ReviewService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router().get(
      "/reviews",
      async (req: Request, res: Response, next: NextFunction) => {
        this.logger.debug(`Received request in /reviews`);
        try {
          const result = await this.reviewService.getReviews();
          return res.status(200).json(result);
        } catch (err: any) {
          this.logger.warn(
            `An error occurred when trying to GET /reviews ${formatError(err)}`
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