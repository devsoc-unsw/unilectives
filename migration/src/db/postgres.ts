import { env } from "src/env";
import { DataSource } from "typeorm";
import { CourseEntity } from "../entity/Course";
import { ReviewEntity } from "../entity/Review";
import { UserEntity } from "../entity/User";
import { IDatabaseConfig } from "src/types/IConfig";

export default class Postgres {
  private logger = console;
  private dbConnection: DataSource;

  constructor(readonly connectionName: string) {
    this.dbConnection = new DataSource({
      type: "postgres",
      applicationName: this.connectionName,
      entities: [CourseEntity, ReviewEntity, UserEntity],
      port: env.DB_PORT,
      host: process.env.POSTGRESQL_HOST ?? env.DB_HOST,
      username: process.env.POSTGRESQL_USER ?? env.DB_USERNAME,
      password: process.env.POSTGRESQL_PASSWORD ?? env.DB_PASWORD,
      database: process.env.POSTGRESQL_DATABASE ?? env.DB,
    });
  }

  get() {
    return this.dbConnection;
  }

  async start(): Promise<void> {
    await this.dbConnection.initialize();
    this.logger.info(
      `Started connection with connection name ${this.connectionName}`
    );
  }

  async stop(): Promise<void> {
    if (this.dbConnection.isInitialized) await this.dbConnection.destroy();
    this.logger.info(
      `Stopped connection with connection name ${this.connectionName}`
    );
  }
}
