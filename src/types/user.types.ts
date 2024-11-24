import { z } from "zod";

export const IAuthDataSchema = z.object({
  email: z.string().email(),
  loggedInAt: z.date(),
  isAuthenticated: z.boolean(),
});

export type IAuthData = z.infer<typeof IAuthDataSchema>;
