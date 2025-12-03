"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { RiPinterestFill as Pinterest } from "react-icons/ri";
import Link from "next/link";

export default function Footer() {
  const router = useRouter();
  const image_path = "/assets/logo/logo-silver.webp";

  const navSections = [
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
        ["Brand Shoots", "/styles/brands?service=brand-shoots"],
        ["Concept Development", "/styles/brands?service=concept-development"],
        ["Visual Merchandising", "/styles/brands?service=visual-merchandising"],
      ],
    },
    {
      title: "People",
      items: [
        ["Occasion Styling", "/styles/people?service=occasion-styling"],
        ["Personal Shopper", "/styles/people?service=personal-shopping"],
        ["Style Drop", "/styles/people?service=style-drop"],
        ["Wardrobe Detox", "/styles/people?service=wardrobe-detox"],
      ],
    },
    {
      title: "Spaces",
      items: [
        ["Space Edit", "/styles/spaces?service=space-edit"],
        ["Brand Spaces", "/styles/spaces?service=brand-spaces"],
        ["Makeovers", "/styles/spaces?service=makeover-projects"],
      ],
    },
  ];

  return (
    <footer className="w-full text-foreground border-t-2 border-primary/10 mt-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-12 sm:py-16 lg:py-20">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-6 lg:mb-8">
          {/* Brand section */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="mb-2 lg:mb-0">
              <Image
                src={image_path}
                alt="Wear it Wrong"
                width={160}
                height={75}
                className="object-contain"
              />
            </div>
          </div>

          {/* Navigation columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {navSections.map((section) => (
              <div key={section.title} className="flex flex-col space-y-3">
                <h5 className="text-sm sm:text-md font-atbserif uppercase tracking-widest text-primary font-semibold pb-2 border-b border-border">
                  {section.title}
                </h5>
                <nav className="flex flex-col gap-2.5">
                  {section.items.map(([label, link]) => (
                    <button
                      key={label}
                      onClick={() => router.push(link)}
                      className="font-badtyp group text-xs text-foreground/70 hover:text-primary text-left transition-all duration-200 flex items-center gap-1"
                    >
                      <span className="relative">
                        {label}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
                      </span>
                      <ArrowUpRight
                        size={10}
                        className="opacity-0 group-hover:opacity-100 transition-opacity -translate-y-px shrink-0"
                      />
                    </button>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar with contact and copyright - single row layout on md+ */}
        <div className="pt-6 sm:pt-8 lg:pt-10 border-t border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Social links (left) */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Link
                href="https://www.instagram.com/p/DQ6r0p-ErDt/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="group relative p-2.5 sm:p-3 bg-card rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <Instagram
                  size={18}
                  className="text-foreground group-hover:text-primary transition-colors"
                />
              </Link>
              <Link
                href="https://www.pinterest.com/geeedeeee_/?invite_code=609a825935244f2f99fe805ea9bc71f6&sender=234187386781752997"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
                className="group relative p-2.5 sm:p-3 bg-card rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <Pinterest
                  size={18}
                  className="text-foreground group-hover:text-primary transition-colors"
                />
              </Link>

              <Link
                href="mailto:hello@wearitwrong.com"
                aria-label="Email"
                className="group relative p-2.5 sm:p-3 bg-card rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <Mail
                  size={18}
                  className="text-foreground group-hover:text-primary transition-colors"
                />
              </Link>
            </div>

            {/* Contact info (center) */}
            <div className="flex items-center gap-8">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-atbserif">
                  Email
                </span>
                <a
                  className="text-xs sm:text-sm text-foreground hover:text-primary transition-colors font-medium"
                  href="mailto:hello@wearitwrong.com"
                >
                  hello@wearitwrong.com
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-atbserif">
                  Phone
                </span>
                <a
                  className="text-xs sm:text-sm text-foreground hover:text-primary transition-colors font-medium"
                  href="tel:+1234567890"
                >
                  +91 98550 45999
                </a>
              </div>
            </div>

            {/* Copyright (right) */}
            <div className="text-xs sm:text-sm text-muted-foreground text-left sm:text-right">
              <div className="font-atbserif">
                © {new Date().getFullYear()} Wear it Wrong
              </div>
              <div className="mt-0.5">All rights reserved.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-primary via-primary/50 to-primary"></div>
    </footer>
  );
}
