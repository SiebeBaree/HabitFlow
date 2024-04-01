import "@/styles/globals.css";

import { Gabarito } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const gabarito = Gabarito({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata = {
    title: "HabitFlow",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    gabarito.className,
                )}
            >
                <Toaster richColors />
                {children}
            </body>
        </html>
    );
}
