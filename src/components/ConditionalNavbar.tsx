"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Don't show navbar on home page
  if (pathname === "/") {
    return null;
  }
  
  return <Navbar />;
}
