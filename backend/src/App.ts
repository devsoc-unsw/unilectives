import { getLogger } from "./utils/Logger";
import { ExpressWrapper } from "./modules/ExpressWrapper";
import Database from "./modules/Database";
import config from "config";
import { NameService } from "./api/services/Name.service";
import { NameRouter } from "./api/routes/Name.router";
import { CourseService } from "./api/services/Course.service";
import { CourseRouter } from "./api/routes/Course.router";
import { UserService } from "./api/services/User.service";
import { UserRouter } from "./api/routes/User.router";
import { ReportRouter } from "./api/routes/Report.router";
import { ReportService } from "./api/services/Report.service";
import { AuthService } from "./modules/Auth";

export default class App {
  readonly logger = getLogger();
  private ex = new ExpressWrapper();
  // if using db, uncomment relevant lines
  private db = new Database("default");

  // db manager
  private readonly manager = this.db.get().manager;

  // auth
  private readonly auth = new AuthService();

  // add services here
  private readonly nameService = new NameService();
  private readonly courseService = new CourseService(this.manager);
  private readonly userService = new UserService(this.manager, this.auth);
  private readonly reportService = new ReportService(this.manager);

  constructor() {
    // add routers here .. e.g.
    const nameRouter = new NameRouter(this.nameService);
    const courseRouter = new CourseRouter(this.courseService);
    const userRouter = new UserRouter(this.userService);
    const reportRouter = new ReportRouter(this.reportService);

    this.ex.addRouters(
      // ... add routers here
      nameRouter,
      courseRouter,
      userRouter,
      reportRouter
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
