import { Router, Request, Response, NextFunction } from "express";
import { formatError, getLogger } from "../../utils/Logger";
import { IRouter } from "../../interfaces/IRouter";
import { UserService } from "../services/User.service";
import validationMiddleware from "../middlewares/validation";
import { CreateUserSchema } from "../schemas/User.schema";
export class UserRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api/v1";

  constructor(private readonly userService: UserService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router().post(
      "/user",
      validationMiddleware(CreateUserSchema, "body"),
      async (req: Request, res: Response, next: NextFunction) => {
        const { zid } = req.body;
        this.logger.debug(`Received POST request in /user`, req.body);
        try {
          const result = await this.userService.createUser(zid);
          this.logger.info(`Responding to client in /user/${zid}`);
          return res.status(200).json(result);
        } catch (err: any) {
          this.logger.warn(
            `An error occurred when trying to POST /user ${formatError(err)}`
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
