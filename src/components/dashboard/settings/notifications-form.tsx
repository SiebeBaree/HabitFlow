"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { type z } from "zod";
import { settingsNotificationsSchema } from "@/schemas";
import { useTransition } from "react";
import { Switch } from "@/components/ui/switch";
import { updateNotifications } from "@/actions/settings";
import { toast } from "sonner";
import type { InferSelectModel } from "drizzle-orm";
import type { userSettings } from "@/server/db/schema";

export default function SettingsNotificationsForm({
    notifications,
}: {
    notifications: InferSelectModel<typeof userSettings>;
}) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof settingsNotificationsSchema>>({
        resolver: zodResolver(settingsNotificationsSchema),
        defaultValues: {
            habitReminders: notifications.habitReminders ?? true,
            updateEmails: notifications.updateEmails ?? true,
            marketingEmails: notifications.marketingEmails ?? true,
        },
    });

    async function onSubmit(
        values: z.infer<typeof settingsNotificationsSchema>,
    ) {
        startTransition(async () => {
            const data = await updateNotifications(values);
            if (data) {
                if (data.success) {
                    toast.success("Notifications updated successfully.");
                } else {
                    toast.error(
                        data.error ?? "Failed to update notifications.",
                    );
                }
            }
        });
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Email Notifications</h1>
                <p className="text-balance text-muted-foreground">
                    Manage your email notifications.
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid max-w-[500px] gap-4"
                >
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
                            name="habitReminders"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Habit Reminders
                                        </FormLabel>
                                        <FormDescription>
                                            Receive a reminder when you
                                            didn&apos;t update your habits for 7
                                            days.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="updateEmails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Update Emails
                                        </FormLabel>
                                        <FormDescription>
                                            Receive emails about new updates and
                                            features of HabitFlow.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="marketingEmails"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Marketing emails
                                        </FormLabel>
                                        <FormDescription>
                                            Receive emails about new products,
                                            features, and more.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <p className="-mt-2 text-sm text-muted-foreground">
                        We don&apos;t spam. You can unsubscribe at any time.
                    </p>

                    <Button
                        type="submit"
                        className="mr-auto"
                        disabled={isPending}
                    >
                        Update account
                    </Button>
                </form>
            </Form>
        </div>
    );
}
