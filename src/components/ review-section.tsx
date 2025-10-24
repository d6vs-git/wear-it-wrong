"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const imagePositions = [
  // LEFT SIDE - Walking models
  {
    src: "/assets/people/main/personal-shopper1.png",
    alt: "Walking Models Left",
    width: 200,
    height: 150,
    position: { top: "76%", left: "73%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
  },

 

];

export default function ReviewSection() {
  return (
    <motion.section
      className="relative w-full h-screen flex items-center justify-center bg-landing overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Dynamically render all images from configuration */}
     {imagePositions.map((img, index) => (
  <motion.div
    key={index}
    className="absolute z-20"
    style={{
      top: img.position.top,
      left: img.position.left,
      right: img.position.right, // supports right-based positioning
      transform: img.align === "right" 
        ? "translateY(-50%)" // only move vertically centered
        : "translate(-50%, -50%)",
    }}
    initial={{
      x: img.animation.x,
      y: img.animation.y,
      opacity: img.animation.opacity,
      rotate: img.animation.rotate,
    }}
    whileInView={{
      x: 0,
      y: 0,
      opacity: 1,
      rotate: img.animation.rotate,
    }}
    viewport={{ once: true }}
    transition={{ delay: img.delay, duration: 0.6 }}
  >
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      className="object-contain"
      priority={index < 2}
    />
  </motion.div>
))}

    </motion.section>
  );
}
