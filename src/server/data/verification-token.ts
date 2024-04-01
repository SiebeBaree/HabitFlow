import { takeUniqueOrThrow } from "@/lib/utils";
import { db } from "@/server/db";
import { verificationToken } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getVerificationTokenByEmail(email: string) {
    try {
        return await db
            .select()
            .from(verificationToken)
            .where(eq(verificationToken.email, email))
            .limit(1)
            .then(takeUniqueOrThrow);
    } catch {
        return null;
    }
}

export async function getVerificationTokenByToken(token: string) {
    try {
        return await db
            .select()
            .from(verificationToken)
            .where(eq(verificationToken.token, token))
            .limit(1)
            .then(takeUniqueOrThrow);
    } catch {
        return null;
    }
}
