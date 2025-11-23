"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect, useRef, MouseEvent } from "react";

type Breakpoint = "mobile" | "tablet" | "desktop";

type ResponsivePosition = {
  mobile: { top: string; left: string };
  tablet: { top: string; left: string };
  desktop: { top: string; left: string };
};

type ResponsiveDimensions = {
  mobile: { width: number; height: number };
  tablet: { width: number; height: number };
  desktop: { width: number; height: number };
};

export type BadgeType = {
  text: string;
  dimensions: ResponsiveDimensions;
  position: ResponsivePosition;
  category: string;
  zIndex?: number;
};

interface BadgeItemProps {
  badge: BadgeType;
  hoveredCategory: string | null;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

const springConfig = {
  stiffness: 150,
  damping: 20,
  mass: 0.5,
};

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateBreakpoint = () => {
      if (window.innerWidth < 640) setBreakpoint("mobile");
      else if (window.innerWidth < 1024) setBreakpoint("tablet");
      else setBreakpoint("desktop");
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return breakpoint;
}

function Badge({
  text,
  isHovered = false,
  dimensions,
  breakpoint = "desktop",
}: {
  text: string;
  isHovered?: boolean;
  dimensions?: { width: number; height: number };
  breakpoint?: Breakpoint;
}) {
  const getFontSize = () => {
    switch (breakpoint) {
      case "mobile":
        return 10;
      case "tablet":
        return 13;
      case "desktop":
        return 16;
      default:
        return 13;
    }
  };

  const getPadding = () => {
    switch (breakpoint) {
      case "mobile":
        return { x: "0px", y: "2px" };
      case "tablet":
        return { x: "0px", y: "3px" };
      case "desktop":
        return { x: "0px", y: "4px" };
      default:
        return { x: "0px", y: "3px" };
    }
  };

  const padding = getPadding();

  return (
    <motion.div
      className="relative inline-block rounded-full overflow-hidden bg-[#A8C5E6]"
      style={
        dimensions
          ? {
              width: dimensions.width,
              height: dimensions.height,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }
          : {
              paddingLeft: padding.x,
              paddingRight: padding.x,
              paddingTop: padding.y,
              paddingBottom: padding.y,
            }
      }
      initial={{ scale: 1, y: 0 }}
      animate={{ scale: [1, 1.02, 1], y: [0, -1, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Sheen effect */}
      <motion.span
        className="pointer-events-none absolute inset-y-0 left-[-40%] w-1/3 rotate-12 bg-linear-to-r from-transparent via-white/30 to-transparent"
        initial={false}
        animate={isHovered ? { x: "220%" } : { x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <p
        className="relative font-badtyp text-black font-bold uppercase"
        style={{ fontSize: `${getFontSize()}px` }}
      >
        {text}
      </p>
    </motion.div>
  );
}

export default function BadgeItem({
  badge,
  hoveredCategory,
  onHoverStart,
  onHoverEnd,
  onClick,
}: BadgeItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoint();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateZ = useMotionValue(0);

  const springX = useSpring(x, { ...springConfig, stiffness: 200 });
  const springY = useSpring(y, { ...springConfig, stiffness: 200 });
  const springRotateZ = useSpring(rotateZ, { ...springConfig, stiffness: 250 });

  const isBadgeHovered = hoveredCategory === badge.category;
  const isOtherBadgeHovered =
    hoveredCategory !== null && hoveredCategory !== badge.category;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const wiggleStrength = 0.25;
    x.set(deltaX * wiggleStrength);
    y.set(deltaY * wiggleStrength);
    rotateZ.set((deltaX / rect.width) * 4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateZ.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="absolute cursor-pointer"
      style={{
        top: badge.position[breakpoint].top,
        left: badge.position[breakpoint].left,
        transform: "translate(-50%, -50%)",
        x: springX,
        y: springY,
        rotate: springRotateZ,
        zIndex: badge.zIndex || 30,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      animate={{
        scale: isBadgeHovered ? 1.12 : isOtherBadgeHovered ? 0.92 : 1,
        filter: isOtherBadgeHovered ? "blur(3px)" : "blur(0px)",
        opacity: isOtherBadgeHovered ? 0.5 : 1,
      }}
      onMouseEnter={onHoverStart}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        handleMouseLeave();
        onHoverEnd();
      }}
      onClick={onClick}
      viewport={{ once: true }}
      transition={{
        scale: { type: "spring", stiffness: 350, damping: 22, mass: 0.6 },
        filter: { type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        opacity: { type: "tween", duration: 0.25, ease: "easeOut" },
      }}
    >
      <Badge
        text={badge.text}
        isHovered={isBadgeHovered}
        dimensions={badge.dimensions[breakpoint]}
        breakpoint={breakpoint}
      />
    </motion.div>
  );
}