import { Elysia, ElysiaInstance } from "elysia";
import { Controller } from "./types/controller";
import { logger } from "./utils/logger";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import AuthService from "./services/auth-service";
import AuthController from "./controllers/auth-controller";
import HTTPError from "./utils/error";
import cors from "@elysiajs/cors";

export default class App {
  private app: Elysia<ElysiaInstance>;

  constructor() {
    this.app = this.createServer();
    this.registerRoutes();
  }

  createServer() {
    const server = new Elysia();
    server.use(cors());
    server.onStop((app) =>
      logger.info(
        `🦊 Server ${app.server?.hostname}:${app.server?.port} stopped`
      )
    );
    server.onError(({ code, error, set }) => {
      if (error instanceof HTTPError) {
        logger.error(`HTTP Error: ${error.status} - ${error.statusText}`);
        set.status = error.status;
        return { error: error.statusText };
      }

      if (code === "NOT_FOUND") {
        set.status = 404;
        return "Not Found :(";
      }

      if (code === "VALIDATION" || code === "PARSE") {
        set.status = 400;
        return "Bad request";
      }

      logger.error(`500 Internal Server Error Occurred: ${error}`);
      set.status = 500;
      return "Internal Server Error";
    });

    server.get("/", () => "healthy");
    return server;
  }

  registerRoutes() {
    const authService = new AuthService();
    const authController = new AuthController(authService);
    this.registerControllers(authController);
  }

  registerControllers(...controllers: Controller[]) {
    for (const c of controllers) {
      this.app.group(c.getPrefix(), c.getGroup());
    }
  }

  async run(port: number, db: NodePgDatabase) {
    await this.dbMigrate(db);
    this.app.listen(port);
  }

  stop() {
    this.app.stop();
  }

  async dbMigrate(pg: NodePgDatabase) {
    try {
      await migrate(pg, {
        migrationsFolder: "./migrations",
      });
      logger.info("Migrations completed");
    } catch (err) {
      logger.error("Failed to run database migrations", err);
      throw err;
    }
  }

  getAppInfo() {
    if (!this.app.server) {
      throw new Error("Server not running");
    }
    return {
      hostname: this.app.server.hostname,
      port: this.app.server.port,
    };
  }
}
