"use client";

import { createHabitSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { useState, useTransition } from "react";
import { createHabit } from "@/actions/create-habit";
import { toast } from "sonner";
import { useHabitStore } from "@/stores/habits";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function CreateHabitForm() {
    const [open, setOpen] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>(
        "You cannot create more habits",
    );
    const [isPending, startTransition] = useTransition();
    const addHabit = useHabitStore((state) => state.addHabit);

    const form = useForm<z.infer<typeof createHabitSchema>>({
        resolver: zodResolver(createHabitSchema),
        defaultValues: {
            habitName: "",
        },
    });

    function onSubmit(values: z.infer<typeof createHabitSchema>) {
        startTransition(async () => {
            const data = await createHabit(values);
            if (data) {
                if (data.showModal) {
                    setOpen(true);
                    if ((data.modalTitle?.length ?? 0) > 5) {
                        setModalTitle(
                            data.modalTitle ?? "You cannot create more habits",
                        );
                    }
                }

                if (data.success && data.habitId && data.habitName) {
                    toast.success("Habit created");
                    addHabit({
                        name: data.habitName,
                        id: data.habitId,
                    });
                    form.reset();
                } else {
                    toast.error(
                        data.error ? data.error : "Failed to create habit",
                    );
                }
            }
        });
    }

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{modalTitle}</AlertDialogTitle>
                        <AlertDialogDescription>
                            Upgrade to a premium account to create more habits.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Link href="/#pricing">
                            <AlertDialogAction>Upgrade Now</AlertDialogAction>
                        </Link>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex items-stretch gap-3"
                >
                    <FormField
                        control={form.control}
                        name="habitName"
                        render={({ field }) => (
                            <FormItem className="w-56">
                                <FormControl>
                                    <Input
                                        placeholder="New Habit"
                                        {...field}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage className="text-nowrap break-keep" />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="px-6" disabled={isPending}>
                        Create
                    </Button>
                </form>
            </Form>
        </>
    );
}
