import { Request, Response, NextFunction, Router } from "express";
import MigrationService from "./service";

export default class MigrationController {
  private readonly logger = console;
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly migrationService: MigrationService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router().post(
      "/migrate",
      async (req: Request, res: Response, next: NextFunction) => {
        this.logger.debug(`Received request in POST /migrate`);
        try {
          const result = await this.migrationService.migrateReviews();
          this.logger.info(`Responding to client in POST /migrate`);
          return res.status(200).json(result);
        } catch (err: any) {
          this.logger.warn(
            `An error occurred when trying to POST /migrate ${err}`
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
