import {
  pgEnum,
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["default", "admin"]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().notNull(),
    zid: varchar("zid", { length: 256 }).notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    role: rolesEnum("role").default("default").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (users) => {
    return {
      cpk: primaryKey(users.zid, users.id),
      zidIndex: uniqueIndex("users_zid_index").on(users.zid),
      idIndex: uniqueIndex("users_id_index").on(users.id),
    };
  }
);
