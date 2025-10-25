import { getUserJobInfo } from "@/features/job-infos/job-info-actions";
import { fetchAccessToken } from "hume";
import { Suspense } from "react";
import { Loader2Icon } from "lucide-react";
import InterviewCall from "@/features/interviews/components/interview-call";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import VoiceProvider from "@/features/interviews/components/voice-provider";

export default async function NewInterviewPage({
  params,
}: {
  params: Promise<{ jobInfoId: string }>;
}) {
  const { jobInfoId } = await params;
  return (
    <Suspense
      fallback={<Loader2Icon className="size-24 animate-spin m-auto" />}
    >
      <SuspendedComponent jobInfoId={jobInfoId} />
    </Suspense>
  );
}

async function SuspendedComponent({ jobInfoId }: { jobInfoId: string }) {
  const session = await auth();
  const jobInfo = await getUserJobInfo(jobInfoId);

  if (!jobInfo || !session?.user?.image || !session?.user?.name)
    return notFound();

  const accessToken = await fetchAccessToken({
    apiKey: process.env.HUME_API_KEY!,
    secretKey: process.env.HUME_SECRET_KEY!,
  });

  return (
    <VoiceProvider>
      <InterviewCall
        jobInfo={jobInfo}
        user={{ name: session.user.name, imageURL: session.user.image }}
        accessToken={accessToken}
      ></InterviewCall>
    </VoiceProvider>
  );
}
