import { Router } from "express";

// For controller classes
export interface IRouter {
  setupRoutes: () => Router;
  getRouter: () => Router;
  getPrefix: () => string;
}
