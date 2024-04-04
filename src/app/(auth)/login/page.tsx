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
import { loginSchema } from "./schema";
import { FormError } from "@/components/form-error";
import { login } from "./actions";
import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import LoginSocial from "@/components/auth/login-social";
import { useSearchParams } from "next/navigation";
import { FormSuccess } from "@/components/form-success";

const knownErrors = {
    OAuthAccountNotLinked: "Email already in use with different provider.",
};
const knownErrorsKeys = Object.keys(knownErrors);

export default function LoginPage() {
    const searchParams = useSearchParams();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const callbackUrl = searchParams.get("callbackUrl");
    const urlError = searchParams.get("error");

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setError("");
        setSuccess("");

        startTransition(async () => {
            const data = await login(values, callbackUrl);
            if (data) {
                setError(data.error);
                setSuccess(data.message);

                if (data.success) {
                    form.reset();
                }
            }
        });
    }

    useEffect(() => {
        if (urlError && knownErrorsKeys.includes(urlError)) {
            setError(knownErrors[urlError as keyof typeof knownErrors]);
        }
    }, [urlError]);

    return (
        <>
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4"
                >
                    <div className="grid gap-2">
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">
                                        <FormLabel>Password</FormLabel>
                                        <Link
                                            href="/forgot-password"
                                            className="ml-auto inline-block text-sm underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
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
                    </div>
                    <FormError message={error} />
                    {!error && <FormSuccess message={success} />}
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        Login
                    </Button>
                </form>
            </Form>

            <LoginSocial isPending={isPending} />

            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline">
                    Sign up
                </Link>
            </div>
        </>
    );
}
