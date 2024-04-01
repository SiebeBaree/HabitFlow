import { relations } from "drizzle-orm";
import {
    index,
    integer,
    pgTableCreator,
    primaryKey,
    text,
    timestamp,
    uuid,
    varchar,
    pgEnum,
    unique,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `habitflow_${name}`);

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = createTable("user", {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    password: text("password"),
    emailVerified: timestamp("emailVerified", {
        mode: "date",
    }),
    image: varchar("image", { length: 255 }),
    role: roleEnum("role").default("user"),
});

export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
}));

export const accounts = createTable(
    "account",
    {
        userId: uuid("userId")
            .notNull()
            .references(() => users.id),
        type: varchar("type", { length: 255 })
            .$type<AdapterAccount["type"]>()
            .notNull(),
        provider: varchar("provider", { length: 255 }).notNull(),
        providerAccountId: varchar("providerAccountId", {
            length: 255,
        }).notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: varchar("token_type", { length: 255 }),
        scope: varchar("scope", { length: 255 }),
        id_token: text("id_token"),
        session_state: varchar("session_state", { length: 255 }),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
        userIdIdx: index("account_userId_idx").on(account.userId),
    }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
    "session",
    {
        sessionToken: uuid("sessionToken")
            .defaultRandom()
            .notNull()
            .primaryKey(),
        userId: uuid("userId")
            .notNull()
            .references(() => users.id),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (session) => ({
        userIdIdx: index("session_userId_idx").on(session.userId),
    }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationToken = createTable(
    "verification_token",
    {
        id: uuid("id").defaultRandom().notNull().primaryKey(),
        email: varchar("email", { length: 255 }).notNull(),
        token: varchar("token", { length: 255 }).notNull().unique(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
        unique: unique("verification_token_email_token_idx").on(
            verificationToken.email,
            verificationToken.token,
        ),
        tokenIdx: index("verification_token_token_idx").on(
            verificationToken.token,
        ),
        emailIdx: index("verification_token_email_idx").on(
            verificationToken.email,
        ),
    }),
);

export const passwordResetToken = createTable(
    "password_reset_token",
    {
        id: uuid("id").defaultRandom().notNull().primaryKey(),
        email: varchar("email", { length: 255 }).notNull(),
        token: varchar("token", { length: 255 }).notNull().unique(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (passwordResetToken) => ({
        unique: unique("password_reset_token_email_token_idx").on(
            passwordResetToken.email,
            passwordResetToken.token,
        ),
        tokenIdx: index("password_reset_token_token_idx").on(
            passwordResetToken.token,
        ),
        emailIdx: index("password_reset_token_email_idx").on(
            passwordResetToken.email,
        ),
    }),
);
