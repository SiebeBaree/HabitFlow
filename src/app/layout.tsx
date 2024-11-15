import "@/styles/globals.css";

import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import type { Metadata, Viewport } from "next";
import { env } from "@/env";
import Providers from "@/components/providers";
import PlausibleProvider from "next-plausible";

const gabarito = localFont({
    src: [
        {
            path: "../fonts/Gabarito-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/Gabarito-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../fonts/Gabarito-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../fonts/Gabarito-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
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
    metadataBase: new URL(env.APP_URL),
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
            <head>
                <PlausibleProvider domain="habitflow.pro" selfHosted={true} />
            </head>
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
