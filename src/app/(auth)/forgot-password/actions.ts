"use server";

import type { z } from "zod";
import { forgotPasswordSchema } from "./schema";
import { getUserByEmail } from "@/server/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

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

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(email, passwordResetToken.token);

    return {
        success: true,
        message: "Reset email sent!",
    };
}
