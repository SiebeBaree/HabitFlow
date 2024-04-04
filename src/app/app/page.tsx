import CreateHabitForm from "@/components/dashboard/create-habit-form";
import ViewMonthly from "@/components/dashboard/view-monthly";
import { auth } from "@/server/auth";
import { getPremiumByUserId } from "@/server/data/user";

export default async function AppPage() {
    const session = await auth();
    if (!session) {
        return null;
    }

    const premium = await getPremiumByUserId(session.user.id);

    return (
        <main>
            <ViewMonthly userId={session.user.id} premium={premium} />
            <div className="mt-4">
                <CreateHabitForm />
            </div>
        </main>
    );
}
