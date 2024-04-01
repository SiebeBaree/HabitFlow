import { passwordSchema } from "@/schemas";
import z from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Name is required.",
        })
        .max(50, {
            message: "Name must be less than 50 characters long.",
        }),
    email: z.string().email(),
    password: passwordSchema,
});
