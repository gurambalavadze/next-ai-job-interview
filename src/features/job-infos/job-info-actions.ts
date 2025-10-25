"use server";

import z from "zod";
import { jobInfoSchema } from "./job-Info-schema";
import { auth } from "@/auth";
import {
  getUserJobInfoDB,
  getUserJobInfosDB,
  insertJobInfoDB,
  updateJobInfoDB,
} from "./job-info-db";
import { redirect } from "next/navigation";

export const createJobInfo = async (
  unsafeData: z.infer<typeof jobInfoSchema>
) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId)
    return {
      error: true,
      message: "Unauthorized",
    };

  const { success, data } = await jobInfoSchema.safeParseAsync(unsafeData);

  if (!success || !data)
    return {
      error: true,
      message: "Invalid Data",
    };

  const result = await insertJobInfoDB({ ...data, userId });

  redirect(`/app/job-infos/${result.id}`);
};

export const updateJobInfo = async (
  id: string,
  unsafeData: z.infer<typeof jobInfoSchema>
) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId)
    return {
      error: true,
      message: "Not Authorized",
    };

  const { success, data: jobInfo } = await jobInfoSchema.safeDecodeAsync(
    unsafeData
  );

  if (!success || !jobInfo)
    return {
      error: true,
      message: "Invalid Data",
    };

  const existedJobInfo = await getUserJobInfoDB(id, userId);

  if (!existedJobInfo)
    return {
      error: true,
      message: "Not Existed",
    };

  const result = await updateJobInfoDB(id, { ...jobInfo, userId });

  redirect(`/app/job-infos/${result.id}`);
};

export const getUserJobInfos = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return redirect("/sign-in");

  return getUserJobInfosDB(userId);
};

export const getUserJobInfo = async (id: string) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return redirect("/sign-in");

  return getUserJobInfoDB(id, userId);
};
