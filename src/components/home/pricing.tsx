import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import PageTitle from "@/components/home/page-title";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";
import productJson from "@/lib/data/products.json";
import SectionWrapper from "@/components/home/section-wrapper";
import Link from "next/link";
import { auth } from "@/server/auth";
import { getPremiumByUserId } from "@/server/data/user";
import CheckoutButton from "./checkout-button";

type Tier = {
    name: string;
    price: {
        was: number;
        now: number;
    };
    features: string[];
    planId: string;
    variantId: string;
};

const tiers: Tier[] = productJson;

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
            <div className="flex flex-wrap justify-center gap-6 md:flex-nowrap md:gap-4 lg:gap-8">
                {tiers.map((tier) => (
                    <PricingCard
                        key={tier.planId}
                        tier={tier}
                        isLoggedIn={isLoggedIn}
                        alreadySubscribed={alreadySubscribed}
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
}: {
    tier: Tier;
    isLoggedIn: boolean;
    alreadySubscribed: boolean;
}) {
    return (
        <Card className="flex w-[400px] flex-col px-4 pt-4">
            <p className="absolute text-2xl font-semibold">{tier.name}</p>
            <CardHeader>
                <div className="mb-4 mt-10 flex items-baseline justify-center">
                    <p className="mr-2 text-2xl font-medium text-black/60 line-through">
                        ${tier.price.was}
                    </p>
                    <p className="text-5xl font-bold">
                        ${tier.price.now}
                        <span className="text-sm font-medium text-black/40">
                            {" "}
                            USD
                        </span>
                    </p>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 p-0">
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
                        <p className="text-green-700">
                            You are already subscribed!
                        </p>
                    ) : (
                        <CheckoutButton
                            variantId={parseInt(tier.variantId, 10)}
                        />
                    )
                ) : (
                    <Link href={`/login`}>
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
