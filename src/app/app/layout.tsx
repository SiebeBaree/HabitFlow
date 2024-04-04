import DashboardNavbar from "@/components/dashboard/nav/navbar";
import DashboardSidebar from "@/components/dashboard/nav/sidebar";
import { auth } from "@/server/auth";
import { getPremiumByUserId } from "@/server/data/user";

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();
    const premium = await getPremiumByUserId(session?.user.id ?? "");

    return (
        <div className="relative">
            <div className="z-40 hidden h-full w-64 md:fixed md:inset-y-0 md:flex md:flex-col">
                <DashboardSidebar session={session} premium={premium} />
            </div>
            <main className="md:pl-64">
                <DashboardNavbar session={session} premium={premium} />
                <div className="p-4">{children}</div>
            </main>
        </div>
    );
}
