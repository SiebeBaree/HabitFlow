import { auth } from "@/server/auth";
import { getPremiumByUserId } from "@/server/data/user";
import { redirect } from "next/navigation";

export default async function AppAnalyticsPage() {
    const session = await auth();
    if (!session) {
        return redirect("/login?callbackUrl=/app/analytics");
    }

    const premium = await getPremiumByUserId(session.user.id);
    if (premium.role === "free") {
        return redirect("/#pricing");
    }

    return (
        <div>
            <p>Analytics</p>
        </div>
    );
}
