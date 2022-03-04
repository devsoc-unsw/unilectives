import { getLogger } from "./utils/Logger";
import { ExpressWrapper } from "./modules/ExpressWrapper";
import Database from "./modules/Database";
import config from "config";
import { NameService } from "./api/services/Name.service";
import { NameRouter } from "./api/routes/Name.router";

export default class App {
  readonly logger = getLogger();
  private ex = new ExpressWrapper();
  // if using db, uncomment relevant lines
  // private db = new Database("default");

  // add services here
  private readonly nameService = new NameService();

  constructor() {
    // add routers here .. e.g.
    const nameRouter = new NameRouter(this.nameService);

    this.ex.addRouters(
      // ... add routers here
      nameRouter
    );
  }

  async start(): Promise<void> {
    this.logger.info("Starting up...");
    // await this.db.start();
    await this.ex.start(config.get("api.port"));
    this.logger.info("Started HTTP Server and Database");
  }

  async stop(): Promise<void> {
    await this.ex.stop();
    // await this.db.stop();
  }
}
