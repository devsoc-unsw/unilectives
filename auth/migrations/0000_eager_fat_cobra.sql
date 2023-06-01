DO $$ BEGIN
 CREATE TYPE "roles" AS ENUM('default', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"zid" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"role" roles DEFAULT 'default' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_zid_id" PRIMARY KEY("zid","id");

CREATE UNIQUE INDEX IF NOT EXISTS "users_zid_index" ON "users" ("zid");
CREATE UNIQUE INDEX IF NOT EXISTS "users_id_index" ON "users" ("id");