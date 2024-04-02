import DashboardNavbar from "@/components/dashboard/nav/navbar";
import DashboardSidebar from "@/components/dashboard/nav/sidebar";
import { auth } from "@/server/auth";

export default async function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <div className="relative">
            <div className="z-40 hidden h-full w-64 md:fixed md:inset-y-0 md:flex md:flex-col">
                <DashboardSidebar session={session} />
            </div>
            <main className="md:pl-64">
                <DashboardNavbar session={session} />
                <div className="p-4">{children}</div>
            </main>
        </div>
    );
}
