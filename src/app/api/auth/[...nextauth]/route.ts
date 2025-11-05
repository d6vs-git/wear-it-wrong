import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/calendar.events",
        },
      },
    }),
  ],
  // Use a secret for signing/encrypting JWT/cookies in production
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // "jwt" (no DB) or "database" (with adapter like Prisma)
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist access and refresh tokens if present
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        // expires_at is seconds from now
        const expiresIn = (account as any).expires_in ? Number((account as any).expires_in) : 3600;
        token.expiresAt = Math.floor(Date.now() / 1000) + expiresIn;
      }

      // Refresh token if expired and refresh token available
      const now = Math.floor(Date.now() / 1000);
      if (token.expiresAt && now >= (token.expiresAt as number) - 60 && token.refreshToken) {
        try {
          const res = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID!,
              client_secret: process.env.GOOGLE_CLIENT_SECRET!,
              refresh_token: String(token.refreshToken),
              grant_type: "refresh_token",
            }).toString(),
          });
          const data = await res.json();
          if (!res.ok) throw new Error(JSON.stringify(data));
          token.accessToken = data.access_token;
          token.expiresAt = Math.floor(Date.now() / 1000) + Number(data.expires_in || 3600);
        } catch (e) {
          // If refresh fails, clear tokens to force re-auth
          delete token.accessToken;
          delete token.refreshToken;
          delete token.expiresAt;
        }
      }

      return token as any;
    },
    async session({ session, token }) {
      // Expose tokens to the client session object sparsely
      (session as any).accessToken = token.accessToken;
      (session as any).expiresAt = token.expiresAt;
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      if (!user?.email) return;
      await prisma.user.upsert({
        where: { email: user.email },
        update: { name: user.name ?? undefined, image: user.image ?? undefined },
        create: { email: user.email, name: user.name ?? undefined, image: user.image ?? undefined },
      });
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };