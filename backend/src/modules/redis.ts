import IORedis from "ioredis";
import { getLogger } from "../utils/logger";
import env from "../env";

export default class RedisClient {
  private logger = getLogger();
  private redis: IORedis;

  constructor() {
    this.redis = new IORedis({
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      host: env.REDIS_HOST,
      username: env.REDIS_USER,
      password: env.REDIS_PASSWORD,
    });
    this.redis.on("error", (err) => {
      this.logger.warn(`Redis error: ${err}`);
    });
  }

  async start(): Promise<void> {
    await this.redis.connect();
    this.logger.info("Redis connection established.");
  }

  async stop(): Promise<void> {
    await this.redis.quit();
    this.logger.info("Redis connection closed.");
  }

  async set<T>(key: string, value: T): Promise<void> {
    await this.redis.set(key, JSON.stringify(value));
  }

  async get<T>(key: string): Promise<T | undefined> {
    const res = await this.redis.get(key);
    if (!res) {
      return undefined;
    }
    try {
      const parsed = JSON.parse(res);
      return parsed as T;
    } catch (err) {
      this.logger.error(`Failed to parse result from redis: ${err}`);
      throw err;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redis.del(key);
      this.logger.info(`Flushed cache key ${key}`);
    } catch (err) {
      this.logger.error(`Failed to flush key ${key} from redis: ${err}`);
      throw err;
    }
  }
}
