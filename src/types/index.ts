import type { LucideIcon } from "lucide-react";

export type MonthlyViewData = {
    habitId: number;
    habitName: string;
    goal?: number;
    achieved?: number;
    [key: `day-${number}`]: number | undefined;
};

export type WeeklyViewData = {
    habitName: string;
    monday: number | undefined;
    tuesday: number | undefined;
    wednesday: number | undefined;
    thursday: number | undefined;
    friday: number | undefined;
    saturday: number | undefined;
    sunday: number | undefined;
};

export type Route = {
    label: string;
    href: string;
    icon: LucideIcon;
    isPremium?: boolean;
    hideOnFree?: boolean;
};

export type Role = "user" | "admin";

export type Product = {
    name: string;
    price: {
        was?: number;
        now: number;
    };
    features: {
        name: string;
        isAvailable?: boolean;
        isComing?: boolean;
    }[];
    planId: string;
    variantId: string;
    caption?: string;
};
