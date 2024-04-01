"use server";

import type { z } from "zod";
import { resetPasswordSchema } from "./schema";
import { getPasswordResetTokenByToken } from "@/server/data/password-reset-token";
import { getUserByEmail } from "@/server/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/server/db";
import { passwordResetToken, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function reset(
    values: z.infer<typeof resetPasswordSchema>,
    token: string | null,
) {
    if (!token) {
        return {
            success: false,
            error: "Missing token!",
        };
    }

    const validatedFields = resetPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            success: false,
            error: "Invalid fields",
        };
    }

    const { password } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) {
        return {
            success: false,
            error: "Invalid token!",
        };
    }

    if (existingToken.expires < new Date()) {
        return {
            success: false,
            error: "Token has expired!",
        };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return {
            success: false,
            error: "Email does not exist!",
        };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db
        .update(users)
        .set({
            password: hashedPassword,
        })
        .where(eq(users.id, existingUser.id));

    await db
        .delete(passwordResetToken)
        .where(eq(passwordResetToken.id, existingToken.id));

    return {
        success: true,
        message: "Password has been reset!",
    };
}
