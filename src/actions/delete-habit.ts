"use server";

import { takeUniqueOrThrow } from "@/lib/utils";
import { auth } from "@/server/auth";
import { createRateLimit } from "@/server/data/ratelimit";
import { db } from "@/server/db";
import { dailyTracking, habits } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

const ratelimit = createRateLimit(10, "1m");

const deleteHabitSchema = z.object({
    habitId: z.number().min(1, {
        message: "Invalid habit ID",
    }),
});

export async function deleteHabit(habitId: number) {
    const validatedData = deleteHabitSchema.safeParse({
        habitId,
    });
    if (!validatedData.success) {
        return {
            success: false,
            error: "Something went wrong, please refresh the page and try again.",
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
            error: "Hey, slow down! You're deleting habits too quickly. Try again in a minute.",
        };
    }

    try {
        await db
            .select()
            .from(habits)
            .where(
                and(
                    eq(habits.id, validatedData.data.habitId),
                    eq(habits.userId, session.user.id),
                ),
            )
            .then(takeUniqueOrThrow);

        await db
            .delete(dailyTracking)
            .where(and(eq(dailyTracking.habitId, validatedData.data.habitId)));

        await db
            .delete(habits)
            .where(eq(habits.id, validatedData.data.habitId));

        return {
            success: true,
        };
    } catch {
        return {
            success: false,
            error: "Habit not found.",
        };
    }
}
