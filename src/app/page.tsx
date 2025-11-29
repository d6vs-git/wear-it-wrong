"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Hero from "@/components/home/hero";
import Banner from "@/components/home/banner";

export default function Home() {
  const { status } = useSession();
  // Initialize state to false to avoid hydration mismatch
  const [showBanner, setShowBanner] = useState(false);
  const hasCheckedBanner = useRef(false);

  // Check sessionStorage only on client-side after mount
  useEffect(() => {
    // Only check sessionStorage for unauthenticated users
    if (status === "unauthenticated" && !hasCheckedBanner.current) {
      hasCheckedBanner.current = true;
      const hasSeenBanner = sessionStorage.getItem("bannerShown");
      if (!hasSeenBanner) {
        // Use setTimeout to avoid setState in effect warning
        setTimeout(() => setShowBanner(true), 0);
      }
    }
  }, [status]);

  const handleCloseBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem("bannerShown", "true");
  };

  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      {showBanner && <Banner onClose={handleCloseBanner} />}
      <Hero />

    </main>
  );
}
