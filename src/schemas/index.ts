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
    habitName: z
        .string()
        .min(1, {
            message: "Habit name must be at least 1 character long.",
        })
        .max(128, {
            message: "Habit name must be at most 128 characters long.",
        }),
});

export const settingsAccountSchema = z.object({
    name: z
        .string()
        .min(1, {
            message: "Name is required.",
        })
        .max(50, {
            message: "Name must be less than 50 characters long.",
        }),
    oldPassword: passwordSchema.optional(),
    newPassword: passwordSchema.optional(),
});

export const settingsNotificationsSchema = z.object({
    habitReminders: z.boolean(),
    updateEmails: z.boolean(),
    marketingEmails: z.boolean(),
});

export const updateHabitSchema = z.object({
    habitName: z
        .string()
        .min(1, {
            message: "Habit name must be at least 1 character long.",
        })
        .max(128, {
            message: "Habit name must be at most 128 characters long.",
        }),
    goal: z
        .number()
        .int()
        .gte(0, {
            message: "Goal must be a positive number.",
        })
        .lte(31, {
            message: "Goal must be less than or equal to 31.",
        })
        .optional(),
});
