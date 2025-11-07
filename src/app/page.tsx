"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Hero from "../components/home/hero";
import About from "../components/home/about";
import Navbar from "@/components/landing-navbar";
import Banner from "@/components/home/banner";
import UnifiedServicesSection from "@/components/styles/brand-overview";

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

  const handleBadgeClick = (service: string) => {
    console.log("Selected service:", service);
    // Add your logic here - navigate to service page, show modal, etc.
  };

  return (
    <main className="bg-background text-foreground overflow-x-hidden">
      {showBanner && <Banner onClose={handleCloseBanner} />}
      <Navbar />
      
      <div className="snap-y snap-mandatory">
        <Hero />
        <About />
        <UnifiedServicesSection onBadgeClick={handleBadgeClick} />
      </div>
    </main>
  );
}
