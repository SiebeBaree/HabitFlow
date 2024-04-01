import "@/styles/globals.css";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const Gabarito = localFont({ src: "../fonts/Gabarito.ttf" });

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
                    Gabarito.className,
                )}
            >
                <Toaster richColors />
                {children}
            </body>
        </html>
    );
}
