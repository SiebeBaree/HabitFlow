import { relations } from "drizzle-orm";
import {
    index,
    integer,
    pgTableCreator,
    primaryKey,
    text,
    timestamp,
    varchar,
    pgEnum,
    serial,
    uuid,
    date,
    boolean,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `habitflow_${name}`);

export const roleEnum = pgEnum("role", ["free", "starter", "dedicated"]);

export const users = createTable("user", {
    id: uuid("id").defaultRandom().notNull().primaryKey(),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).notNull(),
    password: text("password"),
    emailVerified: timestamp("emailVerified", {
        mode: "date",
    }),
    image: varchar("image", { length: 255 }),
    role: roleEnum("role").default("free"),
});

export const usersRelations = relations(users, ({ many, one }) => ({
    accounts: one(accounts, {
        fields: [users.id],
        references: [accounts.userId],
    }),
    habits: many(habits),
    generalNotes: many(generalNotes),
    userSettings: one(userSettings, {
        fields: [users.id],
        references: [userSettings.userId],
    }),
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
        id: serial("id").primaryKey(),
        email: varchar("email", { length: 255 }).notNull().unique(),
        token: varchar("token", { length: 255 }).notNull().unique(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (verificationToken) => ({
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
        id: serial("id").primaryKey(),
        email: varchar("email", { length: 255 }).notNull().unique(),
        token: varchar("token", { length: 255 }).notNull().unique(),
        expires: timestamp("expires", { mode: "date" }).notNull(),
    },
    (passwordResetToken) => ({
        tokenIdx: index("password_reset_token_token_idx").on(
            passwordResetToken.token,
        ),
        emailIdx: index("password_reset_token_email_idx").on(
            passwordResetToken.email,
        ),
    }),
);

export const habits = createTable("habit", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    userId: uuid("userId")
        .notNull()
        .references(() => users.id),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const habitRelations = relations(habits, ({ one }) => ({
    user: one(users, { fields: [habits.userId], references: [users.id] }),
}));

export const dailyTracking = createTable("daily_tracking", {
    id: serial("id").primaryKey(),
    habitId: integer("habitId")
        .notNull()
        .references(() => habits.id),
    date: date("date").notNull(),
    completed: integer("completed").notNull().default(0),
    time_spent: integer("time_spent"),
});

export const dailyTrackingRelations = relations(dailyTracking, ({ one }) => ({
    habit: one(habits, {
        fields: [dailyTracking.habitId],
        references: [habits.id],
    }),
}));

export const trackingNotes = createTable("tracking_note", {
    id: serial("id").primaryKey(),
    dailyTrackingId: integer("dailyTrackingId")
        .notNull()
        .references(() => dailyTracking.id),
    note: text("note"),
});

export const trackingNotesRelations = relations(trackingNotes, ({ one }) => ({
    dailyTracking: one(dailyTracking, {
        fields: [trackingNotes.dailyTrackingId],
        references: [dailyTracking.id],
    }),
}));

export const generalNotes = createTable("general_note", {
    id: serial("id").primaryKey(),
    userId: uuid("userId")
        .notNull()
        .references(() => users.id),
    note: text("note"),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const generalNotesRelations = relations(generalNotes, ({ one }) => ({
    user: one(users, { fields: [generalNotes.userId], references: [users.id] }),
}));

export const userSettings = createTable("user_settings", {
    userId: uuid("userId")
        .notNull()
        .references(() => users.id)
        .primaryKey(),
    habitReminders: boolean("habitReminders").notNull().default(true),
    updateEmails: boolean("updateEmails").notNull().default(true),
    marketingEmails: boolean("marketingEmails").notNull().default(true),
});

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
    user: one(users, { fields: [userSettings.userId], references: [users.id] }),
}));
