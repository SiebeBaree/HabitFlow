"use client";

import { deleteHabit } from "@/actions/delete-habit";
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
import { useHabitStore } from "@/stores/habits";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { updateHabitSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editHabit } from "@/actions/edit-habit";

type EditHabitProps = {
    name: string;
    habitId: number;
    goal?: number | null;
};

export default function HabitOptions({ name, habitId, goal }: EditHabitProps) {
    const removeHabit = useHabitStore((state) => state.removeHabit);
    const updateHabit = useHabitStore((state) => state.updateHabit);

    const form = useForm<z.infer<typeof updateHabitSchema>>({
        resolver: zodResolver(updateHabitSchema),
        defaultValues: {
            habitName: name,
            goal: goal ?? undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof updateHabitSchema>) {
        const data = await editHabit(habitId, values);
        if (data.success) {
            updateHabit(habitId, values.habitName);
        } else {
            toast.error(data.error ?? "Failed to update habit.");
        }
    }

    return (
        <div className="group relative max-w-80 break-words p-2 text-left">
            {name}
            <div className="invisible absolute right-2 top-1/2 flex -translate-y-1/2 gap-1 group-hover:visible">
                <AlertDialog>
                    <AlertDialogTrigger className="rounded-md bg-background p-1 text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground">
                        <Edit2Icon size={16} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Edit Habit
                                    </AlertDialogTitle>
                                </AlertDialogHeader>

                                <div className="flex items-center justify-between gap-2">
                                    <FormField
                                        control={form.control}
                                        name="habitName"
                                        render={({ field }) => (
                                            <FormItem className="flex-grow">
                                                <FormLabel>
                                                    Habit Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="goal"
                                        render={({ field }) => (
                                            <FormItem className="w-32">
                                                <FormLabel>Goal</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="0"
                                                        {...field}
                                                        onChange={(event) =>
                                                            field.onChange(
                                                                +event.target
                                                                    .value,
                                                            )
                                                        }
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction type="submit">
                                        Save Changes
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </form>
                        </Form>
                    </AlertDialogContent>
                </AlertDialog>
                <AlertDialog>
                    <AlertDialogTrigger className="rounded-md bg-background p-1 text-red-500 transition-colors duration-300 hover:bg-red-500 hover:text-white">
                        <Trash2Icon size={16} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={async () => {
                                    const data = await deleteHabit(habitId);
                                    if (data.success) {
                                        removeHabit({
                                            id: habitId,
                                            name: name,
                                        });
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
        </div>
    );
}
