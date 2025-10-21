import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export function absoluteUrl(path = ""): string {
  const base = SITE_CONFIG.siteUrl.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function buildOgImage(path = SITE_CONFIG.ogImage): string {
  return path.startsWith("http") ? path : absoluteUrl(path);
}

export function baseMetadata(overrides?: Partial<Metadata>): Metadata {
  const titleTemplate = `%s | ${SITE_CONFIG.siteName}`;
  const metadata: Metadata = {
    title: {
      default: SITE_CONFIG.siteName,
      template: titleTemplate,
    },
    description: SITE_CONFIG.siteDescription,
    keywords: SITE_CONFIG.keywords.join(", "),
    authors: [{ name: SITE_CONFIG.name }],
    creator: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.siteUrl),
    openGraph: {
      type: "website",
      url: SITE_CONFIG.siteUrl,
      siteName: SITE_CONFIG.siteName,
      title: SITE_CONFIG.siteName,
      description: SITE_CONFIG.siteDescription,
      images: [
        {
          url: buildOgImage(),
          width: 1200,
          height: 630,
          alt: SITE_CONFIG.siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_CONFIG.siteName,
      description: SITE_CONFIG.siteDescription,
      images: [buildOgImage()],
      creator: SITE_CONFIG.socialLinks.twitter
        ? `@${SITE_CONFIG.socialLinks.twitter.split("/").pop()}`
        : undefined,
    },
    alternates: {
      canonical: SITE_CONFIG.siteUrl,
    },
  };
  return { ...metadata, ...overrides };
}
