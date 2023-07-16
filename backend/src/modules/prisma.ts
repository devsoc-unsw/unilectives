import { PrismaClient as Connection } from "@prisma/client";
import { getLogger } from "../utils/logger";
import env from "../env";

export default class PrismaClient {
  private logger = getLogger();
  private connection: Connection;

  constructor() {
    this.connection = new Connection({
      log: process.env.NODE_ENV !== "production" ? [] : ["query"],
      datasources: {
        db: {
          url: env.DATABASE_URL,
        },
      },
    });
  }

  getConnection() {
    return this.connection;
  }

  async start(): Promise<void> {
    await this.connection.$connect();
    this.logger.info(`Started prisma connection`);
  }

  async stop(): Promise<void> {
    await this.connection.$disconnect();
    this.logger.info(`Stopped prisma connection`);
  }
}
