"use server";

import type { z } from "zod";
import { forgotPasswordSchema } from "./schema";
import { getUserByEmail } from "@/server/data/user";
import { sendPasswordResetEmail } from "@/server/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { headers } from "next/headers";
import { createRateLimit } from "@/server/data/ratelimit";
import { db } from "@/server/db";
import { accounts } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const ratelimit = createRateLimit(2, "45m");

export async function forgot(values: z.infer<typeof forgotPasswordSchema>) {
    const validatedFields = forgotPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            success: false,
            error: "Invalid fields",
        };
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser?.email) {
        return {
            success: false,
            error: "Email not found",
        };
    }

    const credentialsUser = await db
        .select()
        .from(accounts)
        .where(eq(accounts.userId, existingUser.id))
        .limit(1);

    if (credentialsUser.length > 0) {
        if (credentialsUser[0]!.provider !== "credentials") {
            return {
                success: false,
                error: "You signed up with a social provider",
            };
        }
    }

    const ip = headers().get("x-forwarded-for") ?? headers().get("x-real-ip");
    if (!ip) {
        return {
            success: false,
            error: "Invalid IP",
        };
    }

    const { remaining, limit, success } = await ratelimit.limit(ip);
    if (!success) {
        return {
            success: false,
            error: "You have reached the limit for password resets. Please try again later.",
        };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(email, passwordResetToken.token);

    return {
        success: true,
        limit: limit,
        remaining: remaining,
        message: "Reset email sent!",
    };
}
