import type { MonthlyViewData } from "@/types";
import { useQuery } from "@tanstack/react-query";

async function fetchMonthlyView(date: Date) {
    const response = await fetch(
        "/api/habit/monthly?date=" + date.toISOString(),
    );

    if (!response.ok) {
        throw new Error("Failed to fetch monthly view");
    }

    return response.json() as Promise<MonthlyViewData[]>;
}

export function useMonthlyViewQuery(userId: string, date: Date) {
    return useQuery({
        queryKey: ["monthly-view", userId, date],
        queryFn: async () => {
            return fetchMonthlyView(date);
        },
    });
}
