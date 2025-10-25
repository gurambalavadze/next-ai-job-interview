import { jobInfoTable } from "@/drizzle/schema";
import {
  getJobInfoIdTag,
  getJobInfoUserTag,
  revalidateJobInfoCache,
} from "./job-infos-cache";
import { and, eq, desc } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

export const insertJobInfoDB = async (
  job: typeof jobInfoTable.$inferInsert
) => {
  const [result] = await db.insert(jobInfoTable).values(job).returning({
    id: jobInfoTable.id,
    userId: jobInfoTable.userId,
  });

  revalidateJobInfoCache(result);

  return result;
};

export const updateJobInfoDB = async (
  id: string,
  job: Partial<typeof jobInfoTable.$inferInsert>
) => {
  const [result] = await db
    .update(jobInfoTable)
    .set(job)
    .where(eq(jobInfoTable.id, id))
    .returning({
      id: jobInfoTable.id,
      userId: jobInfoTable.userId,
    });

  revalidateJobInfoCache(result);

  return result;
};

export const getUserJobInfoDB = async (id: string, userId: string) => {
  "use cache";
  cacheTag(getJobInfoIdTag(id));
  // return db.select({id: jobInfoTable.id}).from(jobInfoTable).where(eq(jobInfoTable.userId, userId))
  return db.query.jobInfoTable.findFirst({
    where: and(eq(jobInfoTable.userId, userId), eq(jobInfoTable.id, id)),
  });
};

export const getUserJobInfosDB = async (userId: string) => {
  "use cache";
  cacheTag(getJobInfoUserTag(userId));

  return db
    .select({
      id: jobInfoTable.id,
      name: jobInfoTable.name,
      title: jobInfoTable.title,
      experienceLevel: jobInfoTable.experienceLevel,
      description: jobInfoTable.description,
    })
    .from(jobInfoTable)
    .where(eq(jobInfoTable.userId, userId))
    .orderBy(desc(jobInfoTable.updatedAt));
};
