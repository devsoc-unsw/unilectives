import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../utils/logger";
import { ReportService } from "../services/report.service";
import validationMiddleware from "../api/middlewares/validation";
import {
  CreateReport,
  CreateReportSchema,
  UpdateReportStatus,
  UpdateReportStatusSchema,
} from "../api/schemas/report.schema";
import { IController } from "IController";

export class ReportController implements IController {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly reportService: ReportService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .get(
        "/reports",
        async (req: Request, res: Response, next: NextFunction) => {
          this.logger.debug(`Received GET request in /reports`);
          try {
            const result = await this.reportService.getAllReports();
            this.logger.info(`Responding to client in /reports`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /reports ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .post(
        "/reports",
        validationMiddleware(CreateReportSchema, "body"),
        async (
          req: Request<Record<string, never>, unknown, CreateReport>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug(`Received POST request in /reports`, req.body);
          try {
            const request = req.body;
            const result = await this.reportService.createReport(request);
            this.logger.info(`Responding to client in /reports`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /reports ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .put(
        "/reports",
        validationMiddleware(UpdateReportStatusSchema, "body"),
        async (
          req: Request<Record<string, never>, unknown, UpdateReportStatus>,
          res: Response,
          next: NextFunction,
        ) => {
          this.logger.debug(`Received PUT request in /reports`, req.body);
          try {
            const request = req.body;
            const result = await this.reportService.updateReport(request);
            this.logger.info(`Responding to client in /reports`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to PUT /reports ${formatError(
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
