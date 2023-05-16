import config from "config";
import { DataSource } from "typeorm";
import { getLogger } from "../utils/logger";
import { CourseEntity } from "../entity/Course";
import { ReviewEntity } from "../entity/Review";
import { UserEntity } from "../entity/User";
import { ReportEntity } from "../entity/Report";
import { IDatabaseConfig } from "IConfig";
import { PrismaClient } from "@prisma/client";

export default class Database {
  private logger = getLogger();
  private dbConnection: DataSource;
  private prismaConnection: PrismaClient;
  constructor(readonly connectionName: string) {
    const dbConfig: IDatabaseConfig = config.get("database");
    this.prismaConnection = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
    this.dbConnection = new DataSource({
      applicationName: this.connectionName,
      entities: [CourseEntity, UserEntity, ReportEntity, ReviewEntity],
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

  // will become primary get method as above once fully migrated
  getPrisma() {
    return this.prismaConnection;
  }

  async start(): Promise<void> {
    await this.prismaConnection.$connect();
    this.logger.info(
      `Started connection with connection name ${this.connectionName}`
    );
  }

  async stop(): Promise<void> {
    if (this.dbConnection.isInitialized) await this.dbConnection.destroy();
    await this.prismaConnection.$disconnect();
    this.logger.info(
      `Stopped connection with connection name ${this.connectionName}`
    );
  }
}
