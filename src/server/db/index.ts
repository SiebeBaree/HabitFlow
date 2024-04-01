import {
    type NeonQueryFunction,
    neon,
    neonConfig,
} from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { env } from "@/env";
import * as schema from "./schema";

neonConfig.fetchConnectionCache = true;

const globalForDb = globalThis as unknown as {
    conn: NeonQueryFunction<false, false> | undefined;
};

const conn = globalForDb.conn ?? neon(env.DATABASE_URL);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, { schema });
