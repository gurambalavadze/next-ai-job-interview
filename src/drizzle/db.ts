import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/drizzle/schema";

// const connectionString = process.env.DATABASE_URL!;
// const pool = postgres(connectionString, { max: 1 });

export const db = drizzle(process.env.DATABASE_URL!, {
  schema,
});
