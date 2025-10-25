"use client";

import { Button } from "@/components/ui/button";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { MicIcon, MicOffIcon, PhoneOffIcon } from "lucide-react";
import FftVisualizer from "./FftVisualizer";

export default function Controls() {
  const {
    disconnect,
    isMuted,
    mute,
    unmute,
    micFft,
    callDurationTimestamp,
    readyState,
  } = useVoice();

  if (readyState !== VoiceReadyState.OPEN) return null;

  return (
    <div className="flex gap-5 rounded border px-5 py-2 w-fit sticky bottom-6 bg-background items-center">
      <Button
        variant="ghost"
        size="icon"
        className="-mx-3"
        onClick={() => (isMuted ? unmute() : mute())}
      >
        {isMuted ? <MicOffIcon className="text-destructive" /> : <MicIcon />}
        <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
      </Button>
      <div className="self-stretch">
        <FftVisualizer fft={micFft} />
      </div>
      <div className="text-sm text-muted-foreground tabular-nums">
        {callDurationTimestamp}
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="-mx-3"
        onClick={disconnect}
      >
        <PhoneOffIcon className="text-destructive" />
        <span className="sr-only">End Call</span>
      </Button>
    </div>
  );
}
