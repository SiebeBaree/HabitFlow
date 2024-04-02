import "@/styles/globals.css";

import { Gabarito } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import type { Metadata, Viewport } from "next";
import { env } from "@/env";
import Providers from "@/components/providers";

const gabarito = Gabarito({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: {
        template: "HabitFlow - %s",
        default: "HabitFlow",
    },
    description: "Build habits, stop procrastinating, and improve your life.",
    generator: "HabitFlow",
    applicationName: "HabitFlow",
    referrer: "origin-when-cross-origin",
    keywords: [
        "habit",
        "flow",
        "habitflow",
        "habit flow",
        "build habits",
        "stop procrastinating",
        "procrastination",
        "productivity",
        "habit tracker",
        "habit tracking",
        "atomic habits",
        "atomic",
        "habits",
    ],
    authors: [{ name: "Siebe Barée", url: "https://siebebaree.be" }],
    creator: "Siebe Barée",
    publisher: "HabitFlow",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(env.DOMAIN_PREFIX + env.VERCEL_URL),
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    icons: {
        icon: [
            {
                url: "/favicon-16x16.png",
                sizes: "16x16",
                type: "image/png",
            },
            {
                url: "/favicon-32x32.png",
                sizes: "32x32",
                type: "image/png",
            },
        ],
        other: [
            {
                rel: "mask-icon",
                url: "/safari-pinned-tab.svg",
                color: "#042232",
            },
        ],
    },
    other: {
        "msapplication-TileColor": "#042232",
    },
};

export const viewport: Viewport = {
    themeColor: "#FFFFFF",
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
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
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
