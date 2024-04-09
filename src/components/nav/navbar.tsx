import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    LayoutDashboardIcon,
    LogOutIcon,
    SettingsIcon,
    type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { auth } from "@/server/auth";
import { logout } from "@/actions/logout";
import NavItem from "@/components/nav/nav-item";
import UserDropdown from "@/components/nav/user-dropdown";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="container flex h-20 items-center justify-between py-4">
            <div className="flex items-center gap-4 xl:gap-10">
                <Link href="/">
                    <h1 className="text-2xl font-bold text-primary">
                        HabitFlow
                    </h1>
                </Link>
                <ul className="hidden items-center gap-2 sm:flex">
                    <li>
                        <NavItem name="Pricing" href="/#pricing" />
                    </li>
                    <li>
                        <NavItem name="FAQ" href="/#faq" />
                    </li>
                </ul>
            </div>

            {session ? (
                <DropdownMenu>
                    <DropdownMenuTrigger className="group outline-none">
                        <UserDropdown
                            image={session.user.image}
                            name={session.user.name ?? "User"}
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-4 w-48">
                        <DropdownItem
                            name="Dashboard"
                            href="/app"
                            Icon={LayoutDashboardIcon}
                        />
                        <DropdownItem
                            name="Settings"
                            href="/app/settings"
                            Icon={SettingsIcon}
                        />
                        <DropdownMenuSeparator />
                        <form action={logout}>
                            <button type="submit" className="w-full">
                                <DropdownMenuItem className="cursor-pointer text-red-500 transition-all duration-200 ease-in-out hover:bg-black/10">
                                    <LogOutIcon className="mr-2 h-4 w-4" />
                                    <span className="font-medium">Log out</span>
                                </DropdownMenuItem>
                            </button>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <NavItem name="Login" href="/login" />
            )}
        </nav>
    );
}

function DropdownItem({
    name,
    href,
    disabled = false,
    Icon,
}: {
    name: string;
    href?: string;
    disabled?: boolean;
    Icon?: LucideIcon;
}) {
    return (
        <Link href={href ?? "#"}>
            <DropdownMenuItem
                disabled={disabled}
                className="cursor-pointer transition-all duration-200 ease-in-out hover:bg-primary/10"
            >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                <span>{name}</span>
            </DropdownMenuItem>
        </Link>
    );
}
