"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

type LoginSocialProps = {
    isPending?: boolean;
    callbackUrl?: string;
};

export default function LoginSocial({
    isPending,
    callbackUrl,
}: LoginSocialProps) {
    async function handleClick(provider: "google" | "discord") {
        await signIn(provider, {
            callbackUrl: callbackUrl ?? "/app",
        });
    }

    return (
        <div className="flex items-center justify-between gap-3">
            <Button
                variant="outline"
                className="w-full"
                disabled={isPending}
                onClick={() => handleClick("google")}
            >
                <Image
                    src="/google.svg"
                    alt="Google logo"
                    width={24}
                    height={24}
                />
            </Button>
            <Button
                variant="outline"
                className="w-full"
                disabled={isPending}
                onClick={() => handleClick("discord")}
            >
                <Image
                    src="/discord.svg"
                    alt="Discord logo"
                    width={24}
                    height={24}
                />
            </Button>
        </div>
    );
}
