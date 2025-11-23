"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TimedAudio from "@/components/audio/timed-audio";

export default function Hero() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Delay navigation so animation plays
    setTimeout(() => {
      router.push("/styles");
    }, 1500);
  };

  return (
    <section className="h-screen w-full flex items-center justify-center px-4 sm:px-6 md:px-8 bg-background text-foreground overflow-hidden relative">
      <TimedAudio
        src="/assets/sounds/page1/21-savage-redrum.mp3"
        start={0}
        volume={0.6}
        fixed
        loop
      />
      <div className="text-center w-full max-w-6xl mx-auto">
        <motion.button
          type="button"
          aria-label="Go to folders"
          onClick={handleClick}
          className="inline-block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg relative touch-manipulation"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Black logo (default) */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isClicked ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src="/assets/logo/logo-black.png"
              alt="Wear It Wrong Logo Black"
              width={500}
              height={400}
              priority
              className="w-[85vw] xs:w-[75vw] sm:w-[60vw] md:w-[450px] lg:w-[500px] h-auto mx-auto select-none pointer-events-none"
              draggable={false}
            />
          </motion.div>

          {/* Silver logo with shimmer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isClicked ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              <Image
                src="/assets/logo/logo-silver.png"
                alt="Wear It Wrong Logo Silver"
                width={500}
                height={400}
                priority
                className="w-[85vw] xs:w-[75vw] sm:w-[60vw] md:w-[450px] lg:w-[500px] h-auto mx-auto select-none pointer-events-none"
                draggable={false}
              />

              {/* Shimmer overlay */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="shimmer" />
              </div>
            </div>
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
