"use client";

import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

type MonthSelectorProps = {
    date: Date;
    setDate: (date: Date) => void;
};

export default function MonthSelector({ date, setDate }: MonthSelectorProps) {
    const [disablePrevious, setDisablePrevious] = useState<boolean>(false);
    const [disableNext, setDisableNext] = useState<boolean>(
        isCurrentMonth(date),
    );

    function convertToMonthYear(date: Date) {
        return `${date.toLocaleString("en", { month: "long" })}, ${date.getFullYear()}`;
    }

    function goToPreviousMonth() {
        if (disablePrevious) return;

        const previousMonth = new Date(date.getFullYear(), date.getMonth() - 1);
        if (isBefore(previousMonth, 2023)) {
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
                className={cn(disablePrevious && "opacity-50")}
            >
                <ChevronLeftIcon />
            </button>

            <p className="select-none">{convertToMonthYear(date)}</p>
            <button
                disabled={disableNext}
                onClick={goToNextMonth}
                className={cn(disableNext && "opacity-50")}
            >
                <ChevronRightIcon />
            </button>
        </div>
    );
}
