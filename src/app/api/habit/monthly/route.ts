import { getFirstDayOfMonth, getLastDayOfMonth } from "@/lib/utils";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { dailyTracking, habits } from "@/server/db/schema";
import type { MonthlyViewData } from "@/types";
import { eq, sql } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const MonthlyHabitSchema = z.object({
    date: z.string().pipe(z.coerce.date()),
});

export async function GET(request: NextRequest) {
    const validatedData = MonthlyHabitSchema.safeParse({
        date: request.nextUrl.searchParams.get("date"),
    });

    if (!validatedData.success) {
        return NextResponse.json({ error: "Invalid date" }, { status: 400 });
    }

    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const date = validatedData.data.date;
    const fromDate = getFirstDayOfMonth(date);
    const toDate = getLastDayOfMonth(date);

    const habitData = await db
        .select()
        .from(habits)
        .where(eq(habits.userId, session.user.id));

    const dailyTrackingData = await db
        .select()
        .from(habits)
        .innerJoin(dailyTracking, eq(habits.id, dailyTracking.habitId))
        .where(
            sql`${habits.userId} = ${session.user.id} AND ${dailyTracking.date} BETWEEN ${fromDate} AND ${toDate}`,
        );

    const monthlyView: MonthlyViewData[] = habitData.map((habit) => {
        const habitDailyTracking = dailyTrackingData.filter(
            (join) => join.habit.id === habit.id,
        );

        const row: MonthlyViewData = {
            habitId: habit.id,
            habitName: habit.name,
        };

        habitDailyTracking.forEach((join) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            row[`day-${new Date(join.daily_tracking.date).getDate()}`] =
                join.daily_tracking.completed;
        });

        return row;
    });

    return NextResponse.json(monthlyView);
}
