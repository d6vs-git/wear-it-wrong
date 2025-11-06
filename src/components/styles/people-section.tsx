"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useRef, MouseEvent, useEffect } from "react";
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
  //wardrobe-detox
  {
    src: "/assets/images/people/main/wardrobe-detox.png",
    alt: "jacket on hanger",
    dimensions: {
      mobile: { width: 160, height: 160 },
      tablet: { width: 200, height: 200 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "15%", left: "50%" },
      tablet: { top: "15%", left: "20%" },
      desktop: { top: "22%", left: "20%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "wardrobe-detox",
    zIndex: 4,
  },
  {
    src: "/assets/images/people/main/image49.png",
    alt: "nob",
    dimensions: {
      mobile: { width: 60, height: 60 },
      tablet: { width: 80, height: 80 },
      desktop: { width: 70, height: 70 },
    },
    position: {
      mobile: { top: "15%", left: "20%" },
      tablet: { top: "15%", left: "8%" },
      desktop: { top: "22%", left: "8%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: -30 },
    category: "wardrobe-detox",
    zIndex: 5,
  },
  {
    src: "/assets/images/people/main/image47.png",
    alt: "music player cd",
    dimensions: {
      mobile: { width: 130, height: 145 },
      tablet: { width: 180, height: 200 },
      desktop: { width: 160, height: 180 },
    },
    position: {
      mobile: { top: "55%", left: "20%" },
      tablet: { top: "65%", left: "4%" },
      desktop: { top: "75%", left: "4%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "package-offers",
    zIndex: 4,
  },
  {
    src: "/assets/images/people/main/image42.png",
    alt: "paper",
    dimensions: {
      mobile: { width: 200, height: 200 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 260, height: 260 },
    },
    position: {
      mobile: { top: "60%", left: "40%" },
      tablet: { top: "58%", left: "18%" },
      desktop: { top: "68%", left: "18%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "style-drop",
    zIndex: 3,
  },
  {
    src: "/assets/images/people/main/image44.png",
    alt: "paper-2",
    dimensions: {
      mobile: { width: 120, height: 145 },
      tablet: { width: 180, height: 220 },
      desktop: { width: 160, height: 200 },
    },
    position: {
      mobile: { top: "64%", left: "43%" },
      tablet: { top: "64%", left: "22%" },
      desktop: { top: "74%", left: "22%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "style-drop",
    zIndex: 4,
  },
  {
    src: "/assets/images/people/main/image41.jpg",
    alt: "web-view",
    dimensions: {
      mobile: { width: 170, height: 170 },
      tablet: { width: 260, height: 260 },
      desktop: { width: 230, height: 230 },
    },
    position: {
      mobile: { top: "61%", left: "67%" },
      tablet: { top: "59%", left: "40%" },
      desktop: { top: "69%", left: "40%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "style-drop",
    zIndex: 3,
  },
  {
    src: "/assets/images/people/main/image55.png",
    alt: "blocks",
    dimensions: {
      mobile: { width: 70, height: 140 },
      tablet: { width: 110, height: 220 },
      desktop: { width: 100, height: 200 },
    },
    position: {
      mobile: { top: "69%", left: "57%" },
      tablet: { top: "70%", left: "33%" },
      desktop: { top: "80%", left: "33%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "style-drop",
    zIndex: 4,
  },
  {
    src: "/assets/images/people/main/image53.png",
    alt: "bags",
    dimensions: {
      mobile: { width: 180, height: 180 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 260, height: 260 },
    },
    position: {
      mobile: { top: "8%", left: "75%" },
      tablet: { top: "-3%", left: "37%" },
      desktop: { top: "10%", left: "37%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "wardrobe-detox",
    zIndex: 3,
  },
  {
    src: "/assets/images/people/main/personal-shopper1.png",
    alt: "2-ppl-walk",
    dimensions: {
      mobile: { width: 170, height: 195 },
      tablet: { width: 260, height: 300 },
      desktop: { width: 230, height: 260 },
    },
    position: {
      mobile: { top: "37%", left: "70%" },
      tablet: { top: "51%", left: "54%" },
      desktop: { top: "60%", left: "54%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "occasion-styling",
    zIndex: 4,
  },
  {
    src: "/assets/images/people/main/image21.png",
    alt: "girl-with bag",
    dimensions: {
      mobile: { width: 110, height: 180 },
      tablet: { width: 180, height: 300 },
      desktop: { width: 160, height: 260 },
    },
    position: {
      mobile: { top: "30%", left: "85%" },
      tablet: { top: "36%", left: "66%" },
      desktop: { top: "42%", left: "66%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "occasion-styling",
    zIndex: 4,
  },
  {
    src: "/assets/images/people/main/personal-shopper2.png",
    alt: "girl-with dog",
    dimensions: {
      mobile: { width: 145, height: 195 },
      tablet: { width: 220, height: 300 },
      desktop: { width: 190, height: 260 },
    },
    position: {
      mobile: { top: "100%", left: "50%" },
      tablet: { top: "48%", left: "79%" },
      desktop: { top: "56%", left: "79%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "personal-shopper",
    zIndex: 4,
  },
  {
    src: "/assets/images/people/main/image.png",
    alt: "beauty-products",
    dimensions: {
      mobile: { width: 280, height: 195 },
      tablet: { width: 430, height: 300 },
      desktop: { width: 370, height: 260 },
    },
    position: {
      mobile: { top: "92%", left: "50%" },
      tablet: { top: "6%", left: "72%" },
      desktop: { top: "18%", left: "72%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "personal-shopper",
    zIndex: 3,
  },
  {
    src: "/assets/images/people/main/image72.jpg",
    alt: "photo-frame",
    dimensions: {
      mobile: { width: 70, height: 70 },
      tablet: { width: 110, height: 110 },
      desktop: { width: 95, height: 95 },
    },
    position: {
      mobile: { top: "32%", left: "55%" },
      tablet: { top: "32%", left: "52%" },
      desktop: { top: "38%", left: "52%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: -30 },
    category: "occasion-styling",
    zIndex: 5,
  },
];

const badgePositions = [
  {
    text: "WARDROBE DETOX",
    dimensions: {
      mobile: { width: 156, height: 26 },
      tablet: { width: 195, height: 32 },
      desktop: { width: 260, height: 56 },
    },
    position: {
      mobile: { top: "20%", left: "35%" },
      tablet: { top: "19%", left: "10%" },
      desktop: { top: "26%", left: "10%" },
    },
    category: "wardrobe-detox",
    zIndex: 31,
  },
  {
    text: "PACKAGE AND OFFERS",
    dimensions: {
      mobile: { width: 185, height: 26 },
      tablet: { width: 231, height: 32 },
      desktop: { width: 308, height: 56 },
    },
    position: {
      mobile: { top: "62%", left: "55%" },
      tablet: { top: "53%", left: "4%" },
      desktop: { top: "63%", left: "4%" },
    },
    category: "package-offers",
    zIndex: 31,
  },
  {
    text: "OCCASION STYLING",
    dimensions: {
      mobile: { width: 164, height: 26 },
      tablet: { width: 205, height: 32 },
      desktop: { width: 273, height: 56 },
    },
    position: {
      mobile: { top: "43%", left: "75%" },
      tablet: { top: "47%", left: "49%" },
      desktop: { top: "54%", left: "49%" },
    },
    category: "occasion-styling",
    zIndex: 31,
  },
  {
    text: "STYLE DROP",
    dimensions: {
      mobile: { width: 106, height: 26 },
      tablet: { width: 133, height: 32 },
      desktop: { width: 177, height: 56 },
    },
    position: {
      mobile: { top: "78%", left: "50%" },
      tablet: { top: "89%", left: "19%" },
      desktop: { top: "88%", left: "19%" },
    },
    category: "style-drop",
    zIndex: 31,
  },
  {
    text: "PERSONAL SHOPPER",
    dimensions: {
      mobile: { width: 177, height: 26 },
      tablet: { width: 221, height: 32 },
      desktop: { width: 295, height: 56 },
    },
    position: {
      mobile: { top: "108%", left: "50%" },
      tablet: { top: "90%", left: "72%" },
      desktop: { top: "88%", left: "72%" },
    },
    category: "personal-shopper",
    zIndex: 31,
  },
];

interface PeopleSectionProps {
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
        zIndex: img.zIndex ?? 20,
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
        opacity: isOtherHovered ? 0.45 : 1,
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
        opacity: { 
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
        zIndex: badge.zIndex ?? 30,
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
      <Badge 
        text={badge.text} 
        isHovered={isBadgeHovered}
      />
    </motion.div>
  );
}

export default function PeopleSection({ onBadgeClick }: PeopleSectionProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const serviceMap: Record<string, string> = {
    "wardrobe-detox": "wardrobe-detox",
    "package-offers": "package-offers",
    "occasion-styling": "occasion-styling",
    "style-drop": "style-drop",
    "personal-shopper": "personal-shopping",
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