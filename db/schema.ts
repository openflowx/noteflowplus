import { pgTable, text, timestamp, uuid, integer, date, primaryKey, jsonb, index } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// FLOWS 
export const flows = pgTable("flows", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("user_id").notNull(), // Clerk user ID
    title: text("title").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
    index("flows_user_id_idx").on(table.userId),
]);

// TAGS 
export const tags = pgTable("tags", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
});

// FLOW_TAGS (junction table) 
export const flowTags = pgTable("flow_tags", {
    flowId: uuid("flow_id").references(() => flows.id, { onDelete: "cascade" }).notNull(),
    tagId: uuid("tag_id").references(() => tags.id, { onDelete: "cascade" }).notNull(),
}, (table) => [
    primaryKey({ columns: [table.flowId, table.tagId] }),
]);

// NOTES 
export const notes = pgTable("notes", {
    id: uuid("id").primaryKey().defaultRandom(),
    flowId: uuid("flow_id").references(() => flows.id, { onDelete: "cascade" }).notNull(),
    title: text("title").notNull(),
    content: text("content"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
    index("notes_flow_id_idx").on(table.flowId),
]);

// AI QUESTIONS 
export const aiQuestions = pgTable("ai_questions", {
    id: uuid("id").primaryKey().defaultRandom(),
    flowId: uuid("flow_id").references(() => flows.id, { onDelete: "cascade" }).notNull(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
    index("ai_questions_flow_id_idx").on(table.flowId),
]);

// QUIZZES 
export const quizzes = pgTable("quizzes", {
    id: uuid("id").primaryKey().defaultRandom(),
    flowId: uuid("flow_id").references(() => flows.id, { onDelete: "cascade" }).notNull(),
    title: text("title").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
    index("quizzes_flow_id_idx").on(table.flowId),
]);

// QUIZ QUESTIONS 
export const quizQuestions = pgTable("quiz_questions", {
    id: uuid("id").primaryKey().defaultRandom(),
    quizId: uuid("quiz_id").references(() => quizzes.id, { onDelete: "cascade" }).notNull(),
    question: text("question").notNull(),
    options: jsonb("options").notNull(),
    correctOption: text("correct_option").notNull(),
}, (table) => [
    index("quiz_questions_quiz_id_idx").on(table.quizId),
]);

// QUIZ ATTEMPTS 
export const quizAttempts = pgTable("quiz_attempts", {
    id: uuid("id").primaryKey().defaultRandom(),
    quizId: uuid("quiz_id").references(() => quizzes.id, { onDelete: "cascade" }).notNull(),
    userId: text("user_id").notNull(), // Clerk user ID
    score: integer("score").notNull(),
    durationSeconds: integer("duration_seconds").notNull(),
    attemptedAt: timestamp("attempted_at").defaultNow().notNull(),
}, (table) => [
    index("quiz_attempts_quiz_id_idx").on(table.quizId),
]);

// DAILY ACTIVITY 
export const dailyActivity = pgTable("daily_activity", {
    userId: text("user_id").notNull(), // Clerk user ID
    activityDate: date("activity_date").notNull(),
    totalTimeSeconds: integer("total_time_seconds").notNull(),
}, (table) => [
    primaryKey({ columns: [table.userId, table.activityDate] }),
]);

// EVENTS 
export const events = pgTable("events", {
    id: uuid("id").primaryKey().defaultRandom(),
    flowId: uuid("flow_id").references(() => flows.id, { onDelete: "cascade" }).notNull(),
    title: text("title").notNull(),
    startDatetime: timestamp("start_datetime").notNull(),
    endDatetime: timestamp("end_datetime").notNull(),
    description: text("description"),
    color: text("color"),     // Store hex or Tailwind color class
    status: text("status").default("todo"), //  in-progress, completed
    isAllDay: integer("is_all_day").default(0), // 0 for false, 1 for true
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
    index("events_flow_id_idx").on(table.flowId),
]);

// USER SETTINGS 
export const userSettings = pgTable("user_settings", {
    userId: text("user_id").notNull().primaryKey(), // Clerk user ID
    lastSelectedFlowId: uuid("last_selected_flow_id").references(() => flows.id, { onDelete: "set null" }),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// RELATIONS 
export const flowsRelations = relations(flows, ({ many, one }) => ({
    notes: many(notes),
    aiQuestions: many(aiQuestions),
    quizzes: many(quizzes),
    events: many(events),
    flowTags: many(flowTags),
    userSettings: one(userSettings),
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

export const dailyActivityRelations = relations(dailyActivity, () => ({}));
export const eventsRelations = relations(events, ({ one }) => ({
    flow: one(flows, { fields: [events.flowId], references: [flows.id] }),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
    flowTags: many(flowTags),
}));

export const flowTagsRelations = relations(flowTags, ({ one }) => ({
    flow: one(flows, { fields: [flowTags.flowId], references: [flows.id] }),
    tag: one(tags, { fields: [flowTags.tagId], references: [tags.id] }),
}));

export const userSettingsRelations = relations(userSettings, ({ one }) => ({
    lastSelectedFlow: one(flows, { fields: [userSettings.lastSelectedFlowId], references: [flows.id] }),
}));
