import { Request, Response, NextFunction, Router } from "express";
import MigrationService from "./service";

export default class MigrationController {
  private readonly logger = console;
  private readonly router: Router;
  private readonly prefix = "/api/v1/migrate";

  constructor(private readonly migrationService: MigrationService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .post(
        "/reviews",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in POST /migrate/reviews`);
          if (req.headers.authorization !== process.env.MIGRATE_SECRET) {
            return res.status(401).json({
              status: "FAILURE",
              message: "Unauthorized",
            });
          }
          try {
            const result = await this.migrationService.migrateReviews();
            this.logger.info(`Responding to client in POST /migrate/reviews`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /migrate/reviews ${err}`
            );
            return next(err);
          }
        }
      )
      .post(
        "/courses",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in POST /migrate/courses`);
          if (req.headers.authorization !== process.env.MIGRATE_SECRET) {
            return res.status(401).json({
              status: "FAILURE",
              message: "Unauthorized",
            });
          }
          try {
            const result = await this.migrationService.migrateCourses();
            this.logger.info(`Responding to client in POST /migrate/courses`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /migrate/courses ${err}`
            );
            return next(err);
          }
        }
      )
      .delete(
        "/flush",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received request in DELETE /migrate/flush`);
          if (req.headers.authorization !== process.env.MIGRATE_SECRET) {
            return res.status(401).json({
              status: "FAILURE",
              message: "Unauthorized",
            });
          }
          try {
            const result = await this.migrationService.flush();
            this.logger.info(`Responding to client in DELETE /migrate/flush`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to DELETE /migrate/flush ${err}`
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
