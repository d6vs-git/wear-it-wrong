"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function PeopleSection() {
  return (
    <motion.section
      className="relative min-h-screen bg-landing text-foreground flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex items-center gap-4 md:gap-6"
        initial={{ y: 8, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1
          className="font-porter-sans-block uppercase text-primary leading-none text-3xl md:text-2xl lg:text-6xl"
        //   style={{
        //     textShadow:
        //       "-4px 6px 0 rgba(154,63,63,0.35), -8px 12px 0 rgba(154,63,63,0.15)",
        //   }}
        >
         PEOPLE
        </h1>

        {/* Arrow icon (no image) */}
        <div
          className="ml-1 md:ml-2 size-10 md:size-12 rounded-xl bg-card/80 shadow-sm flex items-center justify-center"
          aria-hidden
        >
          <ArrowRight className="w-6 h-6 md:w-7 md:h-7 text-primary" strokeWidth={2} />
        </div>
      </motion.div>
    </motion.section>
  );
}
