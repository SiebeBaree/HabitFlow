import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import { CheckIcon, StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const persons = [
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
    "/logo.png",
];

export default function Hero() {
    return (
        <div className="relative z-10 my-10 flex w-full flex-grow flex-col items-center justify-center gap-12 xl:my-0 xl:flex-row xl:justify-between xl:gap-0">
            <div className="z-10 xl:flex-grow">
                <div className="text-center xl:text-left">
                    <h1>Stop procrastinating.</h1>
                    <h1 className="flex w-full items-center justify-center gap-3 xl:justify-start">
                        Start
                        <div className="relative">
                            <span className="relative z-20 text-primary">
                                improving.
                            </span>
                            <svg
                                width="271"
                                height="12"
                                viewBox="0 0 271 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute -bottom-2"
                            >
                                <path
                                    d="M3 3C9.06854 3.8125 31.0743 8.19464 43.0124 8.35714C54.9505 8.51964 67.5861 4.10393 81.7129 4.07143C95.8396 4.03893 121.034 8.17536 136.156 8.14286C151.278 8.11036 161.419 3.72714 181.416 3.85714C201.412 3.98714 254.868 8.22 268 9"
                                    stroke="hsl(var(--primary) / 0.3)"
                                    strokeWidth={6}
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    </h1>
                </div>

                <p className="mx-auto mb-4 mt-6 max-w-[600px] text-center xl:mx-0 xl:max-w-full xl:text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Tellus elementum sagittis vitae et leo duis ut diam.
                </p>

                <div className="my-10 flex flex-col items-center justify-center xl:my-0 xl:items-start xl:justify-normal">
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <CheckIcon size={20} className="text-primary" />
                            <p>
                                <b>53%</b> more likely to stick to your habits
                            </p>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckIcon size={20} className="text-primary" />
                            <p>
                                Get <b>statistics</b> on your habits
                            </p>
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckIcon size={20} className="text-primary" />
                            <p>
                                Habit Tracker from <b>Atomic Habits</b>
                            </p>
                        </li>
                    </ul>
                </div>

                <div className="flex justify-center xl:justify-normal">
                    <Button className="mb-8 px-8 xl:mt-6">Improve now!</Button>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row xl:justify-normal">
                    <div className="ml-20 flex justify-center sm:ml-0 sm:justify-normal">
                        {persons.map((url, index) => (
                            <Image
                                key={index}
                                src={url}
                                alt="Person that improved their life"
                                height={48}
                                width={48}
                                className={cn(
                                    "h-12 w-12 rounded-full border-4 border-white",
                                )}
                                style={{
                                    transform: `translateX(-${index * 40}%)`,
                                }}
                            />
                        ))}
                    </div>

                    <div className="text-center sm:-ml-20 sm:text-left">
                        <div className="mb-1 flex justify-center sm:mb-0 sm:justify-normal">
                            {new Array(5).fill(0).map((_, index) => (
                                <StarIcon
                                    key={index}
                                    size={20}
                                    className="fill-yellow-400 text-yellow-400"
                                />
                            ))}
                        </div>
                        <p className="text-sm">
                            <b>8</b> people are improving their lives
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex w-full justify-center xl:justify-normal">
                <Image
                    src="/hero-xs.jpg"
                    alt="HabitFlow dashboard"
                    width={800}
                    height={600}
                    priority
                    className={cn(
                        "absolute top-1/2 z-0 hidden h-[600px] -translate-y-1/2 pl-8 xl:block",
                        styles.edge,
                    )}
                />
                <Image
                    src="/hero.png"
                    alt="HabitFlow dashboard"
                    width={800}
                    height={600}
                    priority
                    className="block xl:hidden"
                />
            </div>
        </div>
    );
}
