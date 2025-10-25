import { BackLink } from "@/components/back-link";
import { SuspendedItem } from "@/components/suspended-item";
import { Card, CardContent } from "@/components/ui/card";
import JobInfoForm from "@/features/job-infos/components/job-info-form";
import { getUserJobInfo } from "@/features/job-infos/job-info-actions";
import { Loader2 } from "lucide-react";

export default async function JobInfoEditPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;
  const jobInfo = getUserJobInfo(jobInfoId);

  return (
    <div className="container my-4 max-w-5xl space-y-4">
      <BackLink href={`/app/job-infos/${jobInfoId}`}>
        <SuspendedItem
          fallback="Job Description"
          result={(j) => j?.name}
          item={jobInfo}
        />
      </BackLink>
      <h1 className="text-3xl md:text-4xl">Edit Job Information</h1>
      <Card>
        <CardContent>
          <SuspendedItem
            fallback={<Loader2 className="size-24 animate-spin mx-auto" />}
            item={jobInfo}
            result={(job) => <JobInfoForm jobInfoData={job} />}
          />
        </CardContent>
      </Card>
    </div>
  );
}
