"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type z } from "zod";
import { resetPasswordSchema } from "./schema";
import { FormError } from "@/components/form-error";
import { reset } from "./actions";
import { useState, useTransition } from "react";
import Link from "next/link";
import { FormSuccess } from "@/components/form-success";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
        setError("");
        setSuccess("");

        startTransition(async () => {
            const data = await reset(values, token);
            if (data) {
                setError(data.error);
                setSuccess(data.message);

                if (data.success) {
                    form.reset();
                }
            }
        });
    }

    return (
        <>
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Reset password</h1>
                <p className="text-balance text-foreground/60">
                    Enter your new password below
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4"
                >
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="password"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormError message={error} />
                    {!error && <FormSuccess message={success} />}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Reset password
                    </Button>
                </form>
            </Form>

            <Link href="/login">
                <Button className="w-full" variant="outline">
                    Back to login
                </Button>
            </Link>
        </>
    );
}
