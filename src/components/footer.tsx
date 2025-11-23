"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";

export default function Footer({
  iconOffsetX = 30,
  iconOffsetY = -20,
  instaX = 0,
  instaY = 0,
  linkedinX = 0,
  linkedinY = 0,
}: {
  iconOffsetX?: number;
  iconOffsetY?: number;
  instaX?: number;
  instaY?: number;
  linkedinX?: number;
  linkedinY?: number;
} = {}) {
  const router = useRouter();
  const image_path = "/assets/logo/logo-silver.webp";

  return (
    <footer className="w-full border-t border-black/10 mt-20 ">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-14 sm:py-16">
        
        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-x-12 gap-y-12">

          {/* LOGO */}
          <div className="flex flex-col items-start">
            <Image
              src={image_path}
              alt="Wear it Wrong logo"
              width={140}
              height={100}
              className="object-contain mb-3"
            />
            {/* Social Icons */}
            <div
              className="flex flex-row items-center gap-3 pl-1"
              style={{ position: "relative", left: iconOffsetX, top: iconOffsetY }}
            >
              <a
                href="https://instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition-transform hover:scale-110"
                style={{ position: "relative", left: instaX, top: instaY }}
              >
                <Instagram size={22} />
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="transition-transform hover:scale-110"
                style={{ position: "relative", left: linkedinX, top: linkedinY }}
              >
                <Linkedin size={22} />
              </a>
            </div>
          </div>

          {/* SECTIONS */}
          {[
            {
              title: "About",
              items: [
                ["About", "/about"],
                ["All Services", "/services"],
                ["Testimonials", "/testimonials"],
                ["Privacy Policy", "/privacy"],
                ["Terms & Conditions", "/terms"],
              ],
            },
            {
              title: "Brands",
              items: [
                ["brand-shoots", "/brand-shoots"],
                ["concept-development", "/concept-development"],
                ["visual-merchandising", "/visual-merchandising"],
              ],
            },
            {
              title: "People",
              items: [
                ["occasion-styling", "/occasion-styling"],
                ["personal-shopping", "/personal-shopping"],
                ["style-drop", "/style-drop"],
                ["wardrobe-detox", "/wardrobe-detox"],
              ],
            },
            {
              title: "Spaces",
              items: [
                ["space-edit", "/space-edit"],
                ["Brand-spaces", "/brand-spaces"],
                ["Makeover-projects", "/makeover-projects"],
              ],
            },
          ].map((section) => (
            <nav key={section.title} className="flex flex-col gap-3">
              <h6 className="text-xs font-bold uppercase tracking-wider text-black mb-1">
                {section.title}
              </h6>

              <div className="flex flex-col gap-2">
                {section.items.map(([label, link]) => (
                  <button
                    key={label}
                    onClick={() => router.push(link)}
                    className="text-sm text-black/60 hover:text-black text-left transition-colors duration-200 active:scale-[0.98]"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </nav>
          ))}
        </div>       
      </div>
    </footer>
  );
}
