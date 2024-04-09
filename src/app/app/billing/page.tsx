import { RedirectType, redirect } from "next/navigation";

export default function AppBillingPage() {
    redirect("https://store.habitflow.pro/billing", RedirectType.replace);
}
