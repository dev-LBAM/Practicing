import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
});

export type UserType = z.infer<typeof UserSchema>;
