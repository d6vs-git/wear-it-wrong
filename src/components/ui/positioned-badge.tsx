"use client";

import { motion } from "framer-motion";

interface PositionedBadgeProps {
  text: string;
  position: { top: string; left: string };
  backgroundColor?: string;
  textColor?: string;
  rotation?: number;
  delay?: number;
  className?: string;
}

export default function PositionedBadge({
  text,
  position,
  backgroundColor = "#6B9FD1",
  textColor = "#000000",
  rotation = 0,
  delay = 0,
  className = "",
}: PositionedBadgeProps) {
  return (
    <motion.div
      className={`absolute z-30 ${className}`}
      style={{
        top: position.top,
        left: position.left,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
    >
      <div
        className="px-4 py-2 rounded-full font-serif text-sm md:text-base uppercase tracking-wider whitespace-nowrap shadow-lg"
        style={{
          backgroundColor,
          color: textColor,
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}
