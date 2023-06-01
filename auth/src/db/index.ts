import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "../utils/env";

const pool = new Pool({
  connectionString: env.DB_CONN,
});

export const db = drizzle(pool);
