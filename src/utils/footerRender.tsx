"use client";

import { useSearchParams } from "next/navigation";
import Footer from "@/components/ui/footer";

export default function FooterRender() {
  const params = useSearchParams();
  const hasParams = params.toString().length > 0;

    return hasParams ? <Footer /> : null;
}
