"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const router = useRouter();
  const image_path = "/assets/logo/logo-silver.png";

  return (
    <footer className="w-full  border-t border-black mt-16">
      <div className="max-w-[1200px] mx-auto px-6 py-14">

        {/* FLEXIBLE, ALIGNED GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-12 items-start">

          {/* LOGO + SOCIAL */}
          <div className="flex flex-col items-start gap-6">
            <Image
              src={image_path}
              alt="logo"
              width={120}
              height={80}
              className="object-contain"
            />
          </div>

          {/* ABOUT */}
          <nav className="flex flex-col gap-2 text-sm">
            <h6 className="text-sm font-semibold uppercase tracking-wide text-black/80">
              About
            </h6>

            {[
              ["About", "/about"],
              ["All Services", "/services"],
              ["Testimonials", "/testimonials"],
              ["Privacy Policy", "/privacy"],
              ["Terms & Conditions", "/terms"],
            ].map(([label, link]) => (
              <button
                key={label}
                onClick={() => router.push(link)}
                className="text-black/70 hover:text-black hover:underline underline-offset-4 text-left transition"
              >
                {label}
              </button>
            ))}
          </nav>

            {/* BRANDS */}
          <nav className="flex flex-col gap-2 text-sm">
            <h6 className="text-sm font-semibold uppercase tracking-wide text-black/80">
              BRANDS
            </h6>

            {[
              ["brand-shoots", "/about"],
              ["concept-development", "/services"],
              ["visual-merchandising", "/testimonials"],
            ].map(([label, link]) => (
              <button
                key={label}
                onClick={() => router.push(link)}
                className="text-black/70 hover:text-black hover:underline underline-offset-4 text-left transition"
              >
                {label}
              </button>
            ))}
          </nav>
          {/* PEOPLE */}
          <nav className="flex flex-col gap-2 text-sm">
            <h6 className="text-sm font-semibold uppercase tracking-wide text-black/80">
              PEOPLE
            </h6>

            {[
              ["occasion-styling", "/about"],
              ["personal-shopping", "/services"],
              ["style-drop", "/testimonials"],
              ["wardrobe-detox", "/testimonials"],
            ].map(([label, link]) => (
              <button
                key={label}
                onClick={() => router.push(link)}
                className="text-black/70 hover:text-black hover:underline underline-offset-4 text-left transition"
              >
                {label}
              </button>
            ))}
          </nav>
          {/* SPACES */}
            <nav className="flex flex-col gap-2 text-sm">
            <h6 className="text-sm font-semibold uppercase tracking-wide text-black/80">
              SPACES           </h6>

            {[
              ["space-edit", "/about"],
              ["Brand-spaces", "/services"],
              ["Makeover-proejects", "/testimonials"],
             
            ].map(([label, link]) => (
              <button
                key={label}
                onClick={() => router.push(link)}
                className="text-black/70 hover:text-black hover:underline underline-offset-4 text-left transition"
              >
                {label}
              </button>
            ))}
          </nav>

        </div>
      </div>
    </footer>
  );
}
