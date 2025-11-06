"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect, MouseEvent } from "react";
import Badge from "@/components/badge";

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

// Smooth spring configuration for buttery animations
const springConfig = {
  stiffness: 150,
  damping: 20,
  mass: 0.5,
};

const imagePositions = [
  //space-edit
  {
    src: "/assets/images/people/main/space-edit2.png",
    alt: "heyy-text",
    dimensions: {
      mobile: { width: 100, height: 113 },
      tablet: { width: 120, height: 136 },
      desktop: { width: 150, height: 170 },
    },
    position: {
      mobile: { top: "8%", left: "30%" },
      tablet: { top: "7%", left: "25%" },
      desktop: { top: "5%", left: "18%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
    zIndex: 5,
  },
  {
    src: "/assets/images/people/main/space-edit1.png",
    alt: "Hanger",
    dimensions: {
      mobile: { width: 153, height: 113 },
      tablet: { width: 184, height: 136 },
      desktop: { width: 230, height: 170 },
    },
    position: {
      mobile: { top: "12%", left: "10%" },
      tablet: { top: "11%", left: "8%" },
      desktop: { top: "10%", left: "4%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
    zIndex: 4,
  },
  {
    src: "/assets/images/people/main/space-edit3.png",
    alt: "Disco-ball",
    dimensions: {
      mobile: { width: 87, height: 113 },
      tablet: { width: 104, height: 136 },
      desktop: { width: 130, height: 170 },
    },
    position: {
      mobile: { top: "24%", left: "20%" },
      tablet: { top: "23%", left: "16%" },
      desktop: { top: "22%", left: "12.6%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
    zIndex: 3,
  },
  {
    src: "/assets/images/people/main/image78.png",
    alt: "favourite-person",
    dimensions: {
      mobile: { width: 73, height: 113 },
      tablet: { width: 88, height: 136 },
      desktop: { width: 110, height: 170 },
    },
    position: {
      mobile: { top: "5%", left: "12%" },
      tablet: { top: "5%", left: "10%" },
      desktop: { top: "4%", left: "6%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
    zIndex: 6,
  },
  {
    src: "/assets/images/space/main/image54.jpg",
    alt: "portrait frame",
    dimensions: {
      mobile: { width: 200, height: 200 },
      tablet: { width: 240, height: 240 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "65%", left: "15%" },
      tablet: { top: "60%", left: "12%" },
      desktop: { top: "55%", left: "5%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-space",
    zIndex: 4,
  },
  {
    src: "/assets/images/space/main/image90.png",
    alt: "photo frame",
    dimensions: {
      mobile: { width: 100, height: 113 },
      tablet: { width: 120, height: 136 },
      desktop: { width: 150, height: 170 },
    },
    position: {
      mobile: { top: "32%", left: "50%" },
      tablet: { top: "30%", left: "42%" },
      desktop: { top: "27%", left: "33%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 20 },
    category: "brand-space",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/main/image77.png",
    alt: "recorder",
    dimensions: {
      mobile: { width: 60, height: 113 },
      tablet: { width: 72, height: 136 },
      desktop: { width: 90, height: 170 },
    },
    position: {
      mobile: { top: "47%", left: "35%" },
      tablet: { top: "45%", left: "30%" },
      desktop: { top: "42%", left: "23%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-space",
    zIndex: 3,
  },
  {
    src: "/assets/images/space/main/image88.png",
    alt: "pot plant",
    dimensions: {
      mobile: { width: 87, height: 113 },
      tablet: { width: 104, height: 136 },
      desktop: { width: 130, height: 170 },
    },
    position: {
      mobile: { top: "32%", left: "40%" },
      tablet: { top: "30%", left: "36%" },
      desktop: { top: "27%", left: "28%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-space",
    zIndex: 4,
  },
  {
    src: "/assets/images/space/main/image87.png",
    alt: "necklace",
    dimensions: {
      mobile: { width: 67, height: 113 },
      tablet: { width: 80, height: 136 },
      desktop: { width: 100, height: 170 },
    },
    position: {
      mobile: { top: "53%", left: "55%" },
      tablet: { top: "50%", left: "47%" },
      desktop: { top: "48%", left: "38%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: -15 },
    category: "brand-space",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/main/image71.jpg",
    alt: "music-player",
    dimensions: {
      mobile: { width: 67, height: 113 },
      tablet: { width: 80, height: 136 },
      desktop: { width: 100, height: 170 },
    },
    position: {
      mobile: { top: "88%", left: "30%" },
      tablet: { top: "46%", left: "56%" },
      desktop: { top: "43%", left: "46%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 3,
  },
  {
    src: "/assets/images/space/main/image76.png",
    alt: "car",
    dimensions: {
      mobile: { width: 160, height: 133 },
      tablet: { width: 192, height: 160 },
      desktop: { width: 240, height: 200 },
    },
    position: {
      mobile: { top: "25%", left: "70%" },
      tablet: { top: "23%", left: "62%" },
      desktop: { top: "20%", left: "50%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-space",
    zIndex: 6,
  },
  {
    src: "/assets/images/space/main/image79.png",
    alt: "cupboard",
    dimensions: {
      mobile: { width: 147, height: 133 },
      tablet: { width: 176, height: 160 },
      desktop: { width: 220, height: 200 },
    },
    position: {
      mobile: { top: "78%", left: "75%" },
      tablet: { top: "8%", left: "82%" },
      desktop: { top: "6%", left: "75%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 4,
  },
  {
    src: "/assets/images/space/main/image81.png",
    alt: "flower-pots",
    dimensions: {
      mobile: { width: 93, height: 133 },
      tablet: { width: 112, height: 160 },
      desktop: { width: 140, height: 200 },
    },
    position: {
      mobile: { top: "85%", left: "60%" },
      tablet: { top: "31%", left: "76%" },
      desktop: { top: "28%", left: "68%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 3,
  },
  {
    src: "/assets/images/space/main/image81.png",
    alt: "flower-pots-2",
    dimensions: {
      mobile: { width: 93, height: 133 },
      tablet: { width: 112, height: 160 },
      desktop: { width: 140, height: 200 },
    },
    position: {
      mobile: { top: "85%", left: "85%" },
      tablet: { top: "31%", left: "92%" },
      desktop: { top: "28%", left: "89%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 3,
  },
  {
    src: "/assets/images/space/main/image80.png",
    alt: "chair-1",
    dimensions: {
      mobile: { width: 80, height: 80 },
      tablet: { width: 96, height: 96 },
      desktop: { width: 120, height: 120 },
    },
    position: {
      mobile: { top: "98%", left: "70%" },
      tablet: { top: "52%", left: "82%" },
      desktop: { top: "49%", left: "78%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 4,
  },
  {
    src: "/assets/images/space/main/image82.png",
    alt: "chair-3",
    dimensions: {
      mobile: { width: 120, height: 47 },
      tablet: { width: 144, height: 56 },
      desktop: { width: 180, height: 70 },
    },
    position: {
      mobile: { top: "99%", left: "85%" },
      tablet: { top: "53%", left: "90%" },
      desktop: { top: "50%", left: "87%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 4,
  },
  {
    src: "/assets/images/space/main/image84.png",
    alt: "table",
    dimensions: {
      mobile: { width: 160, height: 133 },
      tablet: { width: 192, height: 160 },
      desktop: { width: 240, height: 200 },
    },
    position: {
      mobile: { top: "112%", left: "65%" },
      tablet: { top: "69%", left: "80%" },
      desktop: { top: "66%", left: "74%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 3,
  },
  {
    src: "/assets/images/space/main/image85.png",
    alt: "flower vase",
    dimensions: {
      mobile: { width: 47, height: 47 },
      tablet: { width: 56, height: 56 },
      desktop: { width: 70, height: 70 },
    },
    position: {
      mobile: { top: "104%", left: "70%" },
      tablet: { top: "59%", left: "83%" },
      desktop: { top: "56%", left: "79.5%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/main/image83.png",
    alt: "chair-2",
    dimensions: {
      mobile: { width: 120, height: 47 },
      tablet: { width: 144, height: 56 },
      desktop: { width: 180, height: 70 },
    },
    position: {
      mobile: { top: "99%", left: "50%" },
      tablet: { top: "53%", left: "70%" },
      desktop: { top: "50%", left: "65%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 4,
  },
];

const badgePositions: Badge[] = [
  {
    text: "SPACE EDIT",
    dimensions: {
      mobile: { width: 146, height: 32 },
      tablet: { width: 175, height: 38 },
      desktop: { width: 220, height: 56 },
    },
    position: {
      mobile: { top: "38%", left: "28%" },
      tablet: { top: "37%", left: "24%" },
      desktop: { top: "36%", left: "15%" },
    },
    category: "space-edit",
    zIndex: 31,
  },
  {
    text: "BRAND SPACES",
    dimensions: {
      mobile: { width: 175, height: 32 },
      tablet: { width: 210, height: 38 },
      desktop: { width: 263, height: 56 },
    },
    position: {
      mobile: { top: "72%", left: "45%" },
      tablet: { top: "70%", left: "40%" },
      desktop: { top: "67%", left: "30%" },
    },
    category: "brand-space",
    zIndex: 31,
  },
  {
    text: "MAKEOVER PROJECTS",
    dimensions: {
      mobile: { width: 231, height: 32 },
      tablet: { width: 277, height: 38 },
      desktop: { width: 346, height: 56 },
    },
    position: {
      mobile: { top: "108%", left: "50%" },
      tablet: { top: "77%", left: "84%" },
      desktop: { top: "74%", left: "72%" },
    },
    category: "makeover-projects",
    zIndex: 31,
  },
];

interface SpaceSectionProps {
  onBadgeClick: (service: string) => void;
}

type Badge = {
  text: string;
  dimensions: ResponsiveDimensions;
  position: ResponsivePosition;
  category: string;
  zIndex?: number;
};

type SectionImage = {
  src: string;
  alt: string;
  dimensions: ResponsiveDimensions;
  position: ResponsivePosition;
  animation?: { x: number; y: number; opacity: number; rotate: number };
  category: string;
  zIndex?: number;
};

function SectionImageItem({
  img,
  index,
  hoveredCategory,
}: {
  img: SectionImage;
  index: number;
  hoveredCategory: string | null;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">("desktop");
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Update breakpoint based on window width
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

  const isHovered = hoveredCategory === img.category;
  const isOtherHovered = hoveredCategory !== null && hoveredCategory !== img.category;
  const [isCarMoving, setIsCarMoving] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Special handling for car and favourite-person
  const isCar = img.alt === "car";
  const isFavouritePerson = img.alt === "favourite-person";

  // Handle mount animation for car
  useEffect(() => {
    if (isCar) {
      setTimeout(() => setMounted(true), 100);
    }
  }, [isCar]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const wiggleStrength = 0.15;
    x.set(deltaX * wiggleStrength);
    y.set(deltaY * wiggleStrength);
    rotateX.set(-(deltaY / rect.height) * 8);
    rotateY.set((deltaX / rect.width) * 8);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  // For car, use continuous looping animation while hovered
  if (isCar) {
    return (
      <motion.div
        ref={ref}
        className="absolute cursor-pointer"
        style={{
          top: img.position[breakpoint].top,
          left: img.position[breakpoint].left,
          transform: "translate(-50%, -50%)",
          zIndex: img.zIndex || 20,
        }}
        initial={{
          opacity: 0,
          x: -30,
        }}
        animate={{
          x: isCarMoving && mounted ? [0, -700, 0] : 0,
          scale: isHovered ? 1.25 : isOtherHovered ? 0.88 : 1,
          filter: isOtherHovered ? "blur(6px)" : "blur(0px)",
          opacity: mounted ? (isOtherHovered ? 0.45 : 1) : 1,
        }}
        transition={{
          x: isCarMoving && mounted ? { 
            duration: 5, 
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop"
          } : { duration: 0.5 },
          scale: { 
            type: "spring",
            stiffness: 300,
            damping: 25,
            mass: 0.8,
          },
          filter: { 
            type: "tween",
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          },
          opacity: { 
            type: "tween",
            duration: 0.5,
            ease: "easeOut",
          },
        }}
        onMouseEnter={() => setIsCarMoving(true)}
        onMouseLeave={() => setIsCarMoving(false)}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={img.dimensions[breakpoint].width}
          height={img.dimensions[breakpoint].height}
          className="object-contain pointer-events-none"
          priority={index < 2}
          draggable={false}
        />
      </motion.div>
    );
  }

  // Regular images with wiggle effect
  return (
    <motion.div
      ref={ref}
      className="absolute cursor-pointer"
      style={{
        top: img.position[breakpoint].top,
        left: img.position[breakpoint].left,
        transform: "translate(-50%, -50%)",
        x: springX,
        y: springY,
        rotateX: springRotateX,
        rotateY: springRotateY,
        zIndex: img.zIndex || 20,
      }}
      initial={{
        x: img.animation?.x ?? 0,
        y: img.animation?.y ?? 0,
        opacity: img.animation?.opacity ?? 1,
        rotate: img.animation?.rotate ?? 0,
      }}
      whileInView={{
        x: 0,
        y: 0,
        opacity: 1,
        rotate: img.animation?.rotate ?? 0,
      }}
      animate={{
        scale: isHovered ? 1.25 : isOtherHovered ? 0.88 : 1,
        filter: isOtherHovered ? "blur(6px)" : "blur(0px)",
        opacity: isOtherHovered ? 0.45 : isFavouritePerson ? [1, 0.3, 1] : 1,
      }}
      viewport={{ once: true }}
      transition={{
        scale: { 
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.8,
        },
        filter: { 
          type: "tween",
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: isFavouritePerson ? {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        } : { 
          type: "tween",
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={img.dimensions[breakpoint].width}
        height={img.dimensions[breakpoint].height}
        className="object-contain pointer-events-none"
        priority={index < 2}
        draggable={false}
      />
    </motion.div>
  );
}

function BadgeItem({
  badge,
  hoveredCategory,
  onHoverStart,
  onHoverEnd,
  onClick,
}: {
  badge: typeof badgePositions[0];
  hoveredCategory: string | null;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">("desktop");
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateZ = useMotionValue(0);

  const springX = useSpring(x, { ...springConfig, stiffness: 200 });
  const springY = useSpring(y, { ...springConfig, stiffness: 200 });
  const springRotateZ = useSpring(rotateZ, { ...springConfig, stiffness: 250 });

  // Update breakpoint based on window width
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

  const isBadgeHovered = hoveredCategory === badge.category;
  const isOtherBadgeHovered = hoveredCategory !== null && hoveredCategory !== badge.category;

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
        scale: {
          type: "spring",
          stiffness: 350,
          damping: 22,
          mass: 0.6,
        },
        filter: {
          type: "tween",
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: {
          type: "tween",
          duration: 0.25,
          ease: "easeOut",
        },
      }}
    >
      <Badge text={badge.text} isHovered={isBadgeHovered} />
    </motion.div>
  );
}

export default function SpaceSection({ onBadgeClick }: SpaceSectionProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const serviceMap: Record<string, string> = {
    "space-edit": "space-edit",
    "brand-space": "brand-spaces",
    "makeover-projects": "makeover-projects",
  };

  return (
    <motion.section
      className="relative w-full h-screen md:h-screen flex items-center justify-center bg-landing overflow-hidden md:overflow-hidden overflow-y-auto"
      style={{
        minHeight: typeof window !== 'undefined' && window.innerWidth < 768 ? '120vh' : '100vh',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Images */}
      {imagePositions.map((img, index) => (
        <SectionImageItem
          key={index}
          img={img}
          index={index}
          hoveredCategory={hoveredCategory}
        />
      ))}

      {/* Badges */}
      {badgePositions.map((badge, index) => (
        <BadgeItem
          key={`badge-${index}`}
          badge={badge}
          hoveredCategory={hoveredCategory}
          onHoverStart={() => setHoveredCategory(badge.category)}
          onHoverEnd={() => setHoveredCategory(null)}
          onClick={() => onBadgeClick(serviceMap[badge.category])}
        />
      ))}
    </motion.section>
  );
}