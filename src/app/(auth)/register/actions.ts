"use server";

import type { z } from "zod";
import { registerSchema } from "./schema";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/server/mail";

export async function register(values: z.infer<typeof registerSchema>) {
    const validatedFields = registerSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            success: false,
            error: "Invalid fields",
        };
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser: { email: string }[] = await db
        .select({
            email: users.email,
        })
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (existingUser.length > 0) {
        return {
            success: false,
            error: "Email is already in use",
        };
    }

    await db.insert(users).values({
        name,
        email,
        password: hashedPassword,
    });

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
