import Link from "next/link";
import NavItem from "./nav-item";
import { MailIcon } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <div className="bg-card">
            <footer className="container flex flex-col items-center justify-between gap-10 py-12 md:flex-row md:gap-0">
                <div className="text-center md:text-start">
                    <h3>HabitFlow</h3>
                    <p className="max-w-[275px] text-sm lg:max-w-[350px]">
                        HabitFlow is a habit tracker that helps you build good
                        habits and break bad ones.
                    </p>

                    <p className="mt-4 text-sm">
                        Made with ❤️ by{" "}
                        <Link
                            href="https://x.com/BareeSiebe"
                            target="_blank"
                            className="font-medium underline"
                        >
                            Siebe Barée
                        </Link>
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                        <Link href="mailto:siebe.baree@outlook.com">
                            <MailIcon size={16} />
                        </Link>

                        <Link href="https://x.com/BareeSiebe" target="_blank">
                            <Image
                                src="/x.svg"
                                alt="X (formerly Twitter) logo"
                                width={16}
                                height={16}
                            />
                        </Link>

                        <Link href="/community" target="_blank">
                            <Image
                                src="/discord.svg"
                                alt="Discord logo"
                                width={16}
                                height={16}
                            />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
                    <NavItem name="Dashboard" href="/app" />
                    <NavItem name="Terms of Service" href="/terms-of-service" />
                    <NavItem name="Privacy Policy" href="/privacy-policy" />
                </div>
            </footer>
        </div>
    );
}
