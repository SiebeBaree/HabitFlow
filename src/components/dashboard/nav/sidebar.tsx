"use client";

import Link from "next/link";
import Image from "next/image";
import { LogOutIcon } from "lucide-react";
import { cn, getDashboardRoutes } from "@/lib/utils";
import type { Session } from "@auth/core";
import { usePathname } from "next/navigation";
import { logout } from "@/actions/logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Premium } from "@/server/db/schema";

export default function DashboardSidebar({
    session,
    premium,
}: {
    session: Session | null;
    premium: Premium;
}) {
    const pathname = usePathname();
    const routes = getDashboardRoutes();

    return (
        <div className="flex h-full flex-col bg-secondary py-4 text-accent-foreground">
            <div className="flex-1 px-3 py-2">
                <Link href={"/app"} className="mb-12 flex items-center pl-3">
                    <div className="relative mr-3 h-8 w-8">
                        <Image
                            height={32}
                            width={32}
                            src="/logo.svg"
                            alt="The logo of HabitFlow"
                        />
                    </div>
                    <h1 className="text-2xl font-bold">HabitFlow</h1>
                </Link>
                <div className="flex flex-col gap-1">
                    {routes.map((route) => {
                        if (route.hideOnFree && premium.role === "free") {
                            return null;
                        }

                        return (
                            <div key={route.href}>
                                <Link
                                    href={route.href}
                                    className={cn(
                                        "group flex w-full cursor-pointer select-none justify-start rounded-lg p-3 text-sm font-medium transition hover:bg-black/10",
                                        pathname === route.href
                                            ? "bg-white/10 text-accent-foreground"
                                            : "text-foreground",
                                        route.isPremium &&
                                            premium.role === "free" &&
                                            "pointer-events-none opacity-50",
                                    )}
                                >
                                    <route.icon className="mr-3 h-5 w-5" />
                                    {route.label}
                                    {route.isPremium &&
                                        premium.role === "free" && (
                                            <Badge className="ml-auto">
                                                PRO
                                            </Badge>
                                        )}
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="px-3 py-2">
                {session && (
                    <>
                        <div className="my-3 flex flex-col gap-1">
                            <form action={logout}>
                                <button
                                    type="submit"
                                    className={
                                        "group flex w-full cursor-pointer justify-start rounded-lg p-3 text-sm font-bold text-red-400 transition hover:bg-black/10"
                                    }
                                >
                                    <LogOutIcon className="mr-3 h-5 w-5" />
                                    Log Out
                                </button>
                            </form>
                        </div>

                        {premium.role === "free" && (
                            <div className="mb-4 flex flex-col items-center justify-center rounded-md bg-background p-4">
                                <p className="font-bold">
                                    Upgrade your account
                                </p>
                                <p className="mb-4 text-center text-sm">
                                    Create more habits, view analytics and more!
                                </p>
                                <Link href="/#pricing">
                                    <Button>Upgrade now</Button>
                                </Link>
                            </div>
                        )}

                        <div className="flex select-none items-center gap-2 rounded-md bg-background px-3 py-2">
                            <Avatar className="h-7 w-7">
                                <AvatarImage
                                    src={session?.user?.image ?? "/logo.png"}
                                    alt="User avatar of your account"
                                />
                                <AvatarFallback>
                                    {session?.user?.name
                                        ?.split(" ")
                                        .map((name) => name[0])
                                        .join("") ?? "U"}
                                </AvatarFallback>
                            </Avatar>
                            <p className="font-medium">{session?.user?.name}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
