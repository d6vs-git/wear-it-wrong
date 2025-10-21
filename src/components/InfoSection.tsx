"use client";
import Image from "next/image";
import logo from "@/assests/styleSection/Icon/Logo.webp";

export default function InfoSection() {
  // Ensure we never upscale beyond the intrinsic image size
  const logoWidth = (logo as any)?.width ?? 1200;
  const logoHeight = (logo as any)?.height ?? 600;

  return (
    <section className="relative w-full overflow-hidden bg-[#FBF9D1] py-12 md:py-14 px-6 text-[#0A0A0A]">
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Tagline */}
        <p className="text-[#C1856D] text-lg md:text-xl font-semibold tracking-wide mb-1">
          We ‘r
        </p>

        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="w-full" style={{ maxWidth: logoWidth }}>
            <Image
              src={logo}
              alt="Wear it Wrong logo"
              width={logoWidth}
              height={logoHeight}
              sizes={`(min-width: 1280px) ${logoWidth}px, 92vw`}
              className="w-full h-auto select-none"
              priority
              fetchPriority="high"
              placeholder="blur"
            />
          </div>
        </div>

        {/* Paragraphs */}
        <div className="mt-1 text-[16px] md:text-[18px] leading-[1.8] md:leading-[1.95] font-normal tracking-[0.01em] space-y-5">
          <p>
            <strong>Wear It Wrong</strong> is a creative styling studio that helps
            people, brands, and spaces find their expression and look good doing it.
            Founded by stylist Gouri Dhawan, the studio works across personal,
            commercial, and interior styling—from building wardrobes that make sense
            to designing brand shoots and reimagining spaces.
          </p>

          <p>
            The idea is simple: style isn’t about perfection or trends; it’s about
            creating things that feel right for who you are, what you do, and how you
            live. Whether it’s your clothes, your brand, or your space, we help you
            wear it wrong—beautifully.
          </p>
        </div>
      </div>
    </section>
  );
}
