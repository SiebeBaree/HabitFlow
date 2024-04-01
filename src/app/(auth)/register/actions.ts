"use server";

import type { z } from "zod";
import { registerSchema } from "./schema";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/server/mail";
import { headers } from "next/headers";
import { createRateLimit } from "@/server/data/ratelimit";

const ratelimit = createRateLimit(3, "20m");

export async function register(values: z.infer<typeof registerSchema>) {
    const validatedFields = registerSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            success: false,
            error: "Invalid fields",
        };
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
            error: "You created too many accounts! Please try again later.",
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
        limit: limit,
        remaining: remaining,
        message: "Confirmation email sent!",
    };
}
