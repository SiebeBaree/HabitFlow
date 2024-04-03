/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";

import ProductHunt from "../../../public/product-hunt.svg";
import X from "../../../public/x.svg";
import Reddit from "../../../public/reddit.svg";
import HackerNews from "../../../public/hacker-news.svg";
import Linkedin from "../../../public/linkedin.svg";

export default function FeaturedOn() {
    return (
        <div className="my-8 flex flex-col items-center justify-center gap-3 md:my-0 md:h-32 md:flex-row md:gap-8 lg:gap-12">
            <p className="text-foreground/50 md:hidden">Featured on:</p>

            <div className="my-8 flex flex-grow flex-wrap items-center justify-center gap-6 md:gap-6 lg:gap-10">
                <p className="hidden text-foreground/50 md:block">
                    Featured on:
                </p>

                <Image
                    src={ProductHunt}
                    alt="Product Hunt logo"
                    className="max-h-[30px] w-auto"
                />
                <Image
                    src={X}
                    alt="X (formerly Twitter) logo"
                    className="max-h-[30px] w-auto"
                />
                <Image
                    src={Reddit}
                    alt="Reddit logo"
                    className="max-h-[30px] w-auto"
                />
                <Image
                    src={HackerNews}
                    alt="Hacker News logo"
                    className="max-h-[30px] w-auto"
                />
                <Image
                    src={Linkedin}
                    alt="Linkedin logo"
                    className="max-h-[30px] w-auto"
                />
            </div>
        </div>
    );
}
