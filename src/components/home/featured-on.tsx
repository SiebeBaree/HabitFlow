import Image from "next/image";

export default function FeaturedOn() {
    return (
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
    );
}
