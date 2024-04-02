"use server";

import { createHabitSchema } from "@/schemas";
import { auth } from "@/server/auth";
import { createRateLimit } from "@/server/data/ratelimit";
import { db } from "@/server/db";
import { habits } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import type { z } from "zod";

const ratelimit = createRateLimit(25, "1d");

export async function createHabit(values: z.infer<typeof createHabitSchema>) {
    const validatedData = createHabitSchema.safeParse(values);
    if (!validatedData.success) {
        return {
            success: false,
            error: "Invalid habit name!",
        };
    }

    const session = await auth();
    if (!session) {
        return {
            success: false,
            error: "Not authenticated",
        };
    }

    const ip = headers().get("x-forwarded-for") ?? headers().get("x-real-ip");
    if (!ip) {
        return {
            success: false,
            error: "Invalid IP",
        };
    }

    const { success } = await ratelimit.limit(ip);
    if (!success) {
        return {
            success: false,
            error: "You have reached the limit for creating habits today. Try focusing on a few habits, don't overdo it!",
        };
    }

    await db.insert(habits).values({
        name: validatedData.data.name,
        userId: session.user.id,
        createdAt: new Date(),
        sortOrder: 0,
    });

    revalidatePath("/app");
    return {
        success: true,
    };
}
