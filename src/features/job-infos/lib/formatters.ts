import { ExperienceLevel } from "@/drizzle/schemas/jobInfo";

export function formatExperienceLevel(level: ExperienceLevel) {
  switch (level) {
    case "junior":
      return "Junior";
    case "mid-junior":
      return "Mid-Level";
    case "expert":
      return "Expert";
    default:
      throw new Error(`Unknown experience level: ${level satisfies never}`);
  }
}

const DATE_TIME_FORMATTER = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
});
export function formatDateTime(date: Date) {
  return DATE_TIME_FORMATTER.format(date);
}
