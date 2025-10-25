"use client";

import { VoiceProvider as HumeVoiceProvider } from "@humeai/voice-react";
import { toast } from "sonner";

export default function VoiceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HumeVoiceProvider
      onError={(error) => {
        toast.error(error.message);
      }}
    >
      {children}
    </HumeVoiceProvider>
  );
}
