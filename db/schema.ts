import { pgTable, text, timestamp, uuid, integer, date, primaryKey, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const flows = pgTable("flows", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(), // Clerk user ID
    title: text("title").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const notes = pgTable("notes", {
    id: uuid("id").primaryKey().defaultRandom(),
    flowId: uuid("flow_id").references(() => flows.id, { onDelete: "cascade" }).notNull(),
    title: text("title").notNull(),
    content: text("content"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aiQuestions = pgTable("ai_questions", {
    id: uuid("id").primaryKey().defaultRandom(),
    flowId: uuid("flow_id").references(() => flows.id, { onDelete: "cascade" }).notNull(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quizzes = pgTable("quizzes", {
    id: uuid("id").primaryKey().defaultRandom(),
    flowId: uuid("flow_id").references(() => flows.id, { onDelete: "cascade" }).notNull(),
    title: text("title").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const quizQuestions = pgTable("quiz_questions", {
    id: uuid("id").primaryKey().defaultRandom(),
    quizId: uuid("quiz_id").references(() => quizzes.id, { onDelete: "cascade" }).notNull(),
    question: text("question").notNull(),
    options: jsonb("options").notNull(),
    correctOption: text("correct_option").notNull(),
});

export const quizAttempts = pgTable("quiz_attempts", {
    id: uuid("id").primaryKey().defaultRandom(),
    quizId: uuid("quiz_id").references(() => quizzes.id, { onDelete: "cascade" }).notNull(),
    userId: text("user_id").notNull(), // Clerk user ID
    score: integer("score").notNull(),
    durationSeconds: integer("duration_seconds").notNull(),
    attemptedAt: timestamp("attempted_at").defaultNow().notNull(),
});

export const dailyActivity = pgTable("daily_activity", {
    userId: text("user_id").notNull(), // Clerk user ID
    activityDate: date("activity_date").notNull(),
    totalTimeSeconds: integer("total_time_seconds").notNull(),
}, (table) => ({
    pk: primaryKey({ columns: [table.userId, table.activityDate] }),
}));

export const events = pgTable("events", {
    id: uuid("id").primaryKey().defaultRandom(),
    flowId: uuid("flow_id").references(() => flows.id, { onDelete: "cascade" }).notNull(),
    title: text("title").notNull(),
    startDatetime: timestamp("start_datetime").notNull(),
    endDatetime: timestamp("end_datetime").notNull(),
    description: text("description"),
});

export const flowsRelations = relations(flows, ({ many }) => ({
    notes: many(notes),
    aiQuestions: many(aiQuestions),
    quizzes: many(quizzes),
    events: many(events),
}));

export const notesRelations = relations(notes, ({ one }) => ({
    flow: one(flows, { fields: [notes.flowId], references: [flows.id] }),
}));

export const aiQuestionsRelations = relations(aiQuestions, ({ one }) => ({
    flow: one(flows, { fields: [aiQuestions.flowId], references: [flows.id] }),
}));

export const quizzesRelations = relations(quizzes, ({ one, many }) => ({
    flow: one(flows, { fields: [quizzes.flowId], references: [flows.id] }),
    questions: many(quizQuestions),
    attempts: many(quizAttempts),
}));

export const quizQuestionsRelations = relations(quizQuestions, ({ one }) => ({
    quiz: one(quizzes, { fields: [quizQuestions.quizId], references: [quizzes.id] }),
}));

export const quizAttemptsRelations = relations(quizAttempts, ({ one }) => ({
    quiz: one(quizzes, { fields: [quizAttempts.quizId], references: [quizzes.id] }),
}));

export const dailyActivityRelations = relations(dailyActivity, ({ }) => ({}));

export const eventsRelations = relations(events, ({ one }) => ({
    flow: one(flows, { fields: [events.flowId], references: [flows.id] }),
}));
