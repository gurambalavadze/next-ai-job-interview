import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import ForwardEmail from "next-auth/providers/forwardemail";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [GitHub, ForwardEmail],
} satisfies NextAuthConfig;
