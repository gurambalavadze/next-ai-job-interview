import { experienceLevels } from "@/drizzle/schemas/jobInfo";
import z from "zod";

// Define the schema using zod
export const jobInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1).nullable(),
  description: z.string().min(1, "Description is required"),
  experienceLevel: z.enum(experienceLevels),
});
