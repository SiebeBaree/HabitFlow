import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
