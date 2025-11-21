"use client";

import { useSearchParams } from "next/navigation";
import Footer from "@/components/footer";

export default function FooterClient() {
  const params = useSearchParams();
  const hasParams = params.toString().length > 0;

  return hasParams ? <Footer /> : null;
}
