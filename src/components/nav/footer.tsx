import Link from "next/link";
import NavItem from "./nav-item";

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

                    <p className="mt-4">
                        Made with ❤️ by{" "}
                        <Link
                            href="https://twitter.com/BareeSiebe"
                            target="_blank"
                            className="font-medium underline"
                        >
                            Siebe Barée
                        </Link>
                    </p>
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
