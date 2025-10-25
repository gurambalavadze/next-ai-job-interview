import { pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { jobInfoTable } from "./jobInfo";
import { relations } from "drizzle-orm";
import { userTable } from "./user";

export const interviewTable = pgTable("interview", {
  id,
  jobInfoId: varchar()
    .references(() => jobInfoTable.id, { onDelete: "cascade" })
    .notNull(),
  duration: varchar().notNull(),
  humeChatId: varchar(),
  feedback: varchar(),
  createdAt,
  updatedAt,
});

export const interviewRelations = relations(interviewTable, ({ one }) => ({
  jobInfo: one(jobInfoTable, {
    fields: [interviewTable.jobInfoId],
    references: [jobInfoTable.id],
  }),
}));
