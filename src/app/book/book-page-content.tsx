"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

// Single Calendly URL for all bookings
const DEFAULT_CALENDLY = "https://calendly.com/dhawangouri/30min?background_color=fdfef3";

export default function BookPageContent() {
  const searchParams = useSearchParams();
  const session = searchParams.get("session") || "concept-development";
  const month = searchParams.get("month") || undefined;

  // Build final Calendly URL (append month with '&' because URL already has '?')
  const calendlyUrl = month
    ? `${DEFAULT_CALENDLY}&month=${encodeURIComponent(month)}`
    : DEFAULT_CALENDLY;

  useEffect(() => {
    // Load Calendly script once
    if (
      !document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      )
    ) {
      const script = document.createElement("script");
      script.src =
        "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <main className="min-h-screen w-full bg-background text-foreground flex flex-col items-center pt-24 px-4">
      <h1 className="font-badtyp text-3xl md:text-5xl mb-6 tracking-tight">
        Book A Session
      </h1>

      <p className="mb-8 text-center max-w-xl text-sm md:text-base opacity-80">
        You are booking:{" "}
        <span className="font-semibold">
          {session.replace(/-/g, " ")}
        </span>
        {month ? ` (Month: ${month})` : ""}. If this is incorrect, go back and
        choose the right service.
      </p>

      <div className="w-full max-w-5xl mb-4">
        <div
          className="calendly-inline-widget rounded-md shadow-sm border border-neutral-300"
          data-url={calendlyUrl}
          style={{ minWidth: 320, height: 700 }}
        />
      </div>
    </main>
  );
}
