import CreateHabitForm from "@/components/app/create-habit-form";
import ViewMonthly from "@/components/app/view-monthly";
import { auth } from "@/server/auth";

export default async function AppPage() {
    const session = await auth();
    if (!session) {
        return null;
    }

    return (
        <main>
            <ViewMonthly userId={session.user.id} />
            <div className="mt-4">
                <CreateHabitForm />
            </div>
        </main>
    );
}
