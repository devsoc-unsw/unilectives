import { getLogger } from "./utils/Logger";
import { ExpressWrapper } from "./modules/ExpressWrapper";
import Database from "./modules/Database";
import config from "config";
import { CourseService } from "./api/services/Course.service";
import { CourseRouter } from "./api/routes/Course.router";
import { CourseRepository } from "./repositories/Course.repository";

export default class App {
  readonly logger = getLogger();
  private ex = new ExpressWrapper();
  // if using db, uncomment relevant lines
  private db = new Database("default");

  // add repositories
  private readonly courseRepository = new CourseRepository();

  // add services here
  private readonly courseService = new CourseService(this.courseRepository);

  constructor() {
    // add routers here .. e.g.
    const courseRouter = new CourseRouter(this.courseService);

    this.ex.addRouters(
      // ... add routers here
      courseRouter
    );
  }

  async start(): Promise<void> {
    this.logger.info("Starting up...");
    await this.db.start();
    await this.ex.start(config.get("api.port"));
    this.logger.info("Started HTTP Server and Database");
  }

  async stop(): Promise<void> {
    await this.ex.stop();
    await this.db.stop();
  }
}
