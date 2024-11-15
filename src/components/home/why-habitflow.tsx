import PageTitle from "@/components/home/page-title";
import SectionWrapper from "@/components/home/section-wrapper";
import { cn } from "@/lib/utils";

export default function WhyHabitFlow() {
    return (
        <SectionWrapper>
            <PageTitle title="Why use HabitFlow?" />

            <div className="flex flex-col items-center justify-center gap-24 md:flex-row md:items-start md:gap-8 xl:gap-16">
                <div className="w-full max-w-[500px]">
                    <AboutCard
                        text="NOT using HabitFlow"
                        className="bg-[#f00e29] text-center text-xl font-semibold text-background"
                    />
                    <AboutCard text="You get motivated and start a couple of new habits" />
                    <AboutCard text="You lose motivation and skip some days" />
                    <AboutCard
                        text="A couple of days become week and you stopped your habits"
                        isLast={true}
                    />
                </div>
                <div className="w-full max-w-[500px]">
                    <AboutCard
                        text="Using HabitFlow"
                        className="bg-[#2dc653] text-center text-xl font-semibold text-background"
                    />
                    <AboutCard text="You get motivated and write your habits down in HabitFlow" />
                    <AboutCard text="You lose motivation and skip some days" />
                    <AboutCard text="You check your progress and regain motivation!" />
                    <AboutCard
                        text="A couple of weeks later and a new habit is formed! 🎉"
                        isLast={true}
                    />
                </div>
            </div>
        </SectionWrapper>
    );
}

function AboutCard({
    text,
    isLast,
    className,
}: {
    text: string;
    isLast?: boolean;
    className?: string;
}) {
    return (
        <div>
            <p className={cn("w-full rounded-md bg-card px-4 py-2", className)}>
                {text}
            </p>
            {!isLast && (
                <svg
                    width="18"
                    height="40"
                    viewBox="0 0 18 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mx-auto"
                >
                    <path
                        d="M9 40L17.6603 25L0.339747 25L9 40ZM7.5 6.55671e-08L7.5 26.5L10.5 26.5L10.5 -6.55671e-08L7.5 6.55671e-08Z"
                        fill="hsl(var(--card))"
                    />
                </svg>
            )}
        </div>
    );
}
