import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { apiEnv } from "@/api-env";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
  }),
  secret: apiEnv.BETTER_AUTH_SECRET,
  baseURL: apiEnv.BETTER_AUTH_URL,
  socialProviders: {
    github: {
      clientId: apiEnv.GITHUB_CLIENT_ID,
      clientSecret: apiEnv.GITHUB_CLIENT_SECRET,
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    }
  }
});

export type AuthSession = typeof auth.$Infer.Session;
