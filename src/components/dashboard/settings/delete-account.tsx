import { Button } from "@/components/ui/button";

export default function SettingsDeleteAccount() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Delete Account</h1>
                <p className="text-balance text-muted-foreground">
                    If you delete your account, all of your data will be
                    permanently removed. Please note that any previous purchases
                    or subscriptions will not be refunded.
                </p>
            </div>
            <Button variant="destructive">Reset Account</Button>
        </div>
    );
}
