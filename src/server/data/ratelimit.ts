import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/server/redis";

type Unit = "ms" | "s" | "m" | "h" | "d";
type Duration = `${number} ${Unit}` | `${number}${Unit}`;

export function createRateLimit(amount: number, duration: Duration) {
    return new Ratelimit({
        redis: redis,
        limiter: Ratelimit.fixedWindow(amount, duration),
        analytics: true,
        prefix: "ratelimit",
    });
}
