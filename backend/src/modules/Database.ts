import { createConnection, getConnection } from "typeorm";
import { getLogger } from "../utils/Logger";
import { IDatabaseConfig } from "IConfig";
import config from "config";
import { CourseEntity } from "../entity/Course";
import { UserEntity } from "../entity/User";

export default class Database {
  private logger = getLogger();
  constructor(readonly connectionName: string) {}

  async start(): Promise<void> {
    const databaseConfig: IDatabaseConfig = config.get("database");
    // add entities below
    await createConnection({
      name: this.connectionName,
      entities: [CourseEntity, UserEntity],
      ...databaseConfig,
      username: "postgres",
      password: "mysecretpassword",
      database: "mydb",
    });
    this.logger.info(
      `Started connection with connection name ${this.connectionName}`
    );
  }

  async stop(): Promise<void> {
    await getConnection(this.connectionName).close();
    this.logger.info(
      `Stopped connection with connection name ${this.connectionName}`
    );
  }
}
