import { passwordSchema } from "@/schemas";
import z from "zod";

export const resetPasswordSchema = z.object({
    password: passwordSchema,
});
