import type { MetadataRoute } from "next";
import { env } from "@/env";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${env.DOMAIN_PREFIX}${env.VERCEL_URL}/`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${env.DOMAIN_PREFIX}${env.VERCEL_URL}/login`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${env.DOMAIN_PREFIX}${env.VERCEL_URL}/register`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${env.DOMAIN_PREFIX}${env.VERCEL_URL}/terms-of-service`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${env.DOMAIN_PREFIX}${env.VERCEL_URL}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];
}
