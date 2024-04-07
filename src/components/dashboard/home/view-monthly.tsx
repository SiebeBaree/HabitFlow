/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { cn } from "@/lib/utils";
import { useMonthlyViewQuery } from "@/queries/monthly-view";
import type { MonthlyViewData } from "@/types";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState, useTransition } from "react";
import { CheckIcon } from "lucide-react";
import { updateHabit } from "@/actions/update-habit";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import MonthSelector from "./month-selector";
import type { Premium } from "@/server/db/schema";
import HabitOptions from "@/components/dashboard/home/habit-options";
import { getDayOfWeek, getDaysInMonth, isToday } from "@/lib/date";
import { useHabitStore } from "@/stores/habits";

const columnHelper = createColumnHelper<MonthlyViewData>();

export default function ViewMonthly({
    userId,
    premium,
}: {
    userId: string;
    premium: Premium;
}) {
    const [date, setDate] = useState<Date>(new Date());
    const { data: queryData, isLoading } = useMonthlyViewQuery(userId, date);
    const [data, setData] = useState<MonthlyViewData[]>([]);
    const habitStore = useHabitStore();

    const columns = [
        columnHelper.accessor("habitName", {
            id: "habits",
            header: () => <div className="w-36 max-w-80 px-2">Habit</div>,
            cell: (props) => (
                <HabitOptions
                    name={props.getValue()}
                    habitId={props.row.original.habitId}
                    goal={props.row.original.goal}
                />
            ),
        }),
        columnHelper.accessor("goal", {
            id: "goal",
            header: () => <div className="px-2 text-center">Goal</div>,
            cell: (props) => (
                <div className="px-3 text-center">
                    {props.row.original.achieved ?? 0}
                    {props.getValue() ? `/${props.getValue()}` : ""}
                </div>
            ),
        }),
        ...Array.from({ length: getDaysInMonth(date) }).map((_, i) =>
            columnHelper.accessor(`day-${i + 1}`, {
                id: `day-${i + 1}`,
                header: () => (
                    <div
                        className={cn(
                            "flex h-full max-w-8 flex-col justify-between text-center",
                            isToday(new Date(new Date(date).setDate(i + 1))) &&
                                "bg-primary text-primary-foreground",
                        )}
                    >
                        <p className="mb-1 text-xs">
                            {getDayOfWeek(
                                new Date(new Date(date).setDate(i + 1)),
                            )}
                        </p>
                        <p>{i + 1}</p>
                    </div>
                ),
                cell: (props) => (
                    <div className="h-8 w-8">
                        <CheckHabit
                            habitId={props.row.original.habitId}
                            date={
                                new Date(
                                    Date.UTC(
                                        date.getFullYear(),
                                        date.getMonth(),
                                        i + 1,
                                    ),
                                )
                            }
                            initialState={props.getValue()}
                            onHabitUpdate={onHabitUpdate}
                        />
                    </div>
                ),
            }),
        ),
    ];

    const table = useReactTable({
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    async function onHabitUpdate(
        habitId: number,
        date: Date,
        checked: boolean,
    ): Promise<boolean> {
        const updateData = await updateHabit(habitId, date, checked ? 100 : 0);
        if (updateData.success && data) {
            const newData = data.map((item) => {
                if (item.habitId === habitId) {
                    return {
                        ...item,
                        achieved: checked
                            ? (item.achieved ?? 0) + 1
                            : (item.achieved ?? 0) - 1,
                        [`day-${date.getDate()}`]: checked ? 100 : 0,
                    };
                }
                return item;
            });

            setData(newData);
        } else {
            toast.error(updateData.error ?? "Failed to update habit.");
        }

        return updateData.success;
    }

    useEffect(() => {
        if (queryData) {
            if (data.length === 0) {
                habitStore.addBulkHabits(
                    queryData.map((item) => ({
                        id: item.habitId,
                        name: item.habitName,
                    })),
                );
            }

            setData(queryData);
        }
    }, [queryData]);

    useEffect(() => {
        // Create a map of habitIds for quick lookup to check existence
        const habitIdMap = new Map(
            habitStore.habits.map((habit) => [habit.id, habit]),
        );

        // Filter out items that no longer exist in the habitStore
        const filteredData = data.filter((item) =>
            habitIdMap.has(item.habitId),
        );

        // Check if any items were updated
        let isUpdated = false;
        const updatedData = filteredData.map((item) => {
            const habit = habitIdMap.get(item.habitId);
            if (!habit || habit.name === item.habitName) {
                return item;
            }

            isUpdated = true;
            return {
                ...item,
                habitName: habit.name,
            };
        });

        // Find new habits to add to the data
        const newDataToAdd = habitStore.habits
            .filter((habit) => !data.some((item) => item.habitId === habit.id))
            .map((habit) => ({
                habitId: habit.id,
                habitName: habit.name,
                achieved: 0,
            }));

        // Only update state if there are items to remove or add to prevent unnecessary renders
        if (
            updatedData.length !== data.length ||
            newDataToAdd.length > 0 ||
            isUpdated
        ) {
            setData([...updatedData, ...newDataToAdd]);
        }
    }, [habitStore.habits]);

    return (
        <>
            <div className="mb-4">
                <MonthSelector
                    date={date}
                    setDate={setDate}
                    premium={premium}
                />
            </div>
            {isLoading ? (
                <Skeleton className="flex h-56 w-full" />
            ) : (
                <Table className="border-collapse border">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className={cn(
                                            table.getRowModel().rows?.length
                                                ? "w-full px-0"
                                                : "px-2",
                                        )}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="border p-0"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No habits found. Create one to get started!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </>
    );
}

function CheckHabit({
    habitId,
    date,
    initialState,
    onHabitUpdate,
}: {
    habitId: number;
    date: Date;
    initialState?: number;
    onHabitUpdate: (
        habitId: number,
        date: Date,
        checked: boolean,
    ) => Promise<boolean>;
}) {
    const [checked, setChecked] = useState((initialState ?? 0) === 100);
    const [isPending, startTransition] = useTransition();

    async function onClick() {
        const isChecked = !checked;
        setChecked((prev) => !prev);

        startTransition(async () => {
            const success = await onHabitUpdate(habitId, date, isChecked);
            if (!success) {
                setChecked((prev) => !prev);
            }
        });
    }

    return (
        <button
            className="mouse-pointer flex h-full w-full flex-col items-center justify-center"
            onClick={onClick}
            disabled={isPending}
        >
            <CheckIcon
                className={cn("h-full w-full p-1", !checked && "invisible")}
            />
        </button>
    );
}
