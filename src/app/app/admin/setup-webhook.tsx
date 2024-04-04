"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { setupWebhook } from "@/actions/lemonsqueezy";
import { Button } from "@/components/ui/button";

export async function SetupWebhookButton({
    disabled = false,
}: {
    disabled?: boolean;
}) {
    const [isActivated, setIsActivated] = useState(false);
    const [isPending, startTransition] = useTransition();

    return (
        <Button
            disabled={disabled || isPending || isActivated}
            onClick={async () => {
                startTransition(async () => {
                    try {
                        await setupWebhook();
                        toast.success("Webhook set up successfully.");
                        setIsActivated(true);
                    } catch (error) {
                        console.error(error);
                        toast.error(
                            "Error setting up a webhook. Please check the server console for more information.",
                        );
                    }
                });
            }}
        >
            Setup Webhook
        </Button>
    );
}
