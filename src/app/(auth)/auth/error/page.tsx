import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AuthErrorPage() {
    return (
        <main className="flex flex-col items-center justify-center">
            <h2>Error</h2>
            <p className="mb-4 text-center">Oops! Something went wrong!</p>

            <Link href="/login">
                <Button className="mt-4" variant="secondary">
                    Go back to login
                </Button>
            </Link>
        </main>
    );
}
