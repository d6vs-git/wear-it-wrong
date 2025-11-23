"use client"

import UnifiedServicesSection from "@/components/styles/all-services-overview";
export default function ServicesPage() {
const handleBadgeClick = (service: string) => {
    console.log("Selected service:", service);
    // copy or move your original handleBadgeClick logic here 
  };

  return (
    <main>
      <UnifiedServicesSection onBadgeClick={handleBadgeClick} />
    </main>
  );
}