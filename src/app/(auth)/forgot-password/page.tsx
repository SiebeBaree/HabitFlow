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
import { forgotPasswordSchema } from "./schema";
import { FormError } from "@/components/form-error";
import { forgot } from "./actions";
import { useState, useTransition } from "react";
import Link from "next/link";
import { FormSuccess } from "@/components/form-success";

export default function ForgotPasswordPage() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        setError("");
        setSuccess("");

        startTransition(async () => {
            const data = await forgot(values);
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
                    Forgot your password? No worries, we got you.
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
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
                        Send reset email
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
