import { Router } from "express";

// For controller classes
export interface IController {
  setupRoutes: () => Router;
  getRouter: () => Router;
  getPrefix: () => string;
}
