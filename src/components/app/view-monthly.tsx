/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { cn, getDaysInMonth } from "@/lib/utils";
import { useMonthlyViewQuery } from "@/queries/monthly-view";
import type { MonthlyViewData } from "@/types";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState, useTransition } from "react";
import { CheckIcon, Trash2Icon } from "lucide-react";
import { updateHabit } from "@/actions/update-habit";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useHabitStore } from "@/stores/habits";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteHabit } from "@/actions/delete-habit";
import MonthSelector from "./month-selector";

const columnHelper = createColumnHelper<MonthlyViewData>();

export default function ViewMonthly({ userId }: { userId: string }) {
    const [date, setDate] = useState<Date>(new Date());
    const {
        data: queryData,
        isLoading,
        refetch,
    } = useMonthlyViewQuery(userId, date);
    const [data, setData] = useState<MonthlyViewData[]>(queryData ?? []);
    const [initialHabits, setInitialHabits] = useState<number>(-1);
    const habitStore = useHabitStore();

    function getDayOfWeek(day: number): string {
        const newDate = new Date(
            Date.UTC(date.getFullYear(), date.getMonth(), day),
        );
        const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
        return daysOfWeek[newDate.getDay()] ?? "";
    }

    function isToday(day: number): boolean {
        const today = new Date();
        return (
            today.getFullYear() === date.getFullYear() &&
            today.getMonth() === date.getMonth() &&
            today.getDate() === day
        );
    }

    const columns = [
        columnHelper.accessor("habitName", {
            id: "habits",
            header: () => <div className="w-36 max-w-80 px-2">Habit</div>,
            cell: (props) => (
                <div className="group relative max-w-80 break-words p-2 text-left">
                    {props.getValue()}
                    <AlertDialog>
                        <AlertDialogTrigger className="invisible absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-background p-1 text-red-500 transition-colors duration-300 hover:bg-red-500 hover:text-white group-hover:visible">
                            <Trash2Icon size={16} />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={async () => {
                                        const data = await deleteHabit(
                                            props.row.original.habitId,
                                        );
                                        if (data.success) {
                                            habitStore.removeHabit(
                                                props.getValue(),
                                            );
                                        } else {
                                            toast.error(
                                                data.error ??
                                                    "Failed to delete habit.",
                                            );
                                        }
                                    }}
                                >
                                    Delete Habit
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
                            isToday(i) && "bg-primary text-primary-foreground",
                        )}
                    >
                        <p className="mb-1 text-xs font-light">
                            {getDayOfWeek(i)}
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
                        />
                    </div>
                ),
            }),
        ),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    useEffect(() => {
        if (queryData) {
            setData(queryData);

            if (initialHabits === -1) {
                habitStore.addBulkHabits(
                    queryData.map((data) => data.habitName),
                );
                setInitialHabits(queryData.length);
            }
        }
    }, [queryData]);

    useEffect(() => {
        if (initialHabits !== -1) {
            void refetch();
        }
    }, [habitStore.habits]);

    return (
        <>
            {isLoading && initialHabits === -1 ? (
                <Skeleton className="flex h-96 w-full" />
            ) : (
                <>
                    <div className="mb-4">
                        <MonthSelector date={date} setDate={setDate} />
                    </div>
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
                                        No habits found. Create one to get
                                        started!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </>
            )}
        </>
    );
}

function CheckHabit({
    habitId,
    date,
    initialState,
}: {
    habitId: number;
    date: Date;
    initialState?: number;
}) {
    const [checked, setChecked] = useState((initialState ?? 0) > 0);
    const [isPending, startTransition] = useTransition();

    async function onClick() {
        setChecked((prev) => !prev);

        startTransition(async () => {
            const data = await updateHabit(habitId, date, !checked ? 100 : 0);
            if (!data.success) {
                setChecked((prev) => !prev);
                toast.error(data.error ?? "Failed to update habit.");
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
