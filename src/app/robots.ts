import type { MetadataRoute } from "next";
import { env } from "@/env";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/app/*",
                "/forgot-password",
                "/reset-password",
                "/verify-email",
                "/auth/error",
            ],
        },
        sitemap: `${env.DOMAIN_PREFIX}${env.VERCEL_URL}/sitemap.xml`,
    };
}
