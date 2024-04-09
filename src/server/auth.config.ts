import Credentials from "@auth/core/providers/credentials";
import Google from "@auth/core/providers/google";
import Discord from "@auth/core/providers/discord";

import { env } from "@/env";

import type { NextAuthConfig } from "next-auth";

import { loginSchema } from "@/app/(auth)/login/schema";
import { getUserByEmail } from "@/server/data/user";
import { compare } from "bcrypt-ts";

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validatedFields = loginSchema.safeParse(credentials);
                if (!validatedFields.success) {
                    return null;
                }

                const { email, password } = validatedFields.data;

                const user = await getUserByEmail(email);
                if (!user?.password) {
                    return null;
                }

                const passwordsMatch = await compare(password, user.password);
                if (!passwordsMatch) {
                    return null;
                }

                return user;
            },
        }),
        Google({
            clientId: env.AUTH_GOOGLE_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET,
        }),
        Discord({
            clientId: env.AUTH_DISCORD_ID,
            clientSecret: env.AUTH_DISCORD_SECRET,
        }),
    ],
} satisfies NextAuthConfig;
