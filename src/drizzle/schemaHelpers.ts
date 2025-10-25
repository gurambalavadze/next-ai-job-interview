import { timestamp, varchar } from "drizzle-orm/pg-core";

export const id = varchar("id")
  .primaryKey()
  .$defaultFn(() => crypto.randomUUID());

export const createdAt = timestamp({ withTimezone: true })
  .defaultNow()
  .notNull();

export const updatedAt = timestamp({ withTimezone: true })
  .defaultNow()
  .$onUpdateFn(() => new Date())
  .notNull();
