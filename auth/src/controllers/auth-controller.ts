import Elysia, { t } from "elysia";
import { Controller } from "../types/controller";
import AuthService from "../services/auth-service";
import { logger } from "../utils/logger";
import { env } from "../utils/env";
import HTTPError from "../utils/error";

export default class AuthController implements Controller {
  constructor(private authService: AuthService) {}
  getPrefix() {
    return "/api/v1/auth";
  }

  getGroup() {
    return (app: Elysia) =>
      app
        .post(
          "/login",
          async ({ body }) => {
            logger.info(`Received request for POST /login`);
            return await this.authService.login(body);
          },
          {
            body: t.Object({
              zid: t.String(),
              password: t.String(),
            }),
          }
        )
        .put(
          "/user/role",
          async ({ body, headers }) => {
            logger.info(`Received request for PUT /user/role`);
            if (headers.authorization !== env.ROLE_PASSWORD) {
              throw new HTTPError(401, "Unauthorized");
            }
            return await this.authService.updateRole(body.zid, body.role);
          },
          {
            body: t.Object({
              zid: t.String(),
              role: t.Union([t.Literal("default"), t.Literal("admin")]),
            }),
            headers: t.Object({
              authorization: t.String(),
            }),
          }
        );
  }
}