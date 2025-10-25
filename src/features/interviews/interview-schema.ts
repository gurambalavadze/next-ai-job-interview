import z from "zod";

export const updateInterviewSchema = z.object({
  humeChatId: z.string().min(1).optional(),
  duration: z.string().min(1).optional(),
});
