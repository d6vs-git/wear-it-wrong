"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  // Adjustable floating images
  const floatingImages = [
    {
      src: "/assets/images/about/safety-pin-1.png",
      alt: "safety pin 1",
      top: "0rem",
      right: "-65rem",
      width: "80px",
      height: "30px",
    },
    {
      src: "/assets/images/about/safety-pin-2.png",
      alt: "safety pin 2",
      top: "-1rem",
      right: "-65rem",
      width: "80px",
      height: "30px",
      translateY: "10%",
    },
    {
      src: "/assets/images/about/dior.png",
      alt: "dior logo",
      top: "1rem",
      right: "-64rem",
      width: "80px",
      height: "30px",
      translateY: "20%",
    },
  ];

  return (
    <main className="min-h-screen flex items-start justify-center px-4 sm:px-8 py-16 sm:py-24">
      <div className="relative max-w-4xl w-full text-left">
        {/* Floating images */}
        <div className="absolute flex flex-col items-end">
          {floatingImages.map((img, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                top: img.top,
                right: img.right,
                transform: `translateY(${img.translateY})`,
                width: img.width,
                height: img.height,
              }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={parseInt(img.width)}
                height={parseInt(img.height)}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-abovebeyond text-[#a4463a] text-6xl sm:text-7xl md:text-8xl leading-tight tracking-tight whitespace-nowrap mb-14 sm:mb-20"
        >
          About{" "}
          <span
            className="relative inline-block"
            style={{
              textDecoration: "underline dotted #a4463a",
              textDecorationThickness: "2px",
              textUnderlineOffset: "0.2em",
            }}
          >
            WearItWrong
          </span>
        </motion.h1>

        {/* Body Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          className="px-2 sm:px-6 md:px-0 font-futura font-medium"
        >
          <div className="space-y-6 text-[#8b4535] leading-relaxed text-base sm:text-lg md:text-xl relative">
            <p>
              Wear It Wrong is a creative styling studio that helps people,
              brands, and spaces find their expression and look good doing it.
            </p>

            <p className="relative">
              Founded by stylist{" "}
              <span
                style={{
                  textUnderlineOffset: "3px",
                }}
              >
                Gouri Dhawan
              </span>
              , the studio works across personal, commercial, and interior
              styling; from building wardrobes that make sense to designing
              brand{" "}
              <span className="relative inline-block">
                shoots
                <span
                  className="absolute"
                  style={{
                    top: "80%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "40px",
                  }}
                >
                  <Image
                    src="/assets/images/about/cutie.png"
                    alt="star decoration"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </span>
              </span>{" "}
              and{" "}
              <span
                style={{
                  textDecoration: "underline dotted",
                  textUnderlineOffset: "3px",
                }}
              >
                reimagining
              </span>{" "}
              spaces.
            </p>

            <p>
              The idea is simple: style isn’t about perfection or trends. It’s
              about creating things that feel right; for who you are, what you
              do, and how you live.
            </p>

            <p>
              Whether it’s your clothes, your store, or your home, the goal is
              always the same: to make it feel intentional, effortless, and
              unmistakably you.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
