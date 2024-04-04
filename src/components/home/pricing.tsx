import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import PageTitle from "@/components/home/page-title";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, XIcon } from "lucide-react";
import productJson from "@/lib/data/products.json";
import SectionWrapper from "@/components/home/section-wrapper";
import Link from "next/link";
import { auth } from "@/server/auth";
import { getPremiumByUserId } from "@/server/data/user";
import CheckoutButton from "./checkout-button";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

const tiers: Product[] = productJson;

export default async function Pricing() {
    const session = await auth();
    const isLoggedIn = !!session;

    let alreadySubscribed = false;
    if (session) {
        const premium = await getPremiumByUserId(session.user.id);
        alreadySubscribed = premium.role !== "free";
    }

    return (
        <SectionWrapper>
            <PageTitle title="Commit to your habits" id="pricing">
                <Badge className="mt-3 text-sm">
                    ✨ Launch Discount - 35% OFF ✨
                </Badge>
            </PageTitle>
            <div className="flex flex-wrap justify-center gap-6 md:gap-4 lg:flex-nowrap xl:gap-8">
                <Card className="flex w-[400px] flex-col px-4 pt-4">
                    <p className="absolute text-2xl font-semibold">Trial</p>
                    <CardHeader className="mb-4 mt-10 flex flex-row items-baseline justify-center gap-2">
                        <div className="w-12" />
                        <p className="text-5xl font-bold">$0</p>
                        <p className="w-12 text-sm font-medium text-black/40">
                            USD
                        </p>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <CheckIcon size={20} className="text-primary" />
                                Create up to 3 habits
                            </li>
                            <li className="flex items-center gap-3">
                                <XIcon size={20} className="text-destructive" />
                                No monthly goals
                            </li>
                            <li className="flex items-center gap-3">
                                <XIcon size={20} className="text-destructive" />
                                Only see habits for the current month
                            </li>
                            <li className="flex items-center gap-3">
                                <XIcon size={20} className="text-destructive" />
                                No analytics
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter className="mt-12 flex flex-grow flex-col justify-end p-0 pb-2">
                        {isLoggedIn && alreadySubscribed ? (
                            <p className="text-center text-green-700">
                                You are already subscribed!
                            </p>
                        ) : (
                            <Link href="/login">
                                <Button className="w-[200px]">
                                    Start now!
                                </Button>
                            </Link>
                        )}
                        <p className="mt-2 text-sm text-black/70">
                            No credit card required.
                        </p>
                    </CardFooter>
                </Card>
                {tiers.map((tier) => (
                    <PricingCard
                        key={tier.planId}
                        tier={tier}
                        isLoggedIn={isLoggedIn}
                        alreadySubscribed={alreadySubscribed}
                        isPremium={tier.name === "Dedicated"}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
}

function PricingCard({
    tier,
    isLoggedIn,
    alreadySubscribed,
    isPremium,
}: {
    tier: Product;
    isLoggedIn: boolean;
    alreadySubscribed: boolean;
    isPremium?: boolean;
}) {
    return (
        <Card
            className={cn(
                "relative flex w-[400px] flex-col px-4 pt-4",
                isPremium && "border-[3px] border-primary",
            )}
        >
            {isPremium && (
                <Badge className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 px-5 text-center text-sm">
                    Most Popular
                </Badge>
            )}
            <p className="absolute text-2xl font-semibold">{tier.name}</p>
            <CardHeader className="mb-4 mt-10 flex flex-row items-baseline justify-center gap-2">
                <p className="w-12 text-right text-2xl font-medium text-black/60 line-through">
                    ${tier.price.was}
                </p>
                <p className="text-5xl font-bold">${tier.price.now}</p>
                <p className="w-12 text-sm font-medium text-black/40">USD</p>
            </CardHeader>
            <CardContent className="p-0">
                <ul className="space-y-4">
                    {tier.features.map((feature, index) => (
                        <li
                            key={`${tier.planId}.${index}`}
                            className="flex items-center gap-3"
                        >
                            <CheckIcon size={20} className="text-primary" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="mt-12 flex flex-grow flex-col justify-end p-0 pb-2">
                {isLoggedIn ? (
                    alreadySubscribed ? (
                        <p className="text-center text-green-700">
                            You are already subscribed!
                        </p>
                    ) : (
                        <CheckoutButton
                            variantId={parseInt(tier.variantId, 10)}
                        />
                    )
                ) : (
                    <Link
                        href={`/login?callbackUrl=${encodeURIComponent("/#pricing")}`}
                    >
                        <Button className="w-[200px]">Start now!</Button>
                    </Link>
                )}
                <p className="mt-2 text-sm text-black/70">
                    Pay once. Use forever.
                </p>
            </CardFooter>
        </Card>
    );
}
