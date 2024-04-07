"use server";

import { updateHabitSchema } from "@/schemas";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { habits } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import type { z } from "zod";

export async function editHabit(
    habitId: number,
    values: z.infer<typeof updateHabitSchema>,
) {
    const validatedData = updateHabitSchema.safeParse(values);
    if (!validatedData.success) {
        return {
            success: false,
            error: "Invalid habit name or goal!",
        };
    }

    const session = await auth();
    if (!session) {
        return {
            success: false,
            error: "Not authenticated",
        };
    }

    await db
        .update(habits)
        .set({
            name: values.habitName,
            goal: values.goal ?? null,
        })
        .where(and(eq(habits.id, habitId), eq(habits.userId, session.user.id)));

    return {
        success: true,
    };
}
