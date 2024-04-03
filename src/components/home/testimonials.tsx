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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam. Lorem ipsum dolor sit amet.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum.",
        ],
        name: "John Doe",
        image: "/logo.png",
        stars: 5,
    },
    {
        text: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam. Lorem ipsum dolor sit amet.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum.",
        ],
        name: "John Doe",
        image: "/logo.png",
        stars: 5,
    },
    {
        text: [
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum sagittis vitae et leo duis ut diam. Lorem ipsum dolor sit amet.",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tellus elementum.",
        ],
        name: "John Doe",
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
        <Card className="max-w-[340px] p-8 md:p-6 lg:p-8">
            <CardContent className="flex flex-col gap-4 p-0">
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
                    <h5>{testimonial.name}</h5>
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
