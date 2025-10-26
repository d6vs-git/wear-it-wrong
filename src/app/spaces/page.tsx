"use client";

import { useState } from "react";
import SpaceSection from "@/components/space-section";
import SpaceEdit from "@/components/space-components/space-edit";
import BrandSpaces from "@/components/space-components/brand-spaces";
import MakeoverProject from "@/components/space-components/makeover-project";

export default function SpacesPage() {
  const [activeService, setActiveService] = useState<string | null>(null);

  // Render the selected service component
  const renderServiceComponent = () => {
    switch (activeService) {
      case "space-edit":
        return <SpaceEdit />;
      case "brand-spaces":
        return <BrandSpaces />;
      case "makeover-projects":
        return <MakeoverProject />;
      default:
        return <SpaceSection onBadgeClick={setActiveService} />;
    }
  };

  return (
    <>
      {renderServiceComponent()}
    </>
  );
}
