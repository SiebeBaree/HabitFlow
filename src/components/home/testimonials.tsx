import { StarIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import PageTitle from "@/components/home/page-title";
import SectionWrapper from "@/components/home/section-wrapper";
import Image from "next/image";

type Testimonial = {
    text: string[];
    name: string;
    image: string;
    stars: number;
};

const testimonials = [
    {
        text: [
            "Habitflow helps me improve my discipline and creates habits I'm able to maintain. It is an amazing new start to my self-improvement journey!",
            "This app helps me create a daily routine I can follow and also gives me a lot of motivation when I am able to achieve my goals at the end of the month.",
        ],
        name: "Iris",
        image: "/testimonials/iris.jpg",
        stars: 5,
    },
    {
        text: [
            "Since I use HabitFlow I can finally stick to my habits! I skip a day or two sometimes but thanks to HabitFlow I don't quit my habits.",
            "I'm not procrastinating anymore and finally got my sh*t together and started sticking to my habits. This app is awesome and I will continue to use it.",
        ],
        name: "Olivier",
        image: "/testimonials/olivier.jpg",
        stars: 5,
    },
    {
        text: [
            "After every New Year, I made resolutions to change my habits, but this year is different. For the first time, I am still adhering to certain resolutions in April.",
            "I owe this success to the remarkable app HabitFlow that completely transformed my perspective on habits.",
        ],
        name: "Cedric",
        image: "/logo.png",
        stars: 5,
    },
] as Testimonial[];

export default function Testimonials() {
    return (
        <SectionWrapper>
            <PageTitle title="Improve your life, like these people did before you" />
            <div className="flex flex-wrap justify-center gap-6 md:flex-nowrap md:gap-4 lg:gap-8">
                {testimonials.map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} />
                ))}
            </div>
        </SectionWrapper>
    );
}

function TestimonialCard(testimonial: Testimonial) {
    return (
        <Card className="flex max-w-[340px] flex-col p-8 md:p-6 lg:p-8">
            <CardContent className="flex flex-grow flex-col gap-4 p-0">
                {testimonial.text.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </CardContent>
            <CardFooter className="mt-8 flex items-center gap-3 p-0 md:mt-6 lg:mt-8">
                <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-lg"
                />
                <div>
                    <p className="text-xl font-semibold">{testimonial.name}</p>
                    <div className="flex items-center">
                        {new Array(5).fill(0).map((_, index) => (
                            <StarIcon
                                key={index}
                                size={16}
                                className="fill-yellow-400 text-yellow-400"
                            />
                        ))}
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
