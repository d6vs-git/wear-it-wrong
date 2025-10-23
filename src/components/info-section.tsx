"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

export default function InfoSection() {
  return (
    <motion.section
      className="relative min-h-screen bg-landing text-foreground flex flex-col items-center justify-start overflow-hidden"
      initial={{ opacity: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background center-out wipe */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 h-full z-0"
        style={{ backgroundColor: "var(--background)" }}
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
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

        {/* Typewriter Paragraph */}
        <motion.div
          className="mt-10 max-w-3xl text-center font-open-sans text-sm md:text-base text-muted-foreground leading-relaxed px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Typewriter
            options={{
              autoStart: true,
              loop: false,
              delay: 17,
              cursor: "",
              strings: [
                `At Wear It Wrong, we believe that fashion should be as bold as the people who wear it. Every piece we create is a balance of personality and practicality — designed to move with you, tell your story, and break the quiet rules of convention. We celebrate individuality through textures, tones, and silhouettes that challenge the ordinary and inspire confidence. Whether it’s the clean lines of minimal streetwear or the playful energy of expressive patterns, our collections are curated to spark emotion and creativity in everyday wear.\n\nOur philosophy goes beyond just clothing — it’s about self-expression, identity, and transformation. Each design is an invitation to explore, to mix, and to redefine what it means to look and feel “right.” From concept to creation, we merge art, function, and emotion into a wearable form of storytelling. Step into a world where imperfection is beautiful, where mismatched can be masterful, and where every outfit tells a new chapter. Wear it wrong — and own it completely.`
              ],
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
