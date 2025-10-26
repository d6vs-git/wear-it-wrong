"use client";

import { useState } from "react";
import PeopleSection from "@/components/people-section";
import PersonalShopping from "@/components/people-components/personal-shopping";
import OccasionStyling from "@/components/people-components/occasion-styling";
import StyleDrop from "@/components/people-components/style-drop";
import WardrobeDetox from "@/components/people-components/wardrobe-detox";

export default function PeoplePage() {
  const [activeService, setActiveService] = useState<string | null>(null);

  // Render the selected service component
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
          <div className="min-h-screen bg-landing flex items-center justify-center">
            <h1 className="text-4xl font-bold font-badtyp text-primary">Package and Offers - Coming Soon</h1>
          </div>
        );
      default:
        return <PeopleSection onBadgeClick={setActiveService} />;
    }
  };

  
  return (
    <>
      {renderServiceComponent()}
    </>
  );
}
