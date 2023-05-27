import { logger } from "./utils/logger";
import { env } from "./utils/env";
import { db } from "./db";
import App from "./app";

const app = new App();
app.run(env.PORT);
await app.dbMigrate(db);

const { hostname, port } = app.getAppInfo();
logger.info(`🦊 Server is running at ${hostname}:${port}`);
