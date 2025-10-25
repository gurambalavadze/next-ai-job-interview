import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { userTable } from "./user";
import { relations } from "drizzle-orm";
import { interviewTable } from "./interview";
import { questionTable } from "./question";

export const experienceLevels = ["junior", "mid-junior", "expert"] as const;
export type ExperienceLevel = (typeof experienceLevels)[number];

export const experienceLevelEnum = pgEnum("experience-level", experienceLevels);

export const jobInfoTable = pgTable("jobInfo", {
  id,
  name: varchar({ length: 250 }).notNull(),
  title: varchar({ length: 250 }),
  description: text().notNull(),
  experienceLevel: experienceLevelEnum()
    .notNull()
    .$defaultFn(() => "junior"),
  userId: text()
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
  createdAt,
  updatedAt,
});

export const jobInfoRelations = relations(jobInfoTable, ({ one, many }) => ({
  user: one(userTable, {
    fields: [jobInfoTable.userId],
    references: [userTable.id],
  }),
  interviews: many(interviewTable),
  questions: many(questionTable),
}));
