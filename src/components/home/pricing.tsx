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

type Tier = {
    name: string;
    price: {
        was: number;
        now: number;
    };
    features: string[];
    planId: string;
};

const tiers = [
    {
        name: "Starter",
        price: {
            was: 19,
            now: 12,
        },
        features: [
            "Create unlimited habits",
            "Set monthly goals",
            "View habits back up to 90 days",
            "Simple analytics",
        ],
        planId: "0",
    },
    {
        name: "Dedicated",
        price: {
            was: 29,
            now: 20,
        },
        features: [
            "Create unlimited habits",
            "Set monthly goals",
            "View lifetime data",
            "Advanced analytics",
            "Add time spent with habits",
        ],
        planId: "1",
    },
] as Tier[];

export default function Pricing() {
    return (
        <div className="container my-56">
            <PageTitle title="Commit to your habits" id="pricing">
                <Badge className="mt-3 text-sm">
                    ✨ Launch Discount - 35% OFF ✨
                </Badge>
            </PageTitle>
            <div className="flex flex-wrap justify-center gap-6 md:flex-nowrap md:gap-4 lg:gap-8">
                {tiers.map((tier) => (
                    <PricingCard key={tier.planId} {...tier} />
                ))}
            </div>
        </div>
    );
}

function PricingCard(tier: Tier) {
    return (
        <Card className="flex w-[400px] flex-col px-4 pt-4">
            <h4 className="absolute">{tier.name}</h4>
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
                <Button className="w-[200px]">Start now!</Button>
                <p className="mt-2 text-sm text-black/70">
                    Pay once. Use forever.
                </p>
            </CardFooter>
        </Card>
    );
}
