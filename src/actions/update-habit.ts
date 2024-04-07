"use server";

import { auth } from "@/server/auth";
import { createRateLimit } from "@/server/data/ratelimit";
import { db } from "@/server/db";
import { dailyTracking } from "@/server/db/schema";
import { sql } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";

const ratelimit = createRateLimit(10, "20s");

const updateHabitSchema = z.object({
    habitId: z.number().min(1, {
        message: "Invalid habit ID.",
    }),
    date: z.date(),
    completed: z
        .number()
        .min(0, {
            message: "Completed must be at least 0.",
        })
        .max(100, {
            message: "Completed must be at most 100.",
        }),
});

export async function updateHabit(
    habitId: number,
    date: Date,
    completed: number,
) {
    const validatedData = updateHabitSchema.safeParse({
        habitId,
        date,
        completed,
    });
    if (!validatedData.success) {
        return {
            success: false,
            error: "Could not find habit to update!",
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
            error: "Slow down! You're updating habits too quickly.",
        };
    }

    const updatedDailyTrackings = await db
        .update(dailyTracking)
        .set({
            completed: validatedData.data.completed,
        })
        .where(
            sql`${dailyTracking.habitId} = ${validatedData.data.habitId} AND ${dailyTracking.date} = ${validatedData.data.date.toISOString().split("T")[0]}`,
        )
        .returning({ id: dailyTracking.id });

    if (updatedDailyTrackings.length === 0) {
        await db.insert(dailyTracking).values({
            habitId: validatedData.data.habitId,
            date: validatedData.data.date.toISOString().split("T")[0]!,
            completed: validatedData.data.completed,
        });
    } else if (updatedDailyTrackings.length > 1) {
        console.error(
            "ERROR: Multiple daily trackings found for the same habit and date.",
        );
    }

    return {
        success: true,
    };
}
