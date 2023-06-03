import config from "config";
import Database from "./modules/Database";
import { getLogger } from "./utils/logger";
import { ExpressWrapper } from "./modules/ExpressWrapper";
import { ReviewService } from "./services/review.service";
import { ReviewController } from "./controllers/review.controller";
import { CourseService } from "./services/course.service";
import { CourseController } from "./controllers/course.controller";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";
import { ReportController } from "./controllers/report.controller";
import { ReportService } from "./services/report.service";
import { AuthService } from "./modules/Auth";
import { CourseRepository } from "./repositories/course.repository";
import { UserRepository } from "./repositories/user.repository";
import PrismaClient from "./modules/prisma";

export default class App {
  readonly logger = getLogger();
  private ex = new ExpressWrapper();
  private db = new Database("default");
  private prisma = new PrismaClient();

  // db manager
  private readonly manager = this.db.get().manager;

  // auth
  private readonly auth = new AuthService();

  private readonly courseRepository = new CourseRepository(
    this.prisma.getConnection()
  );
  private readonly userRepository = new UserRepository(this.manager);

  // add services here, manager will be prisma once other services are migrated too
  private readonly courseService = new CourseService(
    this.courseRepository,
    this.userRepository
  );
  private readonly userService = new UserService(
    this.manager,
    this.auth,
    this.courseRepository
  );
  private readonly reportService = new ReportService(this.manager);
  private readonly reviewService = new ReviewService(this.manager);

  constructor() {
    // add controllers here .. e.g.
    const reviewController = new ReviewController(this.reviewService);
    const courseController = new CourseController(this.courseService);
    const userController = new UserController(this.userService);
    const reportController = new ReportController(this.reportService);

    this.ex.addControllers(
      // ... add controllers here
      reviewController,
      courseController,
      userController,
      reportController
    );
  }

  async start(): Promise<void> {
    this.logger.info("Starting up...");
    await this.db.start();
    await this.ex.start(config.get("api.port"));
    this.prisma.start;
    this.logger.info("Started HTTP Server and Database");
  }

  async stop(): Promise<void> {
    await this.ex.stop();
    await this.db.stop();
    this.prisma.stop
  }
}
