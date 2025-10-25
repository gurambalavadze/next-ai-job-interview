"use client";

import UserAvatar from "@/features/users/components/user-avatar";
import { cn } from "@/lib/utils";
import { ConnectionMessage, useVoice } from "@humeai/voice-react";
import { JsonMessage, ReturnChatEvent } from "hume/api/resources/empathicVoice";
import { BrainCircuitIcon } from "lucide-react";
import { useMemo } from "react";

type Message = JsonMessage | ConnectionMessage | ReturnChatEvent;

export default function Messages({
  user,
  className,
}: {
  user: { name: string; imageURL: string };
  className?: string;
}) {
  const { messages, fft } = useVoice();
  const maxFft = Math.max(...fft);

  const condensedMessages = useMemo(() => {
    return messages.reduce((acc, message) => {
      const parsedMessage = parseMessage(message);
      if (!parsedMessage || !parsedMessage?.content) return acc;
      const lastMessage = acc.at(-1);
      if (!lastMessage)
        acc.push({
          isUser: parsedMessage?.isUser,
          content: [parsedMessage.content],
        });
      if (lastMessage?.isUser === parsedMessage?.isUser)
        lastMessage.content.push(parsedMessage.content);
      return acc;
    }, [] as { isUser: boolean; content: string[] }[]);
  }, [messages]);

  return (
    <div className={cn("flex flex-col gap-4 w-full", className)}>
      {condensedMessages.map((message, index) => {
        const shouldAnimate = index === messages.length - 1 && maxFft > 0;

        return (
          <div
            key={index}
            className={cn(
              "flex items-center gap-5 border pl-4 pr-6 py-4 rounded max-w-3/4",
              message.isUser ? "self-end" : "self-start"
            )}
          >
            {message.isUser ? (
              <UserAvatar
                userName={user.name}
                userImage={user.imageURL}
                className="size-6 flex-shrink-0"
              />
            ) : (
              <div className="relative">
                <div
                  className={cn(
                    "absolute inset-0 border-muted border-4 rounded-full",
                    shouldAnimate ? "animate-ping" : "hidden"
                  )}
                />
                <BrainCircuitIcon
                  className="size-6 flex-shrink-0 relative"
                  style={shouldAnimate ? { scale: maxFft / 8 + 1 } : undefined}
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              {message.content.map((text, i) => (
                <span key={i}>{text}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const parseMessage = (message: Message) => {
  if (message.type === "user_message" || message.type === "assistant_message")
    return {
      isUser: message.type === "user_message",
      content: message.message.content,
    };
  if (message.type === "USER_MESSAGE" || message.type === "AGENT_MESSAGE")
    return {
      isUser: message.type === "USER_MESSAGE",
      content: message.messageText,
    };
};
