import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";
import { db } from "@/server/db";
import { createTable, users } from "@/server/db/schema";
import authConfig from "@/server/auth.config";
import { eq } from "drizzle-orm";
import { getUserById } from "@/server/data/user";
import type { Role } from "@/types";

declare module "@auth/core" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role: Role;
        } & DefaultSession["user"];
    }
}

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            role: Role;
        } & DefaultSession["user"];
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        role?: Role;
    }
}

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/login",
        error: "/auth/error",
        newUser: "/register",
    },
    events: {
        async linkAccount({ user, account }) {
            if (account?.provider === "credentials") return;
            await db
                .update(users)
                .set({ emailVerified: new Date() })
                .where(eq(users.id, user.id ?? ""));
        },
    },
    callbacks: {
        signIn: async ({ user, account }) => {
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id ?? "");
            return !!existingUser?.emailVerified;
        },
        session: ({ session, token }) => ({
            ...session,
            user: {
                ...session.user,
                id: token.sub,
                role: token.role ?? "user",
            },
        }),
        jwt: async ({ token }) => {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            token.role = existingUser.role ?? undefined;
            return token;
        },
    },
    adapter: DrizzleAdapter(db, createTable),
    session: { strategy: "jwt" },
    ...authConfig,
});
