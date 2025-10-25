import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/drizzle/db";
import { jobInfoTable } from "@/drizzle/schema";
import JobInfoForm from "@/features/job-infos/components/job-info-form";
import { getUserJobInfos } from "@/features/job-infos/job-info-actions";
import { getJobInfoUserTag } from "@/features/job-infos/job-infos-cache";
import { formatExperienceLevel } from "@/features/job-infos/lib/formatters";
import { desc, eq } from "drizzle-orm";
import { ArrowRight, Loader2Icon, PlusIcon } from "lucide-react";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function AppPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen-header justify-center items-center">
          <Loader2Icon className="animate-spin size-24" />
        </div>
      }
    >
      <div className="container">
        <JobInfos />
      </div>
    </Suspense>
  );
}

function NoJobInfos() {
  return (
    <div className="container my-4 max-w-5xl">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-4">
        Welcome to Elite
      </h1>
      <p className="text-muted-foreground mb-8">
        To get started, enter information about the type of job you are wanting
        to apply for. This can be specific information copied directly from a
        job listing or general information such as the tech stack you want to
        work in. The more specific you are in the description the closer the
        test interviews will be to the real thing.
      </p>
      <Card>
        <CardContent>
          <JobInfoForm />
        </CardContent>
      </Card>
    </div>
  );
}

async function JobInfos() {
  const jobs = await getUserJobInfos();

  if (jobs.length === 0) return <NoJobInfos />;

  return (
    <div className="container my-4">
      <div className="flex justify-between gap-2 mb-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl">
          Select your job info
        </h1>
        <Button asChild>
          <Link href="/app/job-infos/new">
            <PlusIcon />
            Create Job Description
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 has-hover:*:not-hover:opacity-70">
        {jobs.map(({ id, name, description, experienceLevel, title }) => (
          <Link
            href={`/app/job-infos/${id}`}
            key={id}
            className="hover:scale-[1.02] transition-[transform_opacity]"
          >
            <Card className="h-full">
              <div className="flex h-full justify-between items-center">
                <div className="h-full space-y-4">
                  <CardHeader>
                    <CardTitle className="text-lg">{name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground line-clamp-3">
                    {description}
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Badge variant="outline">
                      {formatExperienceLevel(experienceLevel)}
                    </Badge>
                    {title && <Badge variant="outline">{title}</Badge>}
                  </CardFooter>
                </div>
                <CardContent>
                  <ArrowRight />
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
        <Link className="transition-opacity" href="/app/job-infos/new">
          <Card className="h-full flex items-center justify-center border-dashed border-3 bg-transparent hover:border-primary/50 transition-colors shadow-none">
            <div className="text-lg flex items-center gap-2">
              <PlusIcon className="size-6" />
              New Job Description
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
