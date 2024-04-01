import { getPasswordResetTokenByEmail } from "@/server/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/server/data/verification-token";
import { db } from "@/server/db";
import { passwordResetToken, verificationToken } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

type Token = {
    email: string;
    token: string;
    expires: Date;
};

export async function generateVerificationToken(email: string): Promise<Token> {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 1000 * 60 * 60);

    const existingToken = await getVerificationTokenByEmail(email);
    if (existingToken) {
        await db
            .delete(verificationToken)
            .where(eq(verificationToken.id, existingToken.id));
    }

    await db.insert(verificationToken).values({
        email,
        token,
        expires,
    });

    return { email, token, expires };
}

export async function generatePasswordResetToken(
    email: string,
): Promise<Token> {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 1000 * 60 * 60);

    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken) {
        await db
            .delete(passwordResetToken)
            .where(eq(passwordResetToken.id, existingToken.id));
    }

    await db.insert(passwordResetToken).values({
        email,
        token,
        expires,
    });

    return { email, token, expires };
}
