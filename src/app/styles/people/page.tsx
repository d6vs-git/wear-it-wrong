"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import PeopleSection from "@/components/styles/people-section";
import PersonalShopping from "@/components/people-components/personal-shopping";
import OccasionStyling from "@/components/people-components/occasion-styling";
import StyleDrop from "@/components/people-components/style-drop";
import WardrobeDetox from "@/components/people-components/wardrobe-detox";
// TimedAudio not required in this page (removed unused import)

function PeopleContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeService = searchParams.get("service");

  const handleServiceChange = (service: string) => {
    router.push(`/styles/people?service=${service}`, { scroll: false });
  };

  const renderServiceComponent = () => {
    switch (activeService) {
      case "personal-shopping":
        return <PersonalShopping />;
      case "occasion-styling":
        return <OccasionStyling />;
      case "style-drop":
        return <StyleDrop />;
      case "wardrobe-detox":
        return <WardrobeDetox />;
      case "package-offers":
        return (
          <div className="min-h-screen bg-landing flex items-center justify-center px-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold font-badtyp text-primary leading-snug">
              Package and Offers — Coming Soon
            </h1>
          </div>
        );
      default:
        return <PeopleSection onBadgeClick={handleServiceChange} />;
    }
  };

  return (
    <>
      {/* Background audio only on the main collage (no active service) */}
     
      {renderServiceComponent()}
    </>
  );
}

export default function PeoplePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-landing" />}>
      <PeopleContent />
    </Suspense>
  );
}
