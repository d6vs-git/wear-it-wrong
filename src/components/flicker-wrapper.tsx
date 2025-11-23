"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FlickerWrapperProps {
  children: ReactNode;
  enabled?: boolean;
  duration?: number;
}

/**
 * FlickerWrapper - Creates a flickering light effect animation
 * 
 * @param children - The content to apply the flicker effect to
 * @param enabled - Whether the flicker effect is active (default: true)
 * @param duration - Duration of one flicker cycle in seconds (default: 3)
 */
export default function FlickerWrapper({
  children,
  enabled = true,
  duration = 3,
}: FlickerWrapperProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <motion.span
      className="inline-block"
      animate={{
        filter: [
          "brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0))",
          "brightness(1.3) drop-shadow(0 0 8px rgba(255,255,200,0.6))",
          "brightness(0.9) drop-shadow(0 0 4px rgba(255,255,200,0.3))",
          "brightness(1.2) drop-shadow(0 0 10px rgba(255,255,200,0.8))",
          "brightness(1) drop-shadow(0 0 6px rgba(255,255,200,0.4))",
          "brightness(1.1) drop-shadow(0 0 5px rgba(255,255,200,0.5))",
          "brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0))",
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1],
      }}
    >
      {children}
    </motion.span>
  );
}