"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 sm:py-20 md:py-28 lg:py-32 bg-background">
      <div className="max-w-4xl w-full">
        {/* Heading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 md:mb-16"
        >
          <p className="text-primary text-sm sm:text-base mb-3 sm:mb-4 tracking-wide">
            About
          </p>
          <h1 className="font-badtyp text-primary text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-tight">
            WearItWrong
          </h1>
        </motion.div>

        {/* Body Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-5 sm:space-y-6 text-foreground/80 leading-relaxed text-sm sm:text-base max-w-2xl"
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          <p>
            Wear It Wrong is a creative styling studio that helps people,
            brands, and spaces find their expression and look good doing it.
          </p>

          <p>
            Founded by stylist{" "}
            <span className="font-medium text-foreground">
              Gouri Dhawan
            </span>
            , the studio works across personal, commercial, and interior
            styling; from building wardrobes that make sense to designing brand{" "}
            <span className="relative inline-block whitespace-nowrap">
              shoots
              <motion.span
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "backOut" }}
                className="absolute w-6 h-6 sm:w-7 sm:h-7"
                style={{
                  top: "95%",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Image
                  src="/assets/images/about/cutie.webp"
                  alt="star decoration"
                  width={28}
                  height={28}
                  className="object-contain w-full h-full"
                />
              </motion.span>
            </span>{" "}
            and reimagining spaces.
          </p>

          <p>
            The idea is simple: style isn&apos;t about perfection or trends.
            It&apos;s about creating things that feel right; for who you are,
            what you do, and how you live.
          </p>

          <p>
            Whether it&apos;s your clothes, your store, or your home, the goal
            is always the same: to make it feel intentional, effortless, and
            unmistakably you.
          </p>
        </motion.div>
      </div>
    </main>
  );
}