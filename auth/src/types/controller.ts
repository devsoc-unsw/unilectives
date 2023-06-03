import Elysia from "elysia";

export interface Controller {
  getPrefix: () => string;
  getGroup: () => (app: Elysia) => Elysia<any>; // https://github.com/elysiajs/elysia/issues/42
}
