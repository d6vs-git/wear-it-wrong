"use client";

import { motion, type Variants } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/assests/heroSection/logo.webp";

const navContainer: Variants = {
  hidden: { opacity: 0, gap: 28 },
  show: {
    opacity: 1,
    gap: 28,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
  expanded: {
    opacity: 1,
    gap: 120,
    transition: { duration: 0.9, staggerChildren: 0.06, ease: [0.22, 1, 0.36, 1] },
  },
};

const navItem: Variants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  expanded: { y: 0, opacity: 1, transition: { duration: 0.4 } },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 1.05, y: 10 },
  show: {
    opacity: 1,
    scale: 1.2, // enlarge base size
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
  condensed: {
    scale: 1.14, // ~5% smaller than show state
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExpanded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const nav = ["Home", "Looks", "Book Now", "The Studio", "Journal"] as const;

  return (
    <div className="relative min-h-screen bg-[#FBF9D1] overflow-hidden flex flex-col">
      {/* Navigation */}
      <motion.nav
        initial="hidden"
        animate={expanded ? "expanded" : "show"}
        variants={navContainer}
        layout
        aria-label="Primary"
        className={`flex items-center w-full max-w-7xl mx-auto ${expanded ? "justify-between px-8" : "justify-center px-6"} py-8 transition-all duration-700`}
        style={{ willChange: "transform, opacity" }}
      >
        {nav.map((label) => {
          const isBook = label === "Book Now";
          return (
           <motion.button
                    key={label}
                    type="button"
                    variants={navItem}
                    className="transition-opacity hover:opacity-70"
                    style={{
                    fontFamily: isBook
                        ? '"Porter Sans Block", var(--font-open-sans)'
                        : '"Open Sans", var(--font-open-sans)',
                    // Increase sizes
                    fontSize: isBook ? '2.2rem' : '1.2rem',
                    // Hollow Book Now with background visible inside the letters
                    color: isBook ? 'transparent' : '#000',
                    WebkitTextFillColor: isBook ? 'transparent' : undefined,
                    WebkitTextStrokeWidth: isBook ? '2px' : undefined,
                    WebkitTextStrokeColor: isBook ? '#C1856D' : undefined,
                    textTransform: isBook ? 'uppercase' : undefined,
                    fontWeight: isBook ? 800 : 400,
                    // More tracking
                    letterSpacing: isBook ? '0.12em' : '0.06em',
                    // Remove fill-like shadow so the background stays visible between strokes
                    textShadow: isBook ? undefined : undefined,
                    }}
                >
    {label}
  </motion.button>
          );
        })}
      </motion.nav>

      {/* Hero Section */}
      <main className="relative mx-auto w-full max-w-[540px] px-6 flex flex-col justify-center items-center flex-grow">
        <h1 className="sr-only">Wear it Wrong</h1>
        <div className="relative block w-full">
          <motion.div
            initial="hidden"
            animate={expanded ? "condensed" : "show"}
            variants={logoVariants}
            className="block w-full"
            style={{ transformOrigin: "center", willChange: "transform, opacity" }}
          >
            <Image
              src={logo}
              alt="Wear it Wrong logo"
              priority
              fetchPriority="high"
              width={(logo as any).width}
              height={(logo as any).height}
              quality={95}
              sizes="(max-width: 2400px) 100vw, 2000px"
              className="mx-auto h-auto w-full select-none"
              style={{ maxWidth: "100%" }}
            />
          </motion.div>

          {/* Quote positioned bottom-right of the logo */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: expanded ? 1 : 0, y: expanded ? 0 : 10 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="absolute bottom-2 right-2 md:bottom-3 md:right-3 text-right text-sm md:text-base italic text-[#8B6F47] pointer-events-none"
            style={{ fontFamily: '"Open Sans", var(--font-open-sans)' }}
          >
            –Because perfect is overrated”
          </motion.p>
        </div>
      </main>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.9, delay: 1.5 }}
        className="text-center text-sm italic text-[#C1856D] mb-6"
      >
        Scroll to explore
      </motion.div>

      {/* Local font setup */}
      <style>{`
        @font-face {
          font-family: 'Porter Sans Block';
          src: url('/fonts/porter-sans-block.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
      `}</style>
    </div>
  );
}
