"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const floatingImages = [
    {
      src: "/assets/images/about/safety-pin-1.png",
      alt: "safety pin 1",
      top: { mobile: "0%", desktop: "0rem" },
      right: { mobile: "8%", desktop: "-65rem" },
      width: { mobile: "45px", desktop: "80px" },
      height: { mobile: "18px", desktop: "30px" },
    },
    {
      src: "/assets/images/about/safety-pin-2.png",
      alt: "safety pin 2",
      top: { mobile: "5%", desktop: "-1rem" },
      right: { mobile: "12%", desktop: "-65rem" },
      width: { mobile: "45px", desktop: "80px" },
      height: { mobile: "18px", desktop: "30px" },
      translateY: "10%",
    },
    {
      src: "/assets/images/about/dior.png",
      alt: "dior logo",
      top: { mobile: "10%", desktop: "1rem" },
      right: { mobile: "10%", desktop: "-64rem" },
      width: { mobile: "45px", desktop: "80px" },
      height: { mobile: "18px", desktop: "30px" },
      translateY: "20%",
    },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-28 lg:py-32 touch-manipulation overflow-x-hidden w-full bg-background">
      <div className="relative max-w-4xl lg:max-w-5xl xl:max-w-6xl w-full overflow-visible">
        {/* Floating decorative images - visible only on mobile/tablet (up to lg) */}
        <div className="absolute -top-2 sm:-top-4 right-0 pointer-events-none lg:hidden z-10">
          {floatingImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
              className="absolute"
              style={{
                top: img.top.mobile,
                right: img.right.mobile,
                width: img.width.mobile,
                height: img.height.mobile,
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={45}
                height={18}
                className="object-contain w-full h-full opacity-70 sm:opacity-80"
              />
            </motion.div>
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-abovebeyond text-[#a4463a] text-center 
             text-[1.75rem] xs:text-[2.25rem] sm:text-[3rem] 
             md:text-[4rem] lg:text-[5rem] xl:text-[6rem]
             leading-[0.95] tracking-tight mb-10 sm:mb-14 md:mb-16 lg:mb-20 whitespace-nowrap"
        >
          About{" "}
          <span
            className="relative inline-block"
            style={{
              textDecoration: "underline dotted #a4463a",
              textDecorationThickness: "2px",
              textUnderlineOffset: "0.15em",
            }}
          >
            WearItWrong
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="font-futura"
        >
          <div className="space-y-6 sm:space-y-7 md:space-y-8 text-[#8b4535] leading-[1.8] sm:leading-[1.85] md:leading-[1.9] text-base sm:text-lg md:text-xl lg:text-[1.35rem] relative">
            <p className="font-medium">
              Wear It Wrong is a creative styling studio that helps people,
              brands, and spaces find their expression and look good doing it.
            </p>

            <p className="relative font-normal">
              Founded by stylist{" "}
              <span
                className="font-medium"
                style={{
                  textUnderlineOffset: "3px",
                }}
              >
                Gouri Dhawan
              </span>
              , the studio works across personal, commercial, and interior
              styling; from building wardrobes that make sense to designing
              brand{" "}
              <span className="relative inline-block whitespace-nowrap">
                shoots
                <motion.span
                  initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: 1, duration: 0.6, ease: "backOut" }}
                  className="absolute w-[30px] h-[30px] sm:w-10 sm:h-10 md:w-[50px] md:h-[50px]"
                  style={{
                    top: "90%",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <Image
                    src="/assets/images/about/cutie.png"
                    alt="star decoration"
                    width={50}
                    height={50}
                    className="object-contain w-full h-full"
                  />
                </motion.span>
              </span>{" "}
              and{" "}
              <span
                style={{
                  textDecoration: "underline dotted",
                  textDecorationThickness: "1.5px",
                  textUnderlineOffset: "4px",
                }}
              >
                reimagining
              </span>{" "}
              spaces.
            </p>

            <p className="font-normal">
              The idea is simple: style isn&apos;t about perfection or trends.
              It&apos;s about creating things that feel right; for who you are,
              what you do, and how you live.
            </p>

            <p className="font-normal">
              Whether it&apos;s your clothes, your store, or your home, the goal
              is always the same: to make it feel intentional, effortless, and
              unmistakably you.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}