import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ChevronDown,
    CreditCardIcon,
    LayoutDashboardIcon,
    LogOutIcon,
    type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/server/auth";
import { logout } from "@/actions/logout";
import NavItem from "./nav-item";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="container flex h-20 items-center justify-between py-4">
            <div className="flex items-center gap-4 xl:gap-10">
                <div>
                    <h1 className="text-2xl font-bold">HabitFlow</h1>
                </div>
                <ul className="flex items-center gap-2">
                    <li>
                        <NavItem name="Pricing" href="#pricing" />
                    </li>
                    <li>
                        <NavItem name="FAQ" href="#faq" />
                    </li>
                </ul>
            </div>

            {session ? (
                <DropdownMenu>
                    <DropdownMenuTrigger className="group outline-none">
                        <div className="border-highlight flex select-none items-center gap-2 rounded-md bg-secondary px-3 py-2">
                            <Avatar className="h-7 w-7">
                                <AvatarImage
                                    src={
                                        "https://cdn.discordapp.com/embed/avatars/1.png"
                                    }
                                />
                                <AvatarFallback>S</AvatarFallback>
                            </Avatar>
                            <p className="font-medium">Siebe</p>
                            <ChevronDown className="h-4 w-4 text-muted transition-all duration-300 ease-in-out group-data-[state=open]:rotate-180" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mr-4 w-48">
                        <DropdownItem
                            name="Dashboard"
                            href="/app"
                            Icon={LayoutDashboardIcon}
                        />
                        <DropdownItem
                            name="Billing"
                            href="/billing"
                            Icon={CreditCardIcon}
                        />
                        <DropdownMenuSeparator />
                        <form action={logout}>
                            <button type="submit">
                                <DropdownMenuItem className="cursor-pointer text-red-500 transition-all duration-200 ease-in-out hover:bg-white/10">
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
                className="cursor-pointer transition-all duration-200 ease-in-out hover:bg-white/10"
            >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                <span>{name}</span>
            </DropdownMenuItem>
        </Link>
    );
}
