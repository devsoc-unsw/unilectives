import { DataSource } from "typeorm";
import { getLogger } from "../utils/Logger";
import { Name } from "../entity/Name";
import { CourseEntity } from "../entity/Course";
import { ReviewEntity } from "../entity/Review";
import { UserEntity } from "../entity/User";
import { ReportEntity } from "../entity/Report";

export default class Database {
  private logger = getLogger();
  private dbConnection = new DataSource({
    applicationName: this.connectionName,
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "mysecretpassword",
    database: "mydb",
    entities: [Name, CourseEntity, UserEntity, ReportEntity, ReviewEntity],
  });
  constructor(readonly connectionName: string) {}

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
    await this.dbConnection.destroy();
    this.logger.info(
      `Stopped connection with connection name ${this.connectionName}`
    );
  }
}
