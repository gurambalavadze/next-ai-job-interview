import { getGlobalTag, getIdTag, getJobInfoTag } from "@/lib/data-cache";
import { revalidateTag } from "next/cache";

export function getJobInfoGlobalTag() {
  return getGlobalTag("interviews");
}

export function getInterviewsJobInfoTag(jobInfoId: string) {
  return getJobInfoTag("interviews", jobInfoId);
}

export function getInterviewIdTag(id: string) {
  return getIdTag("interviews", id);
}

export function revalidateInterviewCache({
  id,
  jobInfoId,
}: {
  id: string;
  jobInfoId: string;
}) {
  revalidateTag(getJobInfoGlobalTag());
  revalidateTag(getInterviewsJobInfoTag(jobInfoId));
  revalidateTag(getInterviewIdTag(id));
}
