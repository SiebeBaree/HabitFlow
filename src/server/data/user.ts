import { db } from "@/server/db";
import { premium, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { takeUniqueOrThrow } from "@/lib/utils";

export async function getUserByEmail(email: string) {
    try {
        return await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1)
            .then(takeUniqueOrThrow);
    } catch {
        return null;
    }
}

export async function getUserById(id: string) {
    try {
        return await db
            .select()
            .from(users)
            .where(eq(users.id, id))
            .limit(1)
            .then(takeUniqueOrThrow);
    } catch {
        return null;
    }
}

export async function getPremiumByUserId(id: string) {
    const defaultData = {
        id: -1,
        userId: id,
        role: "free" as const,
    };

    if (id === "") {
        return defaultData;
    }

    try {
        return await db
            .select()
            .from(premium)
            .where(eq(premium.userId, id))
            .limit(1)
            .then(takeUniqueOrThrow);
    } catch {
        return defaultData;
    }
}
