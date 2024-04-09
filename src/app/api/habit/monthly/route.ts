import { daysBetween, getFirstDayOfMonth, getLastDayOfMonth } from "@/lib/date";
import { auth } from "@/server/auth";
import { getPremiumByUserId } from "@/server/data/user";
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
    const premium = await getPremiumByUserId(session.user.id);

    if (fromDate.getTime() > new Date().getTime()) {
        return NextResponse.json({ error: "Invalid date" }, { status: 403 });
    } else if (premium.role === "free" && toDate < new Date()) {
        return NextResponse.json(
            { error: "You can only view data from this month!" },
            { status: 400 },
        );
    } else if (premium.role === "starter" && daysBetween(toDate) > 90) {
        return NextResponse.json(
            { error: "You can only view data from the last 90 days!" },
            { status: 403 },
        );
    }

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
            goal: habit.goal ?? undefined,
            achieved: habitDailyTracking.filter(
                (join) => join.daily_tracking.completed === 100,
            ).length,
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
