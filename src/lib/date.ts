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

export function isToday(date: Date): boolean {
    const today = new Date();
    return (
        today.getFullYear() === date.getFullYear() &&
        today.getMonth() === date.getMonth() &&
        today.getDate() === date.getDate()
    );
}

export function getDayOfWeek(date: Date): string {
    const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
    return daysOfWeek[date.getDay()] ?? "";
}
