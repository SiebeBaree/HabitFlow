import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import { CheckIcon, StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Testimonials from "@/components/home/testimonials";

export default function HomePage() {
    return (
        <main className="overflow-hidden">
            <div
                className="container flex flex-col justify-between"
                style={{
                    minHeight: "calc(100vh - 80px)",
                }}
            >
                <div className="relative z-10 my-10 flex w-full flex-grow flex-col items-center justify-center gap-12 xl:my-0 xl:flex-row xl:justify-between xl:gap-0">
                    <div className="z-10 xl:flex-grow">
                        <div className="text-center xl:text-left">
                            <h1>Stop procrastinating.</h1>
                            <h1 className="flex w-full items-center justify-center gap-3 xl:justify-start">
                                Start
                                <div className="relative">
                                    <span className="relative z-20">
                                        improving.
                                    </span>
                                    <svg
                                        width="287"
                                        height="86"
                                        viewBox="0 0 287 86"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute -bottom-4 left-0 hidden sm:block"
                                    >
                                        <path
                                            d="M286 43C286 48.4517 282.308 53.8466 275.145 58.9216C268.008 63.978 257.615 68.5725 244.683 72.4477C218.831 80.1942 183.057 85 143.5 85C103.943 85 68.169 80.1942 42.3172 72.4477C29.385 68.5725 18.9923 63.978 11.855 58.9216C4.69159 53.8466 1 48.4517 1 43C1 37.5483 4.69159 32.1534 11.855 27.0784C18.9923 22.022 29.385 17.4275 42.3172 13.5523C68.169 5.8058 103.943 1 143.5 1C183.057 1 218.831 5.8058 244.683 13.5523C257.615 17.4275 268.008 22.022 275.145 27.0784C282.308 32.1534 286 37.5483 286 43Z"
                                            stroke="#E1EF49"
                                            strokeOpacity="0.7"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                    <svg
                                        width="288"
                                        height="88"
                                        viewBox="0 0 288 88"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="absolute -bottom-4 left-0 hidden sm:block"
                                    >
                                        <path
                                            d="M286.038 34.9853C286.378 40.4264 283.03 46.0409 276.197 51.5527C269.389 57.0443 259.303 62.2779 246.638 66.9519C221.319 76.2952 185.915 83.3222 146.434 85.7887C106.954 88.2551 70.9502 85.6893 44.6657 79.5697C31.517 76.5084 20.8581 72.5709 13.4195 67.9693C5.95352 63.3508 1.93274 58.1966 1.59281 52.7555C1.25289 47.3144 4.60092 41.6999 11.434 36.1881C18.2421 30.6965 28.328 25.4629 40.9935 20.789C66.312 11.4456 101.717 4.4186 141.197 1.95213C180.677 -0.514327 216.681 2.05157 242.965 8.17112C256.114 11.2324 266.773 15.17 274.212 19.7715C281.678 24.39 285.698 29.5442 286.038 34.9853Z"
                                            stroke="#AE7F24"
                                            strokeOpacity="0.7"
                                            strokeWidth="2"
                                        />
                                    </svg>
                                </div>
                            </h1>
                        </div>

                        <p className="mx-auto mb-4 mt-6 max-w-[600px] text-center xl:mx-0 xl:max-w-full xl:text-left">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Tellus elementum sagittis vitae
                            et leo duis ut diam.
                        </p>

                        <div className="my-10 flex flex-col items-center justify-center xl:my-0 xl:items-start xl:justify-normal">
                            <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                    <CheckIcon size={20} />
                                    <p>
                                        <b>53%</b> more likely to stick to your
                                        habits
                                    </p>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckIcon size={20} />
                                    <p>
                                        Get <b>statistics</b> on your habits
                                    </p>
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckIcon size={20} />
                                    <p>
                                        Achieve what you <b>could not</b> before
                                    </p>
                                </li>
                            </ul>
                        </div>

                        <div className="flex justify-center xl:justify-normal">
                            <Button className="mb-8 px-8 xl:mt-6">
                                Improve now!
                            </Button>
                        </div>

                        <div className="flex items-center justify-center gap-4 xl:justify-normal">
                            <div className="flex">
                                {new Array(5).fill(0).map((_, index) => (
                                    <div
                                        key={index}
                                        className={cn(
                                            "h-12 w-12 rounded-full border-4 border-white bg-gray-300",
                                        )}
                                        style={{
                                            transform: `translateX(-${index * 40}%)`,
                                        }}
                                    ></div>
                                ))}
                            </div>

                            <div className="-ml-20">
                                <div className="flex">
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
                            src="/hero-xs.png"
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

                <div className="my-8 flex flex-col items-center justify-center gap-3 md:my-0 md:h-32 md:flex-row md:gap-8 lg:gap-12">
                    <p className="text-foreground/50">Featured on:</p>

                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-4 lg:gap-8">
                        <Image
                            src="/product-hunt.svg"
                            alt="Product hunt logo"
                            width={128}
                            height={30}
                        />
                        <Image
                            src="/product-hunt.svg"
                            alt="Product hunt logo"
                            width={128}
                            height={30}
                        />
                        <Image
                            src="/product-hunt.svg"
                            alt="Product hunt logo"
                            width={128}
                            height={30}
                        />
                        <Image
                            src="/product-hunt.svg"
                            alt="Product hunt logo"
                            width={128}
                            height={30}
                        />
                    </div>
                </div>
            </div>

            <Testimonials />
        </main>
    );
}
