"use client";

import { useState, useEffect } from "react";
import Hero from "../components/home/hero";
import About from "../components/home/about";
import Testimonials from "../components/home/testimonials";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Banner from "@/components/home/banner";
import UnifiedServicesSection from "@/components/styles/brand-overview";

export default function Home() {
  const [showBanner, setShowBanner] = useState(false);

  // Show banner after component mounts (to avoid hydration mismatch)
  useEffect(() => {
    // Check if the banner was already shown in this session
    const wasShown = sessionStorage.getItem("bannerShown");
    if (!wasShown) {
      setShowBanner(true);
      sessionStorage.setItem("bannerShown", "true");
    }
  }, []);

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  const handleBadgeClick = (service: string) => {
    console.log("Selected service:", service);
    // Add your logic here - navigate to service page, show modal, etc.
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      {showBanner && <Banner onClose={handleCloseBanner} />}
      <Hero />
      <About />
      <UnifiedServicesSection onBadgeClick={handleBadgeClick} />
      {/* <Testimonials /> */}
      {/* <Footer /> */}
    </main>
  );
}
