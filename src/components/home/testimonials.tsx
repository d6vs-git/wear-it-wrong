"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect, MouseEvent } from "react";

// Responsive types matching other sections
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

// Animation spring config (consistent feel)
const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };

interface SectionImage {
  src: string;
  alt: string;
  dimensions: ResponsiveDimensions;
  position: ResponsivePosition;
  animation?: { x: number; y: number; opacity: number; rotate: number };
  delay?: number;
  zIndex?: number;
}

// Responsive image set (adapted from original static positions)
const imagePositions: SectionImage[] = [
  {
    src: "/assets/images/testimonial/image240.webp",
    alt: "love icons cluster 1",
    dimensions: {
      mobile: { width: 250, height: 250 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 400, height: 400 },
    },
    position: {
      mobile: { top: "6%", left: "3%" },
      tablet: { top: "17%", left: "18%" },
      desktop: { top: "14%", left: "8%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.1,
    zIndex: 4,
  },
  {
    src: "/assets/images/testimonial/comment1-removebg-preview.webp",
    alt: "quote box 1",
    dimensions: {
      mobile: { width: 230, height: 230 },
      tablet: { width: 190, height: 150 },
      desktop: { width: 300, height: 200 },
    },
    position: {
      mobile: { top: "13%", left: "7%" },
      tablet: { top: "16%", left: "27%" },
      desktop: { top: "30%", left: "11%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.18,
    zIndex: 5,
  },
  {
    src: "/assets/images/testimonial/image240.webp",
    alt: "love icons cluster 2",
    dimensions: {
      mobile: { width: 250, height: 200 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 400, height: 400 },
    },
    position: {
      mobile: { top: "30%", left: "37%" },
      tablet: { top: "46%", left: "62%" },
      desktop: { top: "25%", left: "69%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.26,
    zIndex: 4,
  },
  {
    src: "/assets/images/testimonial/comment2-removebg-preview.webp",
    alt: "quote box 2",
    dimensions: {
      mobile: { width: 230, height: 230 },
      tablet: { width: 190, height: 150 },
      desktop: { width: 300, height: 200 },
    },
    position: {
      mobile: { top: "38%", left: "40%" },
      tablet: { top: "46%", left: "71%" },
      desktop: { top: "43%", left: "74%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.34,
    zIndex: 5,
  },
  {
    src: "/assets/images/testimonial/image240.webp",
    alt: "love icons cluster 2",
    dimensions: {
      mobile: { width: 250, height: 250 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 400, height: 400 },
    },
    position: {
      mobile: { top: "55%", left: "2%" },
      tablet: { top: "46%", left: "62%" },
      desktop: { top: "45%", left: "38%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.26,
    zIndex: 4,
  },
  {
    src: "/assets/images/testimonial/3comment-removebg-preview.webp",
    alt: "quote box 2",
    dimensions: {
      mobile: { width: 230, height: 230 },
      tablet: { width: 190, height: 150 },
      desktop: { width: 300, height: 200 },
    },
    position: {
      mobile: { top: "63%", left: "5%" },
      tablet: { top: "46%", left: "71%" },
      desktop: { top: "62%", left: "42%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.34,
    zIndex: 5,
  },
];

function SectionImageItem({ img, index }: { img: SectionImage; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">("desktop");

  // Motion values for subtle parallax wiggle like other sections
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

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

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || breakpoint === "mobile") return; // skip on mobile
    const rect = ref.current.getBoundingClientRect();
    const deltaX = e.clientX - (rect.left + rect.width / 2);
    const deltaY = e.clientY - (rect.top + rect.height / 2);
    const strength = 0.15;
    x.set(deltaX * strength);
    y.set(deltaY * strength);
    rotateX.set(-(deltaY / rect.height) * 8);
    rotateY.set((deltaX / rect.width) * 8);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0); rotateX.set(0); rotateY.set(0);
  };

  const dims = img.dimensions[breakpoint];
  const pos = img.position[breakpoint];

  return (
    <motion.div
      ref={ref}
      className="absolute cursor-pointer"
      style={{
        top: pos.top,
        left: pos.left,
        transform: "translate(-50%, -50%)",
        x: springX,
        y: springY,
        rotateX: springRotateX,
        rotateY: springRotateY,
        zIndex: img.zIndex ?? 10,
      }}
      initial={{ x: img.animation?.x ?? 0, y: img.animation?.y ?? 0, opacity: img.animation?.opacity ?? 1, rotate: img.animation?.rotate ?? 0 }}
      whileInView={{ x: 0, y: 0, opacity: 1, rotate: img.animation?.rotate ?? 0 }}
      transition={{
        x: { type: "tween", duration: 0.6, ease: "easeOut" },
        y: { type: "tween", duration: 0.6, ease: "easeOut" },
        opacity: { type: "tween", duration: 0.6, ease: "easeOut", delay: img.delay },
        rotate: { type: "tween", duration: 0.6, ease: "easeOut" },
      }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: breakpoint === "mobile" ? 1 : 1.05 }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={dims.width}
        height={dims.height}
        className="object-contain pointer-events-none"
        priority={index < 2}
        draggable={false}
      />
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <motion.section
      className="relative w-full min-h-[120vh] sm:min-h-screen md:h-screen flex items-center justify-center bg-landing overflow-y-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {imagePositions.map((img, index) => (
        <SectionImageItem key={index} img={img} index={index} />
      ))}
    </motion.section>
  );
}