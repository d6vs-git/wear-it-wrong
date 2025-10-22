"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function InfoSection() {
  return (
    <motion.section
      className="relative min-h-screen bg-landing text-foreground flex flex-col items-center justify-start overflow-hidden"
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background center-out wipe to hero background color */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-full z-0"
        style={{ backgroundColor: "var(--background)" }}
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content above the sweep */}
      <div className="relative z-10 flex flex-col items-center">
 
        <motion.div
          className="relative w-[380px] h-[130px] md:w-[640px] md:h-[220px]"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.6 }}
        >
          <Image
            src="/assets/styles/logo.webp"
            alt="Wear It Wrong mark"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Supporting text */}
        <motion.p
          className="mt-8 max-w-2xl text-center font-open-sans text-sm md:text-base text-muted-foreground px-6"
          initial={{ y: 8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85, duration: 0.5 }}
        >
          Styling brands, people, and spaces with an eye for detail and a flair for the unexpected.
        </motion.p>
      </div>
    </motion.section>
  );
}
