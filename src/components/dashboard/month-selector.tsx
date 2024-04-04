"use client";

import { cn, daysBetween, getLastDayOfMonth } from "@/lib/utils";
import type { Premium } from "@/server/db/schema";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

type MonthSelectorProps = {
    date: Date;
    setDate: (date: Date) => void;
    premium: Premium;
};

export default function MonthSelector({
    date,
    setDate,
    premium,
}: MonthSelectorProps) {
    const [disablePrevious, setDisablePrevious] = useState<boolean>(
        premium.role === "free",
    );
    const [disableNext, setDisableNext] = useState<boolean>(
        isCurrentMonth(date),
    );

    function convertToMonthYear(date: Date) {
        return `${date.toLocaleString("en", { month: "long" })}, ${date.getFullYear()}`;
    }

    function goToPreviousMonth() {
        if (disablePrevious) return;

        const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1);
        const lastDayOfPreviousMonth = getLastDayOfMonth(previousMonth);

        if (premium.role === "free" && lastDayOfPreviousMonth < new Date()) {
            setDisablePrevious(true);
            return;
        } else if (
            premium.role === "starter" &&
            daysBetween(lastDayOfPreviousMonth) > 90
        ) {
            setDisablePrevious(true);
            return;
        } else if (isBefore(previousMonth, 2023)) {
            setDisablePrevious(true);
            return;
        }

        setDisableNext(isCurrentMonth(previousMonth));
        setDate(previousMonth);
    }

    function goToNextMonth() {
        if (disableNext) return;

        const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1);
        setDisableNext(isCurrentMonth(nextMonth));
        setDisablePrevious(false);

        setDate(nextMonth);
    }

    function isBefore(date: Date, year: number) {
        return date.getFullYear() < year;
    }

    function isCurrentMonth(date: Date) {
        const currentDate = new Date();
        return (
            date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear()
        );
    }

    return (
        <div className="flex items-center justify-center gap-4">
            <button
                disabled={disablePrevious}
                onClick={goToPreviousMonth}
                className={cn("text-primary", disablePrevious && "opacity-50")}
            >
                <ChevronLeftIcon />
            </button>

            <p className="select-none">{convertToMonthYear(date)}</p>
            <button
                disabled={disableNext}
                onClick={goToNextMonth}
                className={cn("text-primary", disableNext && "opacity-50")}
            >
                <ChevronRightIcon />
            </button>
        </div>
    );
}
