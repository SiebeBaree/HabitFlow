import { logout } from "@/actions/logout";
import { auth } from "@/server/auth";

export default async function AppPage() {
    const session = await auth();

    return (
        <main className="overflow-hidden">
            <p>{JSON.stringify(session)}</p>

            <form action={logout}>
                <button
                    className="cursor-pointer text-red-500 transition-all duration-200 ease-in-out hover:bg-white/10"
                    type="submit"
                >
                    <span className="font-medium">Log out</span>
                </button>
            </form>
        </main>
    );
}
