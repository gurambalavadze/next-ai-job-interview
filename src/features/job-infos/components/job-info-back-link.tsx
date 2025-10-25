import { BackLink } from "@/components/back-link";
import { SuspendedItem } from "@/components/suspended-item";
import { getUserJobInfo } from "../job-info-actions";

export default async function JobInfoBackLink({
  jobInfoId,
}: {
  jobInfoId: string;
}) {
  const jobInfo = getUserJobInfo(jobInfoId);

  return (
    <BackLink href={`/app/job-infos/${jobInfoId}`}>
      <SuspendedItem
        fallback="Job Description"
        result={(j) => j.name}
        item={jobInfo}
      />
    </BackLink>
  );
}
