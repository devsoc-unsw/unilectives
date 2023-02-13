import { z } from "zod";

export const CreateUserSchema = z.object({
  zid: z.string(),
}).strict();
