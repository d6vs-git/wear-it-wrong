import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ user, account, profile, email }) {
      console.log("Sign-in attempt:", { user, account, profile, email });
      if (account?.provider === "google") {
        try {
          const existingUser = await db.query.users.findFirst({
            where: eq(users.email, user.email!),
          });

          if (!existingUser) {
            await db.insert(users).values({
              email: user.email!,
              username: user.name!,
            });
          }
          return true;
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
