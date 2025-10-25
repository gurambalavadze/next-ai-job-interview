import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import {
  accountTable,
  sessionTable,
  userTable,
  verificationTokens,
} from "./drizzle/schema";
import Nodemailer from "next-auth/providers/nodemailer";
import { db } from "./drizzle/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: userTable,
    accountsTable: accountTable,
    sessionsTable: sessionTable,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    GitHub,
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
});
