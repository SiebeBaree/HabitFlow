"use client";

import { createHabitSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { createHabit } from "@/actions/create-habit";
import { toast } from "sonner";
import { useHabitStore } from "@/stores/habits";

export default function CreateHabitForm() {
    const [isPending, startTransition] = useTransition();
    const habitStore = useHabitStore();

    const form = useForm<z.infer<typeof createHabitSchema>>({
        resolver: zodResolver(createHabitSchema),
        defaultValues: {
            name: "",
        },
    });

    function onSubmit(values: z.infer<typeof createHabitSchema>) {
        startTransition(async () => {
            const data = await createHabit(values);
            if (data) {
                if (data.success) {
                    toast.success("Habit created");
                    habitStore.addHabit(values.name);
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
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-stretch gap-3"
            >
                <FormField
                    control={form.control}
                    name="name"
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
    );
}
