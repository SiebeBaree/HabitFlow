await import("./src/env.js");
import withPWAInit from "@ducanh2912/next-pwa";
import { withPlausibleProxy } from "next-plausible";

const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
});

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                port: "",
                pathname: "/embed/avatars/**",
            },
            {
                protocol: "https",
                hostname: "cdn.discordapp.com",
                port: "",
                pathname: "/avatars/**",
            },
            {
                protocol: "https",
                hostname: "*.googleusercontent.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/js/script.js",
                destination: "https://plausible.siebebaree.com/js/script.js",
            },
            {
                source: "/api/event",
                destination: "https://plausible.siebebaree.com/api/event",
            },
        ];
    },
};

export default withPWA(withPlausibleProxy()(config));
