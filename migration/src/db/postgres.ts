import config from "config";
import { DataSource } from "typeorm";
import { CourseEntity } from "../entity/Course";
import { ReviewEntity } from "../entity/Review";
import { UserEntity } from "../entity/User";
import { IDatabaseConfig } from "src/types/IConfig";

export default class Postgres {
  private logger = console;
  private dbConnection: DataSource;

  constructor(readonly connectionName: string) {
    const dbConfig: IDatabaseConfig = config.get("database");
    this.dbConnection = new DataSource({
      applicationName: this.connectionName,
      entities: [CourseEntity, ReviewEntity, UserEntity],
      ...dbConfig,
      host: process.env.POSTGRESQL_HOST ?? dbConfig.host,
      username: process.env.POSTGRESQL_USER ?? dbConfig.username,
      password: process.env.POSTGRESQL_PASSWORD ?? dbConfig.password,
      database: process.env.POSTGRESQL_DATABASE ?? dbConfig.database,
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
