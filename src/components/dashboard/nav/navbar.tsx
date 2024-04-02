"use client";

import type { Session } from "@auth/core";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/dashboard/nav/sidebar";
import { getDashboardRoutes } from "@/lib/utils";

export default function DashboardNavbar({
    session,
}: {
    session: Session | null;
}) {
    const pathname = usePathname();
    const routes = getDashboardRoutes();

    return (
        <div className="flex h-16 items-center justify-between p-4">
            <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold capitalize">
                    {routes.find((route) => route.href === pathname)?.label ??
                        "HabitFlow"}
                </h2>
            </div>

            <div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                        >
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="p-0">
                        <DashboardSidebar session={session} />
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}
