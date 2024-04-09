import SettingsAccountForm from "@/components/dashboard/settings/account-form";
import SettingsNotificationsForm from "@/components/dashboard/settings/notifications-form";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { accounts, userSettings } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const defaultSettings = {
    habitReminders: true,
    updateEmails: true,
    marketingEmails: true,
};

export default async function AppSettingsPage() {
    const session = await auth();
    if (!session) {
        return redirect("/login?callbackUrl=/app/settings");
    }

    const account = await db
        .select({
            provider: accounts.provider,
        })
        .from(accounts)
        .where(eq(accounts.userId, session.user.id));

    let isAuthProvider = false;
    if (account.length > 0 && account[0]?.provider !== "credentials") {
        isAuthProvider = true;
    }

    const userSettingsData = await db
        .select()
        .from(userSettings)
        .where(eq(userSettings.userId, session.user.id));

    if (userSettingsData.length === 0) {
        await db.insert(userSettings).values({
            userId: session.user.id,
        });
    }

    const notifications = userSettingsData[0] ?? {
        userId: session.user.id,
        ...defaultSettings,
    };

    return (
        <div className="space-y-16">
            <SettingsAccountForm
                name={session.user.name ?? ""}
                isAuthProvider={isAuthProvider}
            />
            <SettingsNotificationsForm notifications={notifications} />
        </div>
    );
}
