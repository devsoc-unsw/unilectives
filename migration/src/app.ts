import config from "config";
import express, { Express } from "express";
import Firebase from "./db/firebase";
import Postgres from "./db/postgres";
import MigrationController from "./migrate";
import Fetcher from "./migrate/fetcher";
import MigrationService from "./migrate/service";

export default class App {
  private logger = console;
  private pg = new Postgres("default");
  private fb = new Firebase(config.get("firebase"));
  private fetcher = new Fetcher();
  private migrationService = new MigrationService(
    this.pg.get().manager,
    this.fb,
    this.fetcher
  );
  private migrationController = new MigrationController(this.migrationService);
  private ex = this.setupExpress();

  setupExpress(): Express {
    return express()
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use(
        this.migrationController.getPrefix(),
        this.migrationController.getRouter()
      );
  }

  async start(): Promise<void> {
    this.logger.info("Starting up...");
    await this.pg.start();
    await this.fb.start();
    this.ex.listen(config.get("api.port"));

    this.logger.info("Started up!");
  }

  async stop(): Promise<void> {
    await this.pg.stop();
    await this.fb.stop();
  }
}
