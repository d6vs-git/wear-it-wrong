# Portfolio (Next.js App Router, Static, SEO-Optimized)

High-performance, fully static portfolio built with Next.js 14+, TypeScript, and Tailwind CSS.

## Commands
- Development: `npm run dev`
- Build: `npm run build`
- Start (preview production): `npm run start`

## Structure
- `src/lib/constants.ts`: Single source of truth (site name, url, bio, social links, defaults).
- `src/lib/metadata.ts`: Static metadata builder with `metadataBase`, Open Graph, and Twitter card.
- `src/app/layout.tsx`: Static metadata export, forced static rendering, global Header/Footer, page transitions.
- `src/app/sitemap.ts`, `src/app/robots.ts`: Static SEO files.
- `src/lib/projects.data.ts` and `src/app/projects/[id]/page.tsx`: Static project pages with per-page metadata.

## Why this is SEO-optimized
- Fully static rendering: `export const dynamic = 'force-static'` and `generateStaticParams` ensure pages are pre-rendered, cacheable, and fast (better LCP and crawlability).
- Canonical, absolute metadata: `metadataBase` and absolute Open Graph/Twitter images prevent broken previews; consistent titles and descriptions from `SITE_CONFIG`.
- Sitemaps and robots: `app/sitemap.ts` and `app/robots.ts` help crawlers discover and index content.
- Clean URL structure: `/`, `/about`, `/projects`, `/contact`, `/projects/[id]`.
- Performance-focused UI: Server Components by default, client boundary only for page transitions (no SEO impact).
- Accessible, semantic markup and optimized fonts.

## Teach me: Key Next.js SEO concepts
- Static vs dynamic rendering: Prefer static for marketing/portfolio content. It ships HTML that bots can index immediately.
- metadata.ts vs static metadata: Export a static `metadata` in layout for global defaults; use `generateMetadata` in routes that need per-page dynamic values (still static when data is local at build time).
- metadataBase: Set to your domain to generate absolute URLs for OG/Twitter images and canonical URLs.
- Sitemaps/robots: Add them as file conventions in `app/` for correct URLs (`/sitemap.xml`, `/robots.txt`).
- Open Graph/Twitter: Always use absolute image URLs; ensure `summary_large_image` for better previews.

## Customize
- Update placeholders in `src/lib/constants.ts` (name, job title, bio, siteUrl, socials, email, ogImage).
- Replace demo images under `public/` or switch to external image URLs.

## References
- Next.js Metadata (App Router): https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- Sitemaps/Robots: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap and https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Static Rendering: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic-rendering
