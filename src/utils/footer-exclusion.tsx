"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";

export default function FooterExclusion() {
  const pathname = usePathname();
  if (!pathname || pathname === "/"||pathname==="/about"||pathname==="/book"||pathname==="/styles"||pathname==="/styles/people"||pathname==="/styles/space"||pathname==="/styles/brands" ) return null;
  return <Footer />;
}
