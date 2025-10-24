"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PeopleSection from "./people-section";
import BrandSection from "./brand-section";
import SpaceSection from "./space-section";

const slides = [
  { id: "people", component: PeopleSection, title: "PEOPLE" },
  { id: "brand", component: BrandSection, title: "BRAND" },
  { id: "space", component: SpaceSection, title: "SPACE" },
];

export default function SectionSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0); // start at PEOPLE

  const goToNext = () => {
    if (currentIndex < slides.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goToPrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const CurrentSlideComponent = slides[currentIndex].component;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-landing flex items-center justify-center">
      {/* Centered navigation section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-8 md:gap-16 z-50">
        {/* Left arrow (hide on first slide) */}
        {currentIndex > 0 && (
          <motion.button
            onClick={goToPrevious}
            whileTap={{ scale: 0.9 }}
            className="text-[#7d2c2c] text-3xl md:text-5xl font-bold hover:scale-110 transition-transform select-none"
            aria-label="Previous slide"
          >
            ←
          </motion.button>
        )}

        {/* Center title */}
        <motion.h1
          key={slides[currentIndex].id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4 }}
          className="font-porter-sans-block uppercase tracking-widest text-[#7d2c2c] text-5xl md:text-7xl"
        >
          {slides[currentIndex].title}
        </motion.h1>

        {/* Right arrow (hide on last slide) */}
        {currentIndex < slides.length - 1 && (
          <motion.button
            onClick={goToNext}
            whileTap={{ scale: 0.9 }}
            className="text-[#7d2c2c] text-3xl md:text-5xl font-bold hover:scale-110 transition-transform select-none"
            aria-label="Next slide"
          >
            →
          </motion.button>
        )}
      </div>

      {/* Animated slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentIndex].id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full h-full flex items-center justify-center"
        >
          <CurrentSlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-50">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-[#7d2c2c] w-8 md:w-12"
                : "bg-[#7d2c2c]/30 w-2 md:w-3 hover:bg-[#7d2c2c]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
