import type { Route } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
    LayoutDashboardIcon,
    ArchiveIcon,
    HomeIcon,
    LineChartIcon,
    SettingsIcon,
} from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function takeUniqueOrThrow<T extends any[]>(values: T): T[number] {
    if (values.length !== 1)
        throw new Error("Found non unique or inexistent value");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return values[0]!;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

export function getFirstDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getLastDayOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getDashboardRoutes(): Route[] {
    return [
        {
            label: "Habit Tracker",
            icon: LayoutDashboardIcon,
            href: "/app",
        },
        {
            label: "Habits",
            icon: ArchiveIcon,
            href: "/app/habits",
        },
        {
            label: "Statistics",
            icon: LineChartIcon,
            href: "/app/statistics",
        },
        {
            label: "Settings",
            icon: SettingsIcon,
            href: "/app/setttings",
        },
        {
            label: "Home",
            icon: HomeIcon,
            href: "/",
        },
    ];
}
