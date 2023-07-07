import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { logger } from "../utils/logger";
import HTTPError from "../utils/error";
import { env } from "../utils/env";
import * as jose from "jose";
import { NotFoundError } from "elysia";

export default class AuthService {
  async login(body: { zid: string; password: string }) {
    let user = undefined;
    const { zid, password } = body;
    const displayName = await this.verify(zid, password);
    const result = await db.select().from(users).where(eq(users.zid, zid));
    if (result.length === 0) {
      user = await this.createUser(displayName, zid);
    } else {
      logger.info(`User logged in for ${zid}`);
      user = result[0];
    }

    const token = await this.getToken(zid, user.role);
    return { token };
  }

  // hello who are you and are you still a valid way to be verifying
  // for our future unsw oauth, i dont think so but im scared to remove u
  async verify(zid: string, zpass: string) {
    const res = await fetch("https://verify.csesoc.unsw.edu.au/v1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ zid, zpass }),
    });

    if (!res.ok) {
      let errorMessage = res.statusText;
      try {
        const json = (await res.json()) as { error: string };
        errorMessage = json.error;
      } catch (err) {}

      logger.error(
        `Verify error ${res.status} - ${res.statusText}: ${errorMessage}`
      );
      throw new HTTPError(res.status, errorMessage);
    }

    const json = (await res.json()) as { displayName: string };
    return json.displayName;
  }

  async createUser(name: string, zid: string) {
    const result = await db.insert(users).values({ zid, name }).returning();
    logger.info(`Successfully registered ${zid} with id ${result[0].id}`);
    return result[0];
  }

  async getToken(zid: string, role: string) {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    const alg = "HS256";
    const jwt = await new jose.SignJWT({ zid, role })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .sign(secret);
    return jwt;
  }

  async updateRole(zid: string, role: "default" | "admin") {
    const result = await db
      .update(users)
      .set({ role })
      .where(eq(users.zid, zid))
      .returning();
    if (result.length === 0) {
      logger.error(
        `No user with zid ${zid} found`
      );
      throw new NotFoundError();
    }
    return result[0];
  }
}
