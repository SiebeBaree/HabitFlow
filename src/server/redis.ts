import { Redis } from "@upstash/redis";
import { env } from "@/env";

const redisConn = new Redis({
    url: env.REDIS_URL,
    token: env.REDIS_TOKEN,
    retry: {
        retries: 3,
        backoff: (attempt) => Math.exp(attempt) * 75,
    },
});

export const redis = redisConn;
