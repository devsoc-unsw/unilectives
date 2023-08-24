import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../utils/logger";
import { UserService } from "../services/user.service";
import validationMiddleware from "../api/middlewares/validation";
import verifyToken from "../api/middlewares/auth";
import { IController } from "IController";
import { CreateUser, CreateUserSchema } from "../api/schemas/user.schema";

export class UserController implements IController {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly userService: UserService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router()
      .post(
        "/user/register",
        validationMiddleware(CreateUserSchema, "body"),
        async (
          req: Request<Record<string, never>, unknown, CreateUser>,
          res: Response,
          next: NextFunction,
        ) => {
          const { zid } = req.body;
          this.logger.debug(
            `Received POST request in /user/register`,
            req.body,
          );
          try {
            const result = await this.userService.saveUser(zid);
            this.logger.info(`Responding to client in /user/register`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to POST /user/register ${formatError(
                err,
              )}`,
            );
            return next(err);
          }
        },
      )
      .get(
        "/user/:zid",
        [verifyToken],
        async (
          req: Request<{ zid: string }, unknown>,
          res: Response,
          next: NextFunction,
        ) => {
          const { zid } = req.params;
          this.logger.debug(`Received GET request in /user`, req.params);
          try {
            const result = await this.userService.getUser(zid);
            this.logger.info(`Responding to client in /user/${zid}`);
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /user ${formatError(err)}`,
            );
            return next(err);
          }
        },
      )
      .get(
        "/user/course/:courseCode",
        [verifyToken],
        async (
          req: Request<{ courseCode: string }, unknown>,
          res: Response,
          next: NextFunction,
        ) => {
          const { courseCode } = req.params;
          const zid = req.headers.zid as string;
          this.logger.debug(
            `Received GET request in /user/course/:courseCode`,
            req.params,
          );
          try {
            const result = await this.userService.getUserCourseInfo(
              courseCode,
              zid,
            );
            this.logger.info(
              `Responding to client in /user/course/:courseCode`,
            );
            return res.status(200).json(result);
          } catch (err: any) {
            this.logger.warn(
              `An error occurred when trying to GET /user/course/:courseCode ${formatError(
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
