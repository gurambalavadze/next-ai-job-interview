"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  createInterviewDB,
  getInterviewDB,
  getJobInterviewsDB,
  updateInterviewDB,
} from "./iterviews-db";
import { getUserJobInfoDB } from "../job-infos/job-info-db";
import z from "zod";
import { updateInterviewSchema } from "./interview-schema";

const getUserIdOrRedirect = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return redirect("/sign-in");

  return userId;
};

export const getJobInterviews = async (jobInfo: string) => {
  const userId = await getUserIdOrRedirect();

  return getJobInterviewsDB(jobInfo, userId);
};

export const createInterview = async (jobInfoId: string) => {
  const userId = await getUserIdOrRedirect();

  const job = await getUserJobInfoDB(jobInfoId, userId);

  if (!job) return { error: true, message: "Unauthorized" };

  const result = await createInterviewDB(jobInfoId);

  return { error: false, id: result.id };
};

export const updateInterview = async (
  id: string,
  unsafeData: z.infer<typeof updateInterviewSchema>
) => {
  console.log("udpate interview called with args:", id, unsafeData);
  const userId = await getUserIdOrRedirect();

  const interview = await getInterviewDB(id, userId);
  if (!interview)
    return {
      error: true,
      message: "Unauthorized",
    };

  const { success, data, error } = await updateInterviewSchema.safeParseAsync(
    unsafeData
  );
  if (!success || error)
    return {
      error: true,
      message: "Invalid Data",
    };

  const result = await updateInterviewDB(id, data);
  return result.id;
};
