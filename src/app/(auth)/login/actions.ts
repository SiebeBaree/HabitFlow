"use server";

import type { z } from "zod";
import { loginSchema } from "./schema";
import { signIn } from "@/server/auth";
import { AuthError } from "@auth/core/errors";
import { getUserByEmail } from "@/server/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

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
        const verificationToken = await generateVerificationToken(email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return {
            success: true,
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
