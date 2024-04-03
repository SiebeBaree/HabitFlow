"use server";

import { createHabitSchema } from "@/schemas";
import { auth } from "@/server/auth";
import { createRateLimit } from "@/server/data/ratelimit";
import { db } from "@/server/db";
import { habits } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import type { z } from "zod";

const ratelimit = createRateLimit(20, "1d");

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

    let habitCount = 0;
    if (session.user.role === "free") {
        const allHabits = await db
            .select()
            .from(habits)
            .where(eq(habits.userId, session.user.id));

        habitCount = allHabits.length;
        if (habitCount >= 3 && session.user.role === "free") {
            return {
                success: false,
                error: "You need to upgrade to a premium account to create more habits.",
                showModal: true,
                modalTitle: "You cannot create more habits",
            };
        }
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
    const showModal = session.user.role === "free" && habitCount + 1 === 3;
    return {
        success: true,
        showModal: showModal,
        modalTitle: showModal
            ? "You have reached the limit for free accounts"
            : undefined,
    };
}
