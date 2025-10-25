import { pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { jobInfoTable } from "./jobInfo";
import { relations } from "drizzle-orm";

export const questionDifficulties = ["easy", "medium", "hard"] as const;
export type QuestionDifficulty = (typeof questionDifficulties)[number];

export const questionDifficultyEnum = pgEnum(
  "question-difficulty",
  questionDifficulties
);

export const questionTable = pgTable("question", {
  id,
  jobInfoId: varchar()
    .references(() => jobInfoTable.id)
    .notNull(),
  difficulty: questionDifficultyEnum().notNull(),
  text: text().notNull(),
  createdAt,
  updatedAt,
});

export const questionRelations = relations(questionTable, ({ one }) => ({
  jobInfo: one(jobInfoTable, {
    fields: [questionTable.jobInfoId],
    references: [jobInfoTable.id],
  }),
}));
