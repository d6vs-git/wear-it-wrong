"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import SpaceSection from "@/components/styles/space-section";
import SpaceEdit from "@/components/space-components/space-edit";
import BrandSpaces from "@/components/space-components/brand-spaces";
import MakeoverProject from "@/components/space-components/makeover-project";

function SpacesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeService = searchParams.get("service");

  const handleServiceChange = (service: string) => {
    router.push(`/styles/spaces?service=${service}`, { scroll: false });
  };

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
        return <SpaceSection onBadgeClick={handleServiceChange} />;
    }
  };

  return (
    <>
      {renderServiceComponent()}
    </>
  );
}

export default function SpacesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-landing" />}>
      <SpacesContent />
    </Suspense>
  );
}
