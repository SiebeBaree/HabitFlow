import type { Product, Route } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import products from "@/lib/data/products.json";
import {
    LayoutDashboardIcon,
    HomeIcon,
    LineChartIcon,
    SettingsIcon,
    CreditCardIcon,
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

export function daysBetween(date: Date): number {
    const now = new Date();
    const difference = now.getTime() - date.getTime();
    return Math.floor(difference / (1000 * 60 * 60 * 24));
}

export function getDashboardRoutes(): Route[] {
    return [
        {
            label: "Habit Tracker",
            icon: LayoutDashboardIcon,
            href: "/app",
        },
        {
            label: "Analytics",
            icon: LineChartIcon,
            href: "/app/analytics",
            isPremium: true,
        },
        {
            label: "Billing",
            icon: CreditCardIcon,
            href: "/app/billing",
            hideOnFree: true,
        },
        {
            label: "Settings",
            icon: SettingsIcon,
            href: "/app/settings",
        },
        {
            label: "Home",
            icon: HomeIcon,
            href: "/",
        },
    ];
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

export function webhookHasMeta(obj: unknown): obj is {
    meta: {
        event_name: string;
        custom_data: {
            user_id: string;
        };
    };
} {
    if (
        isObject(obj) &&
        isObject(obj.meta) &&
        typeof obj.meta.event_name === "string" &&
        isObject(obj.meta.custom_data) &&
        typeof obj.meta.custom_data.user_id === "string"
    ) {
        return true;
    }
    return false;
}

export function webhookHasData(obj: unknown): obj is {
    data: {
        attributes: Record<string, unknown> & {
            first_order_item: {
                id: number;
                price_id: number;
                order_id: number;
                variant_id: number;
                price: number;
            };
        };
        id: string;
    };
} {
    return (
        isObject(obj) &&
        "data" in obj &&
        isObject(obj.data) &&
        "attributes" in obj.data
    );
}

export function getProduct(variantId: number | string): Product | undefined {
    const variantIdStr = variantId.toString();
    return products.find((product) => product.variantId === variantIdStr);
}
