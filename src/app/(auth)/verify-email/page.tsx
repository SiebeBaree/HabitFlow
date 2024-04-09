"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "./actions";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export default function VerifyEmailPage() {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const searchParams = useSearchParams();

    const verifyEmail = useCallback(
        (token: string | null) => {
            if (success) return;
            if (error) return;

            if (!token) {
                setError("Missing token!");
                return;
            }

            newVerification(token)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.message);
                })
                .catch(() => {
                    setError("Failed to verify email!");
                });
        },
        [success, error],
    );

    useEffect(() => {
        const token = searchParams.get("token");
        verifyEmail(token);
    }, [verifyEmail, searchParams]);

    return (
        <>
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Verify email</h1>
                <p className="text-balance text-foreground/60">
                    Confirming your email address.
                </p>
            </div>

            {!error && !success && (
                <div className="mx-auto">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="4" cy="12" r="3">
                            <animate
                                id="spinner_jObz"
                                begin="0;spinner_vwSQ.end-0.25s"
                                attributeName="r"
                                dur="0.75s"
                                values="3;.2;3"
                            />
                        </circle>
                        <circle cx="12" cy="12" r="3">
                            <animate
                                begin="spinner_jObz.end-0.6s"
                                attributeName="r"
                                dur="0.75s"
                                values="3;.2;3"
                            />
                        </circle>
                        <circle cx="20" cy="12" r="3">
                            <animate
                                id="spinner_vwSQ"
                                begin="spinner_jObz.end-0.45s"
                                attributeName="r"
                                dur="0.75s"
                                values="3;.2;3"
                            />
                        </circle>
                    </svg>
                </div>
            )}

            <FormError message={error} />
            {!error && <FormSuccess message={success} />}

            {(error ?? success) && (
                <div className="mx-auto">
                    <Link href="/login" className="">
                        <Button>Back to login</Button>
                    </Link>
                </div>
            )}
        </>
    );
}
