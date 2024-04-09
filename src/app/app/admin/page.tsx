import { auth } from "@/server/auth";
import { SetupWebhookButton } from "./setup-webhook";
import { hasWebhook } from "@/actions/lemonsqueezy";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AppAdminPage() {
    const session = await auth();
    if (!session || session.user.role !== "admin") {
        return notFound();
    }

    const hasWh = Boolean(await hasWebhook());

    return (
        <div>
            {hasWh ? (
                <div>
                    <h2>Webhook Setup</h2>

                    <p>
                        The webhook has been set up successfully. You can now
                        start using the Lemon Squeezy API to interact with
                        webhooks.
                    </p>
                </div>
            ) : (
                <>
                    <h2>Webhook Setup</h2>

                    <p>
                        This app relies on webhooks to listen for changes made
                        on Lemon Squeezy. Make sure that you have entered all
                        the required environment variables (.env). This section
                        is an example of how you&apos;d use the Lemon Squeezy
                        API to interact with webhooks.
                    </p>

                    <p className="mb-6">
                        Configure the webhook on{" "}
                        <a
                            href="https://app.lemonsqueezy.com/settings/webhooks"
                            target="_blank"
                        >
                            Lemon Squeezy
                        </a>
                        , or simply click the button below to do that
                        automatically with the Lemon Squeezy SDK.
                    </p>

                    <SetupWebhookButton disabled={hasWh} />
                </>
            )}
        </div>
    );
}
