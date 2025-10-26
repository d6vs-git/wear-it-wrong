"use client";

import { useState } from "react";
import BrandSection from "@/components/brands-section";
import VisualMerchandising from "@/components/brand-components/visual-merchandising";
import ConceptDevelopment from "@/components/brand-components/concept-development";
import BrandShoots from "@/components/brand-components/brand-shoots";

export default function BrandsPage() {
  const [activeService, setActiveService] = useState<string | null>(null);

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
        return <BrandSection onBadgeClick={setActiveService} />;
    }
  };

  return (
    <>
      {renderServiceComponent()}
    </>
  );
}
