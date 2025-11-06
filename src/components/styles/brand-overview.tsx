"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useRef, MouseEvent } from "react";
import Badge from "@/components/badge";

// Smooth spring configuration for buttery animations
const springConfig = {
  stiffness: 150,
  damping: 20,
  mass: 0.5,
};

const imagePositions = [
  // SPACE EDIT SECTION (Top Left)
  {
    src: "/assets/images/brand-overview/space-edit/hangover-clothes.png",
    alt: "hanger with text",
    width: 150,
    height: 170,
    position: { top: "8%", left: "5%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
  },
  {
    src: "/assets/images/brand-overview/space-edit/pink-pot.png",
    alt: "plant in pot",
    width: 120,
    height: 140,
    position: { top: "12%", left: "12%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
  },
  {
    src: "/assets/images/brand-overview/space-edit/radio-caset.png",
    alt: "cassette recorder",
    width: 100,
    height: 120,
    position: { top: "18%", left: "8%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
  },

  // WARDROBE DETOX SECTION (Left)
  {
    src: "/assets/images/brand-overview/wardrobe-detox/hangover-clothes.png",
    alt: "coat on hanger",
    width: 160,
    height: 200,
    position: { top: "30%", left: "4%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "wardrobe-detox",
  },
  {
    src: "/assets/images/brand-overview/wardrobe-detox/hand-bags.png",
    alt: "clothing hanger",
    width: 90,
    height: 90,
    position: { top: "25%", left: "10%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "wardrobe-detox",
  },

  // PACKAGES AND OFFERS (Bottom Left)
  {
    src: "/assets/images/brand-overview/style-drop/cd.png",
    alt: "vinyl record",
    width: 140,
    height: 140,
    position: { top: "68%", left: "2%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "package-offers",
  },
  {
    src: "/assets/images/brand-overview/style-drop/paper.png",
    alt: "style papers",
    width: 180,
    height: 200,
    position: { top: "62%", left: "11%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "package-offers",
  },

  // STYLE DROP (Left-Center)
  {
    src: "/assets/images/brand-overview/.png",
    alt: "shopping bags",
    width: 220,
    height: 180,
    position: { top: "48%", left: "8%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "style-drop",
  },

  // CONCEPT DEVELOPMENT (Center-Top)
  {
    src: "/assets/images/brand-overview/concept-development/old-cafe.png",
    alt: "building sketch",
    width: 280,
    height: 280,
    position: { top: "15%", left: "32%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
  },
  {
    src: "/assets/images/brand-overview/concept-development/blue-cafe.png",
    alt: "cafe interior",
    width: 200,
    height: 200,
    position: { top: "28%", left: "42%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
  },

  // OCCASION STYLING (Center)
  {
    src: "/assets/images/brand-overview/occasion-styling/girl-painting.png",
    alt: "portrait frame",
    width: 150,
    height: 180,
    position: { top: "25%", left: "24%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: -25 },
    category: "occasion-styling",
  },
  {
    src: "/assets/images/brand-overview/occasion-styling/girl-painting.png",
    alt: "colorful items",
    width: 280,
    height: 260,
    position: { top: "45%", left: "28%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "occasion-styling",
  },
  {
    src: "/assets/images/brand-overview/occasion-3.png",
    alt: "shopping interface",
    width: 160,
    height: 180,
    position: { top: "40%", left: "18%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "occasion-styling",
  },

  // PERSONAL SHOPPER (Center-Bottom)
  {
    src: "/assets/images/brand-overview/personal-1.png",
    alt: "people group",
    width: 320,
    height: 280,
    position: { top: "55%", left: "35%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "personal-shopper",
  },

  // VISUAL MERCHANDISING (Top Right)
  {
    src: "/assets/images/brand-overview/merch-1.png",
    alt: "cafe design",
    width: 340,
    height: 300,
    position: { top: "12%", left: "58%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "visual-merchandising",
  },
  {
    src: "/assets/images/brand-overview/merch-2.png",
    alt: "people in shop",
    width: 240,
    height: 260,
    position: { top: "28%", left: "72%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "visual-merchandising",
  },

  // BRAND SHOOTS (Top Right)
  {
    src: "/assets/images/brand-overview/shoots-1.png",
    alt: "fashion illustration",
    width: 240,
    height: 200,
    position: { top: "8%", left: "82%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-shoots",
  },
  {
    src: "/assets/images/brand-overview/shoots-2.png",
    alt: "pink car",
    width: 180,
    height: 120,
    position: { top: "38%", left: "68%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-shoots",
  },

  // BRAND SPACES (Right)
  {
    src: "/assets/images/brand-overview/brand-spaces-1.png",
    alt: "music player setup",
    width: 180,
    height: 160,
    position: { top: "45%", left: "58%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-spaces",
  },

  // MAKEOVER PROJECTS (Bottom Right)
  {
    src: "/assets/images/brand-overview/makeover-1.png",
    alt: "blue cabinet",
    width: 200,
    height: 260,
    position: { top: "15%", left: "88%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
  },
  {
    src: "/assets/images/brand-overview/makeover-2.png",
    alt: "wooden table setup",
    width: 280,
    height: 220,
    position: { top: "58%", left: "78%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
  },
  {
    src: "/assets/images/brand-overview/makeover-3.png",
    alt: "chair details",
    width: 140,
    height: 100,
    position: { top: "68%", left: "88%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
  },
];

const badgePositions = [
  {
    text: "SPACE EDIT",
    position: { top: "14%", left: "8%" },
    category: "space-edit",
  },
  {
    text: "WARDROBE DETOX",
    position: { top: "35%", left: "8%" },
    category: "wardrobe-detox",
  },
  {
    text: "PACKAGES AND OFFERS",
    position: { top: "75%", left: "8%" },
    category: "package-offers",
  },
  {
    text: "STYLE DROP",
    position: { top: "58%", left: "12%" },
    category: "style-drop",
  },
  {
    text: "CONCEPT DEVELOPMENT",
    position: { top: "45%", left: "38%" },
    category: "concept",
  },
  {
    text: "OCCASION STYLING",
    position: { top: "52%", left: "22%" },
    category: "occasion-styling",
  },
  {
    text: "PERSONAL SHOPPER",
    position: { top: "78%", left: "35%" },
    category: "personal-shopper",
  },
  {
    text: "VISUAL MERCHANDISING",
    position: { top: "22%", left: "65%" },
    category: "visual-merchandising",
  },
  {
    text: "BRAND SHOOTS",
    position: { top: "28%", left: "82%" },
    category: "brand-shoots",
  },
  {
    text: "BRAND SPACES",
    position: { top: "52%", left: "65%" },
    category: "brand-spaces",
  },
  {
    text: "MAKEOVER PROJECTS",
    position: { top: "78%", left: "82%" },
    category: "makeover-projects",
  },
];

interface UnifiedSectionProps {
  onBadgeClick: (service: string) => void;
}

type SectionImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: { top: string; left: string };
  animation?: { x: number; y: number; opacity: number; rotate: number };
  category: string;
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

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const isHovered = hoveredCategory === img.category;
  const isOtherHovered =
    hoveredCategory !== null && hoveredCategory !== img.category;

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
      className="absolute z-20 cursor-pointer"
      style={{
        top: img.position.top,
        left: img.position.left,
        transform: "translate(-50%, -50%)",
        x: springX,
        y: springY,
        rotateX: springRotateX,
        rotateY: springRotateY,
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
        width={img.width}
        height={img.height}
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
  badge: (typeof badgePositions)[0];
  hoveredCategory: string | null;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
      className="absolute z-30 cursor-pointer"
      style={{
        top: badge.position.top,
        left: badge.position.left,
        transform: "translate(-50%, -50%)",
        x: springX,
        y: springY,
        rotate: springRotateZ,
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

export default function UnifiedServicesSection({
  onBadgeClick,
}: UnifiedSectionProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const serviceMap: Record<string, string> = {
    "space-edit": "space-edit",
    "wardrobe-detox": "wardrobe-detox",
    "package-offers": "package-offers",
    "style-drop": "style-drop",
    concept: "concept-development",
    "occasion-styling": "occasion-styling",
    "personal-shopper": "personal-shopping",
    "visual-merchandising": "visual-merchandising",
    "brand-shoots": "brand-shoots",
    "brand-spaces": "brand-spaces",
    "makeover-projects": "makeover-projects",
  };

  return (
    <motion.section
      className="relative w-full h-screen flex items-center justify-center bg-landing overflow-hidden"
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
