"use client";

import { useSearchParams } from "next/navigation";
import Footer from "@/components/footer";

export default function FooterClient() {
  const params = useSearchParams();

  // hide footer when no query params


   return params.toString() && <Footer /> ;
}
