import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import {
  getInterviewIdTag,
  getInterviewsJobInfoTag,
  revalidateInterviewCache,
} from "./interview-cache";
import { db } from "@/drizzle/db";
import { interviewTable as i, jobInfoTable as j } from "@/drizzle/schema";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { getJobInfoIdTag } from "../job-infos/job-infos-cache";

export const getJobInterviewsDB = async (jobInfoId: string, userId: string) => {
  "use cache";
  cacheTag(getInterviewsJobInfoTag(jobInfoId));
  cacheTag(getJobInfoIdTag(jobInfoId));

  return db
    .select({
      id: i.id,
      humeChadId: i.humeChatId,
      duration: i.duration,
      feedback: i.feedback,
      createdAt: i.createdAt,
      updatedAt: i.updatedAt,
      jobInfoId: i.jobInfoId,
      jobInfo: { userId: j.userId },
    })
    .from(i)
    .leftJoin(j, eq(i.jobInfoId, j.id))
    .where(
      and(
        eq(i.jobInfoId, jobInfoId),
        eq(j.userId, userId),
        isNotNull(i.humeChatId)
      )
    )
    .orderBy(desc(i.updatedAt));

  // return db.query.interviewTable.findMany({
  //   columns: {
  //     id: true,
  //     humeChatId: true,
  //     duration: true,
  //     feedback: true,
  //     updatedAt: true,
  //     createdAt: true,
  //     jobInfoId: true,
  //   },
  //   where: and(
  //     eq(i.jobInfoId, jobInfoId),
  //     eq(j.userId, userId),
  //     isNotNull(i.humeChatId)
  //   ),
  //   with: { jobInfo: { columns: { userId: true } } },
  //   orderBy: desc(i.updatedAt),
  // });
};

export const getInterviewDB = async (id: string, userId: string) => {
  "use cache";
  cacheTag(getInterviewIdTag(id));

  return db.query.interviewTable.findFirst({
    with: { jobInfo: { columns: { userId: true } } },
    where: and(eq(i.id, id), eq(j.userId, userId)),
    columns: {
      id: true,
    },
  });
};

export const createInterviewDB = async (jobInfoId: string) => {
  const [result] = await db
    .insert(i)
    .values({ jobInfoId, duration: "00:00:00" })
    .returning({ id: i.id, jobInfoId: i.jobInfoId });

  revalidateInterviewCache(result);
  return result;
};

export const updateInterviewDB = async (
  id: string,
  data: Partial<typeof i.$inferInsert>
) => {
  const [result] = await db
    .update(i)
    .set(data)
    .returning({ id: i.id, jobInfoId: i.jobInfoId });

  revalidateInterviewCache(result);

  return result;
};
