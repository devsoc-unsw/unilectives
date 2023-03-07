import { Router } from "express";
import { z } from "zod";

export const ControllerSchema = z.object({
  setupRoutes: z.function().args(z.void()).returns(z.custom<Router>()),
  getRouter: z.function().args(z.void()).returns(z.custom<Router>()),
  getPrefix: z.function().args(z.void()).returns(z.string()),
});
