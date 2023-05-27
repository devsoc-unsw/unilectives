import { logger } from "./utils/logger";
import { env } from "./utils/env";
import { db } from "./db";
import App from "./app";

const app = new App();
try {
  await app.run(env.PORT, db);
} catch (err) {
  logger.error("App couldn't start", err);
} finally {
  const { hostname, port } = app.getAppInfo();
  logger.info(`🦊 Server is running at ${hostname}:${port}`);
}
