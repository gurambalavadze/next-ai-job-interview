"use client";

import { Button } from "@/components/ui/button";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { createInterview } from "../interview-actions";
import { toast } from "sonner";
import { jobInfoTable } from "@/drizzle/schema";

export default function StartCallButton({
  user,
  jobInfo,
  onInterviewId,
  accessToken,
}: {
  user: { name: string };
  jobInfo: Pick<
    typeof jobInfoTable.$inferSelect,
    "id" | "name" | "description" | "experienceLevel" | "title"
  >;
  onInterviewId: (interviewId: string) => void;
  accessToken: string;
}) {
  const { connect, readyState } = useVoice();

  const handleStartInterview = async () => {
    const { error, message, id } = await createInterview(jobInfo.id);
    if (error || !id) {
      toast.error(message || "Unknown error has been occurred");
    }
    if (id) onInterviewId(id);

    connect({
      auth: { type: "accessToken", value: accessToken },
      configId: process.env.NEXT_PUBLIC_HUME_CONFIG_ID,
      sessionSettings: {
        type: "session_settings",
        variables: {
          userName: user.name,
          jobTitle: jobInfo.title || "Not Specified",
          jobDescription: jobInfo.description,
          experienceLevel: jobInfo.experienceLevel,
        },
      },
    });
  };

  return readyState === VoiceReadyState.IDLE ? (
    <div className="justify-center h-full items-center flex">
      <Button onClick={handleStartInterview}>Start Interview</Button>
    </div>
  ) : null;
}
