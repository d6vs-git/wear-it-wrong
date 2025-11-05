import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// Helper: exchange refresh token for access token
async function getAccessToken() {
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN; // host refresh token (recommended)

  if (refreshToken) {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: "refresh_token",
      }).toString(),
    });

    if (!tokenRes.ok) {
      const err = await tokenRes.text();
      throw new Error(`Failed to refresh Google token: ${tokenRes.status} ${err}`);
    }
    const json = await tokenRes.json();
    return json.access_token as string;
  }

  // Fallback to NextAuth session token if present (requires host to be signed in)
  const session = await getServerSession(authOptions as any);
  const token = (session as any)?.accessToken as string | undefined;
  if (!token) {
    throw new Error("No Google access token. Set GOOGLE_REFRESH_TOKEN or sign in as host.");
  }
  return token;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, dateTime, timeZone } = body || {};

    if (!name || !email || !phone || !dateTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Parse date; dateTime from <input type="datetime-local"> is local; include timezone
    const start = new Date(dateTime);
    if (isNaN(start.getTime())) {
      return NextResponse.json({ error: "Invalid dateTime" }, { status: 400 });
    }
    const end = new Date(start.getTime() + 30 * 60 * 1000);

    const tz = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

    const hostEmail = process.env.HOST_EMAIL || undefined;
    const attendees = [{ email }, ...(hostEmail ? [{ email: hostEmail }] : [])];

    const accessToken = await getAccessToken();

    // Brand name for event title (configurable via env, defaults to Wear It Wrong)
    const brand = process.env.BRAND_NAME || "Wear It Wrong";

    const eventPayload = {
      summary: `Consultation with ${brand}`,
      description: `Scheduled meeting with ${name}. Contact: ${phone}.`,
      start: { dateTime: start.toISOString(), timeZone: tz },
      end: { dateTime: end.toISOString(), timeZone: tz },
      attendees,
      conferenceData: {
        createRequest: {
          requestId: randomUUID(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
      reminders: { useDefault: true },
    };

    const calendarId = process.env.HOST_CALENDAR_ID || "primary";

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      calendarId
    )}/events?conferenceDataVersion=1&sendUpdates=all`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventPayload),
    });

    const data = await res.json();

    if (!res.ok) {
      const status = res.status === 409 ? 409 : 400;
      return NextResponse.json({ error: data.error || data }, { status });
    }

    const meetLink = data?.hangoutLink || data?.conferenceData?.entryPoints?.find((e: any) => e.entryPointType === "video")?.uri;

    // Persist meeting in DB
    const session = (await getServerSession(authOptions as any)) as Session | null;
    const userEmail = (session?.user?.email as string | undefined) || email; // fallback to attendee email

    // Ensure user record exists
    const user = await prisma.user.upsert({
      where: { email: userEmail },
      update: { name: session?.user?.name || name, image: session?.user?.image || undefined },
      create: { email: userEmail, name: session?.user?.name || name, image: session?.user?.image || undefined },
    });

    await prisma.meeting.create({
      data: {
        title: `Consultation with ${process.env.BRAND_NAME || "Wear It Wrong"}`,
        startTime: new Date(start.toISOString()),
        endTime: new Date(end.toISOString()),
        googleEventId: data.id,
        meetLink: meetLink || null,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, eventId: data.id, htmlLink: data.htmlLink, meetLink });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Internal error" }, { status: 500 });
  }
}
