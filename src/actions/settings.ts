"use server";

import { settingsAccountSchema, settingsNotificationsSchema } from "@/schemas";
import { auth } from "@/server/auth";
import { createRateLimit } from "@/server/data/ratelimit";
import { headers } from "next/headers";
import type { z } from "zod";
import { hash, compare } from "bcrypt-ts";
import { db } from "@/server/db";
import { userSettings, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { takeUniqueOrThrow } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const ratelimit = createRateLimit(5, "5m");

type UserData = {
    password?: string;
    name?: string;
};

export async function updateAccount(
    values: z.infer<typeof settingsAccountSchema>,
) {
    const validatedData = settingsAccountSchema.safeParse(values);
    if (!validatedData.success) {
        return {
            success: false,
            error: "Something went wrong, please try again.",
        };
    }

    const session = await auth();
    if (!session) {
        return {
            success: false,
            error: "Not authenticated",
        };
    }

    const ip = headers().get("x-forwarded-for") ?? headers().get("x-real-ip");
    if (!ip) {
        return {
            success: false,
            error: "Invalid IP",
        };
    }

    const { success } = await ratelimit.limit(ip);
    if (!success) {
        return {
            success: false,
            error: "Slow down! You're updating your account too fast.",
        };
    }

    try {
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.id, session.user.id))
            .then(takeUniqueOrThrow);

        const userData: UserData = {};
        const updateName = validatedData.data.name !== session.user.name;
        const updatePassword =
            (validatedData.data.newPassword?.length ?? 0) > 8;

        if (updateName) {
            userData.name = validatedData.data.name;
        }

        if (updatePassword) {
            if (
                validatedData.data.oldPassword &&
                validatedData.data.newPassword &&
                existingUser.password
            ) {
                const passwordsMatch = await compare(
                    validatedData.data.oldPassword,
                    existingUser.password,
                );

                if (!passwordsMatch) {
                    return {
                        success: false,
                        error: "Invalid password.",
                    };
                }

                const hashedPassword = await hash(
                    validatedData.data.newPassword,
                    10,
                );

                userData.password = hashedPassword;
            } else {
                return {
                    success: false,
                    error: "Invalid password.",
                };
            }
        }

        if (Object.keys(userData).length > 0) {
            await db
                .update(users)
                .set(userData)
                .where(eq(users.id, session.user.id));
        } else {
            return {
                success: false,
                error: "Nothing to update.",
            };
        }

        return {
            success: true,
        };
    } catch {
        return {
            success: false,
            error: "Failed to update account.",
        };
    }
}

export async function updateNotifications(
    values: z.infer<typeof settingsNotificationsSchema>,
) {
    const validatedData = settingsNotificationsSchema.safeParse(values);
    if (!validatedData.success) {
        return {
            success: false,
            error: "Something went wrong, please try again.",
        };
    }

    const session = await auth();
    if (!session) {
        return {
            success: false,
            error: "Not authenticated",
        };
    }

    const ip = headers().get("x-forwarded-for") ?? headers().get("x-real-ip");
    if (!ip) {
        return {
            success: false,
            error: "Invalid IP",
        };
    }

    const { success } = await ratelimit.limit(ip);
    if (!success) {
        return {
            success: false,
            error: "Slow down! You're updating your account too fast.",
        };
    }

    await db
        .update(userSettings)
        .set({
            habitReminders: validatedData.data.habitReminders ?? true,
            updateEmails: validatedData.data.updateEmails ?? true,
            marketingEmails: validatedData.data.marketingEmails ?? true,
        })
        .where(eq(userSettings.userId, session.user.id));

    revalidatePath("/api/settings");
    return {
        success: true,
    };
}
