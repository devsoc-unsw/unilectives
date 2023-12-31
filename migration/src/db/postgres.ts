import { env } from "src/env";
import { DataSource } from "typeorm";
import { CourseEntity } from "../entity/Course";
import { ReviewEntity } from "../entity/Review";
import { UserEntity } from "../entity/User";

export default class Postgres {
  private logger = console;
  private dbConnection: DataSource;

  constructor(readonly connectionName: string) {
    this.dbConnection = new DataSource({
      type: env.DB_TYPE as "postgres" | "mysql",
      applicationName: this.connectionName,
      entities: [CourseEntity, ReviewEntity, UserEntity],
      port: env.POSTGRESQL_PORT,
      host: env.POSTGRESQL_HOST,
      username: env.POSTGRESQL_USER,
      password: env.POSTGRESQL_PASSWORD,
      database: env.POSTGRESQL_DATABASE,
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
