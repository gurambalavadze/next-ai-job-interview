import Link from "next/link";
import { getJobInterviews } from "../interview-actions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { formatDateTime } from "@/features/job-infos/lib/formatters";

export default async function InterviewsList({
  jobInfoId,
}: {
  jobInfoId: string;
}) {
  const interviews = await getJobInterviews(jobInfoId);

  if (interviews.length === 0)
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
        <h2 className="text-xl text-muted-foreground h-full my-auto">
          No current interview
        </h2>
      </div>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 has-hover:*:not-hover:opacity-70">
      <Link
        className="transition-opacity"
        href={`/app/job-infos/${jobInfoId}/interviews/new`}
      >
        <Card className="h-full flex items-center justify-center border-dashed border-3 bg-transparent hover:border-primary/50 transition-colors shadow-none">
          <div className="text-lg flex items-center gap-2">
            <PlusIcon className="size-6" />
            New Interview
          </div>
        </Card>
      </Link>
      {interviews.map((interview) => (
        <Link
          className="hover:scale-[1.02] transition-[transform_opacity]"
          href={`/app/job-infos/${jobInfoId}/interviews/${interview.id}`}
          key={interview.id}
        >
          <Card className="h-full flex items-start justify-between flex-row">
            <CardHeader className="flex-grow">
              <CardTitle>{formatDateTime(interview.updatedAt)}</CardTitle>
              <CardDescription>{interview.duration}</CardDescription>
            </CardHeader>
            <CardContent>
              <ArrowRightIcon className="size-6" />
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
