"use server";

import type { z } from "zod";
import { loginSchema } from "./schema";
import { signIn } from "@/server/auth";
import { AuthError } from "@auth/core/errors";
import { getUserByEmail } from "@/server/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/server/mail";
import { headers } from "next/headers";
import { createRateLimit } from "@/server/data/ratelimit";

const ratelimit = createRateLimit(2, "45m");

export async function login(
    values: z.infer<typeof loginSchema>,
    callbackUrl?: string | null,
) {
    const validatedFields = loginSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            success: false,
            error: "Invalid fields",
        };
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser?.email || !existingUser.password) {
        return {
            success: false,
            error: "Invalid credentials",
        };
    }

    if (!existingUser.emailVerified) {
        const ip =
            headers().get("x-forwarded-for") ?? headers().get("x-real-ip");

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
                error: "Check your email for the verification link.",
            };
        }

        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return {
            success: true,
            limit: limit,
            remaining: remaining,
            message: "Confirmation email sent!",
        };
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: callbackUrl ?? "/app",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        success: false,
                        error: "Invalid credentials",
                    };
                default:
                    return {
                        success: false,
                        error: "Something went wrong.",
                    };
            }
        }

        throw error;
    }
}
