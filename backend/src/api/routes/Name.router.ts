import { Router, Request, Response, NextFunction } from "express";
import { inspect } from "util";
import { formatError, getLogger } from "../../utils/Logger";
import validationMiddleware from "../middlewares/validation";
import { IRouter } from "../../interfaces/IRouter";
import { RequestSchema } from "../schemas/Request.schema";
import { NameService } from "../services/Name.service";
import { IPostNameRequestBody } from "IApiResponses";

export class NameRouter implements IRouter {
  private readonly logger = getLogger();
  private readonly router: Router;
  private readonly prefix = "/api";

  constructor(private readonly nameService: NameService) {
    this.router = this.setupRoutes();
  }

  setupRoutes(): Router {
    return Router().post(
      "/name",
      validationMiddleware(RequestSchema, "body"),
      async (req: Request, res: Response, next: NextFunction) => {
        this.logger.debug(`Received request with body ${inspect(req.body)}`);

        const nameDetails: IPostNameRequestBody = req.body;
        try {
          const result = await this.nameService.getName(nameDetails);
          return res.status(200).json(result);
        } catch (err: any) {
          this.logger.warn(
            `An error occurred when trying to post name ${formatError(err)}`
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
