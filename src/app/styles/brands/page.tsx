"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import BrandSection from "@/components/styles/brands-section";
import VisualMerchandising from "@/components/brand-components/visual-merchandising";
import ConceptDevelopment from "@/components/brand-components/concept-development";
import BrandShoots from "@/components/brand-components/brand-shoots";
import TimedAudio from "@/components/audio/timed-audio";

function BrandsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeService = searchParams.get("service");

  const handleServiceChange = (service: string) => {
    router.push(`/styles/brands?service=${service}`, { scroll: false });
  };

  // Render the selected service component
  const renderServiceComponent = () => {
    switch (activeService) {
      case "visual-merchandising":
        return <VisualMerchandising />;
      case "concept-development":
        return <ConceptDevelopment />;
      case "brand-shoots":
        return <BrandShoots />;
      default:
        return <BrandSection onBadgeClick={handleServiceChange} />;
    }
  };

  return (
    <>
      {/* Global background audio for Brands (always on) */}
      <TimedAudio
        src="/assets/sounds/page8/Weekend_privlages.mp3"
        start={0}
        volume={0.25}
        fixed
        loop
      
      />
      {renderServiceComponent()}
    </>
  );
}

export default function BrandsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-landing" />}>
      <BrandsContent />
    </Suspense>
  );
}
