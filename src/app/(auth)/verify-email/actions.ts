"use server";

import { db } from "@/server/db";
import { getUserByEmail } from "@/server/data/user";
import { getVerificationTokenByToken } from "@/server/data/verification-token";
import { users, verificationToken } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function newVerification(token: string) {
    console.log("newVerification", token);
    const existingToken = await getVerificationTokenByToken(token);
    if (!existingToken) {
        return { success: false, error: "Token does not exist." };
    } else if (existingToken.expires < new Date()) {
        return { success: false, error: "Token has expired." };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) {
        return { success: false, error: "User does not exist." };
    }

    await db
        .update(users)
        .set({
            emailVerified: new Date(),
            email: existingToken.email,
        })
        .where(eq(users.id, existingUser.id));

    await db
        .delete(verificationToken)
        .where(eq(verificationToken.id, existingToken.id));

    return { success: true, message: "Email verified!" };
}
