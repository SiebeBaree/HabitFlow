"use client";

import { getCheckoutURL } from "@/actions/lemonsqueezy";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type CheckoutButtonProps = {
    variantId: number;
};

export default function CheckoutButton({ variantId }: CheckoutButtonProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <Button
            className="w-[200px]"
            onClick={() => {
                startTransition(async () => {
                    const checkout = await getCheckoutURL(variantId);
                    if (checkout.success && checkout.checkoutUrl) {
                        router.push(checkout.checkoutUrl);
                    } else {
                        toast.error("Error redirecting to checkout page.");
                    }
                });
            }}
            disabled={isPending}
        >
            Start Now!
        </Button>
    );
}
