import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { passwordResetToken } from "@/server/db/schema";
import { takeUniqueOrThrow } from "@/lib/utils";

export async function getPasswordResetTokenByToken(token: string) {
    try {
        return await db
            .select()
            .from(passwordResetToken)
            .where(eq(passwordResetToken.token, token))
            .then(takeUniqueOrThrow);
    } catch {
        return null;
    }
}

export async function getPasswordResetTokenByEmail(email: string) {
    try {
        return await db
            .select()
            .from(passwordResetToken)
            .where(eq(passwordResetToken.email, email))
            .then(takeUniqueOrThrow);
    } catch {
        return null;
    }
}
