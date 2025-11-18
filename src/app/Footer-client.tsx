"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";

// Exact pages where footer should NOT appear (no trailing slashes)
const noFooterRoutesRaw = [
  "/",
  "/styles",
  "/styles/brands",
  "/styles/people",
  "/styles/spaces",
];

// normalize: remove trailing slash except keep "/" as-is
const normalize = (p: string) => {
  if (!p) return "/";
  if (p === "/") return "/";
  return p.endsWith("/") ? p.slice(0, -1) : p;
};

const noFooterRoutes = noFooterRoutesRaw.map(normalize);

export default function FooterClient() {
  const pathnameRaw = usePathname() || "/";
  const pathname = normalize(pathnameRaw);

  // hide only if pathname equals one of the entries exactly
  const hideFooter = noFooterRoutes.includes(pathname);

  if (hideFooter) return null;

  return <Footer />;
}
