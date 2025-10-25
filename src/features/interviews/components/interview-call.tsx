"use client";

import { jobInfoTable } from "@/drizzle/schema";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { updateInterview } from "../interview-actions";
import Controls from "./controls";
import Messages from "./messages";
import StartCallButton from "./start-call-button";

const CALL_UPDATE_INTERVAL = 10000;

export default function InterviewCall({
  jobInfo,
  accessToken,
  user,
}: {
  jobInfo: Pick<
    typeof jobInfoTable.$inferSelect,
    "id" | "name" | "description" | "experienceLevel" | "title"
  >;
  user: { name: string; imageURL: string };
  accessToken: string;
}) {
  const { readyState, chatMetadata, callDurationTimestamp } = useVoice();
  const durationRef = useRef(callDurationTimestamp);
  const router = useRouter();
  const [interviewId, setInterviewId] = useState<string>();

  durationRef.current = callDurationTimestamp;

  useEffect(() => {
    if (chatMetadata?.chatId == null || interviewId == null) return;
    updateInterview(interviewId, { humeChatId: chatMetadata.chatId });
  }, [chatMetadata?.chatId, interviewId]);

  useEffect(() => {
    if (!interviewId) return;

    const interval = setInterval(() => {
      if (!durationRef.current) return;
      updateInterview(interviewId, { duration: durationRef.current });
    }, CALL_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [interviewId]);

  useEffect(() => {
    if (readyState !== VoiceReadyState.CLOSED) return;

    if (!interviewId)
      return router.push(`/app/job-infos/${jobInfo.id}/interviews`);

    if (durationRef.current)
      updateInterview(interviewId, { duration: durationRef.current });

    router.push(`/app/job-infos/${jobInfo.id}/interviews/${interviewId}`);
  }, [interviewId, jobInfo.id, readyState, router]);

  if (
    readyState === VoiceReadyState.CONNECTING ||
    readyState === VoiceReadyState.CLOSED
  ) {
    return (
      <div className="h-screen-header justify-center items-center">
        <Loader2Icon className="size-24 animate-spin m-auto" />
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-screen-header flex flex-col-reverse">
      <StartCallButton
        user={user}
        jobInfo={jobInfo}
        accessToken={accessToken}
        onInterviewId={setInterviewId}
      />
      <div className="container py-6 flex flex-col items-center justify-end gap-4">
        <Messages user={user} className="max-w-5xl" />
        <Controls />
      </div>
    </div>
  );
}
