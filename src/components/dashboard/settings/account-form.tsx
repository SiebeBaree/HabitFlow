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
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type z } from "zod";
import { settingsAccountSchema } from "@/schemas";
import { useTransition } from "react";
import { updateAccount } from "@/actions/settings";
import { toast } from "sonner";

export default function SettingsAccountForm({
    name,
    isAuthProvider,
}: {
    name: string;
    isAuthProvider: boolean;
}) {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof settingsAccountSchema>>({
        resolver: zodResolver(settingsAccountSchema),
        defaultValues: {
            name,
        },
    });

    async function onSubmit(values: z.infer<typeof settingsAccountSchema>) {
        startTransition(async () => {
            const data = await updateAccount(values);
            if (data) {
                if (data.success) {
                    toast.success(
                        "Account updated successfully. Please log out and log back in to see changes.",
                    );
                } else {
                    toast.error(data.error ?? "Failed to update account.");
                }
            }
        });
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Account</h1>
                <p className="text-balance text-foreground/60">
                    Update your account settings.
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {!isAuthProvider && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="oldPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Current Password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            <FormDescription>
                                                Only fill out if you want to
                                                change your password.
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="newPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>New Password</FormLabel>

                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                            <FormDescription>
                                                Only fill out if you want to
                                                change your password.
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </div>
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
