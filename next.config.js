/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
await import("./src/env.js");

import nextPWA from "next-pwa";

/** @type {import("next-pwa").WithPWA} */
const withPWA = nextPWA({
    dest: "public",
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
};

export default withPWA(config);
