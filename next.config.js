await import("./src/env.js");

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

export default config;
