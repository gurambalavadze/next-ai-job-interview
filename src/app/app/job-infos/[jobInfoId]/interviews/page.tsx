import { BackLink } from "@/components/back-link";
import { SuspendedItem } from "@/components/suspended-item";
import { Button } from "@/components/ui/button";
import InterviewsList from "@/features/interviews/components/interview-list";
import { getJobInterviews } from "@/features/interviews/interview-actions";
import JobInfoBackLink from "@/features/job-infos/components/job-info-back-link";
import { Loader2Icon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function InterviewsPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;

  return (
    <div className="container my-4 space-y-4">
      <JobInfoBackLink jobInfoId={jobInfoId} />
      <div className="space-y-6">
        <header className="space-y-4 flex justify-between">
          <h1 className="text-3xl md:text-4xl lg:text-5xl">Interviews</h1>
          <Button asChild>
            <Link href={`/app/job-infos/${jobInfoId}/interviews/new`}>
              <PlusIcon /> New Interview
            </Link>
          </Button>
        </header>

        <Suspense
          fallback={<Loader2Icon className="size-24 animate-spin m-auto" />}
        >
          <InterviewsList jobInfoId={jobInfoId} />
        </Suspense>
      </div>
    </div>
  );
}
