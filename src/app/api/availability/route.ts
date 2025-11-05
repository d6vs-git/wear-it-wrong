import { NextResponse } from "next/server";
import { parse, add, isBefore, isAfter } from "date-fns";
import { fromZonedTime, formatInTimeZone } from "date-fns-tz";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Reuse the same token strategy as /api/book
async function getAccessToken() {
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN; // optional; recommended in prod

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

  const session = await getServerSession(authOptions as any);
  const token = (session as any)?.accessToken as string | undefined;
  if (!token) throw new Error("No Google access token. Set GOOGLE_REFRESH_TOKEN or sign in as host.");
  return token;
}

const AVAILABLE_SLOTS = ["08:00", "08:20", "08:40", "09:00", "09:20", "09:40"]; // CET demo slots

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const yyyymmdd = searchParams.get("date");
    if (!yyyymmdd) return NextResponse.json({ error: "Missing date" }, { status: 400 });

    const dayDate = parse(yyyymmdd, "yyyyMMdd", new Date());

    const accessToken = await getAccessToken();
    const calendarId = process.env.HOST_CALENDAR_ID || "primary";

    // List existing events for the day
    const timeMin = new Date(dayDate);
    const timeMax = add(dayDate, { days: 1 });

    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`);
    url.searchParams.set("timeMin", timeMin.toISOString());
    url.searchParams.set("timeMax", timeMax.toISOString());
    url.searchParams.set("singleEvents", "true");
    url.searchParams.set("orderBy", "startTime");

    const res = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) {
      const err = await res.text();
      return NextResponse.json({ error: err }, { status: res.status });
    }
    const json = await res.json();
    const events: any[] = json?.items || [];

    // Build candidate slots in Europe/Paris (CET) and convert to UTC Dates
    const dateSlots = AVAILABLE_SLOTS.map((slot) => {
      const base = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate(), +slot.slice(0, 2), +slot.slice(3, 5));
      return fromZonedTime(base, "Europe/Paris");
    });

    const available = dateSlots.filter((slot) => {
      const slotEnd = add(slot, { minutes: 20 });
      const hasConflict = events.some((event) => {
        const eventStart = event.start?.dateTime ? new Date(event.start.dateTime) : undefined;
        const eventEnd = event.end?.dateTime ? new Date(event.end.dateTime) : undefined;
        if (!eventStart || !eventEnd) return false;
        return isBefore(slot, eventEnd) && isAfter(slotEnd, eventStart);
      });
      return !hasConflict;
    });

    // Return times formatted in CET HH:mm
    const result = available.map((slot) => formatInTimeZone(slot, "Europe/Paris", "HH:mm"));
    return NextResponse.json({ slots: result });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Internal error" }, { status: 500 });
  }
}
