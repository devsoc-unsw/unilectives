import express, { Express, Request, Response } from "express";
import cors from "cors";
import { formatError, getLogger } from "../utils/logger";
import * as http from "http";
import bodyParser from "body-parser";
import { promisify } from "util";
import { errorHandlerMiddleware } from "../api/middlewares/errorHandler";
import swaggerUi from "swagger-ui-express";
import docs from "../../docs/swagger.json";
import { IController } from "IController";

export class ExpressWrapper {
  private logger = getLogger();
  private express: Express;
  private server: http.Server;

  constructor() {
    this.express = this.setupExpress();
    this.server = this.setupHttpServer();
  }

  setupExpress(): Express {
    // Add any non router specific Express middleware here
    const app = express()
      .use(cors())
      .use(express.urlencoded({ extended: true }))
      .use(bodyParser.json())
      .use("/docs", swaggerUi.serve, swaggerUi.setup(docs))
      .get("/", (req: Request, res: Response) => {
        this.logger.info("health check");
        res.status(200).json({
          code: 200,
          message: "health check success",
        });
      });

    this.logger.info("Setup Express");
    return app;
  }

  setupHttpServer(): http.Server {
    const server = http.createServer(this.express);
    server.on("error", (err) => {
      this.logger.warn(formatError(err));
    });
    this.logger.info("Setup HTTP server");
    return server;
  }

  async start(port: number): Promise<void> {
    // @ts-ignore
    await promisify(this.server.listen).bind(this.server)(port);
    const address = this.server.address() as { port: number };
    this.logger.info(`Started HTTP server on port ${address.port}`);
  }

  async stop(): Promise<void> {
    try {
      await promisify(this.server.close).bind(this.server)();
      this.logger.info("Stopped HTTP Server");
    } catch (err: any) {
      this.logger.warn(
        `Error when trying to stop HTTP Server ${formatError(err)}`,
      );
    }
  }

  addControllers(...controllers: IController[]): void {
    for (const controller of controllers) {
      this.express.use(controller.getPrefix(), controller.getRouter());
    }
    this.express
      .use((req: Request, res: Response) => {
        res.status(404).json({
          errorCode: 404,
          errorMessage: "Not found",
        });
      })
      .use(errorHandlerMiddleware);
  }
}
