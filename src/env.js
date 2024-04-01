import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        DATABASE_URL: z
            .string()
            .url()
            .refine(
                (str) => !str.includes("YOUR_POSTGRES_URL_HERE"),
                "You forgot to change the default URL",
            ),
        NODE_ENV: z
            .enum(["development", "test", "production"])
            .default("development"),
        AUTH_SECRET: z.string(),
        AUTH_DISCORD_ID: z.string(),
        AUTH_DISCORD_SECRET: z.string(),
        AUTH_GOOGLE_ID: z.string(),
        AUTH_GOOGLE_SECRET: z.string(),
        RESEND_API_KEY: z.string(),
        VERCEL_URL: z.string().url(),
    },
    client: {},
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
        AUTH_SECRET: process.env.AUTH_SECRET,
        AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
        AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
        AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
        AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        VERCEL_URL: process.env.VERCEL_URL,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
});
