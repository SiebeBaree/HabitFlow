import z from "zod";

export const passwordSchema = z
    .string()
    .min(8, {
        message: "Password must be at least 8 characters long.",
    })
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
        message:
            "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.",
    });

export const createHabitSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Habit name must be at least 1 character long.",
        })
        .max(128, {
            message: "Habit name must be at most 128 characters long.",
        }),
});
