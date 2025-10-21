import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 dark:border-gray-800">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            {SITE_CONFIG.socialLinks.github && (
              <Link href={SITE_CONFIG.socialLinks.github} className="hover:underline" target="_blank">GitHub</Link>
            )}
            {SITE_CONFIG.socialLinks.linkedin && (
              <Link href={SITE_CONFIG.socialLinks.linkedin} className="hover:underline" target="_blank">LinkedIn</Link>
            )}
            {SITE_CONFIG.socialLinks.twitter && (
              <Link href={SITE_CONFIG.socialLinks.twitter} className="hover:underline" target="_blank">Twitter</Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
