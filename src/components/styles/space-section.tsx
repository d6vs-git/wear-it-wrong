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
  //space-edit
  {
    src: "/assets/images/people/main/space-edit2.png",
    alt: "heyy-text ",
    width: 150,
    height: 170,
    position: { top: "5%", left: "18%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
  },
  {
    src: "/assets/images/people/main/space-edit1.png",
    alt: "Hanger",
    width: 230,
    height: 170,
    position: { top: "10%", left: "4%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
  },
  {
    src: "/assets/images/people/main/space-edit3.png",
    alt: "Disco-ball",
    width: 130,
    height: 170,
    position: { top: "22%", left: "12.6%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
  },
  {
    src: "/assets/images/people/main/image78.png",
    alt: "favourite-person",
    width: 110,
    height: 170,
    position: { top: "4%", left: "6%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
  },
  {
    src: "/assets/images/space/main/image54.jpg",
    alt: "portrait frame",
    width: 300,
    height: 300,
    position: { top: "55%", left: "5%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-space",
  },
  {
    src: "/assets/images/space/main/image90.png",
    alt: "photo frame",
    width: 150,
    height: 170,
    position: { top: "27%", left: "33%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 20 },
    category: "brand-space",
  },
  {
    src: "/assets/images/space/main/image77.png",
    alt: "recorder",
    width: 90,
    height: 170,
    position: { top: "42%", left: "23%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-space",
  },
  {
    src: "/assets/images/space/main/image88.png",
    alt: "pot plant",
    width: 130,
    height: 170,
    position: { top: "27%", left: "28%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-space",
  },
  {
    src: "/assets/images/space/main/image87.png",
    alt: "necklace",
    width: 100,
    height: 170,
    position: { top: "48%", left: "38%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: -15 },
    category: "brand-space",
  },
  {
    src: "/assets/images/space/main/image71.jpg",
    alt: "music-player",
    width: 100,
    height: 170,
    position: { top: "43%", left: "46%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
  },
  {
    src: "/assets/images/space/main/image76.png",
    alt: "car",
    width: 240,
    height: 200,
    position: { top: "20%", left: "50%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-space",
  },
  {
    src: "/assets/images/space/main/image79.png",
    alt: "cupboard",
    width: 220,
    height: 200,
    position: { top: "6%", left: "75%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
  },
  {
    src: "/assets/images/space/main/image81.png",
    alt: "flower-pots",
    width: 140,
    height: 200,
    position: { top: "28%", left: "68%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
  },
  {
    src: "/assets/images/space/main/image81.png",
    alt: "flower-pots-2",
    width: 140,
    height: 200,
    position: { top: "28%", left: "89%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
  },
  {
    src: "/assets/images/space/main/image80.png",
    alt: "chair-1",
    width: 120,
    height: 120,
    position: { top: "49%", left: "78%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
  },
  {
    src: "/assets/images/space/main/image82.png",
    alt: "chair-3",
    width: 180,
    height: 70,
    position: { top: "50%", left: "87%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
  },
  {
    src: "/assets/images/space/main/image84.png",
    alt: "table",
    width: 240,
    height: 200,
    position: { top: "66%", left: "74%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
  },
  {
    src: "/assets/images/space/main/image85.png",
    alt: "flower vase",
    width: 70,
    height: 70,
    position: { top: "56%", left: "79.5%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
  },
  {
    src: "/assets/images/space/main/image83.png",
    alt: "chair-2",
    width: 180,
    height: 70,
    position: { top: "50%", left: "65%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
  },
];

const badgePositions = [
  {
    text: "SPACE EDIT",
    position: { top: "36%", left: "15%" },
    category: "space-edit",
  },
  {
    text: "BRAND SPACES",
    position: { top: "67%", left: "30%" },
    category: "brand-space",
  },
  {
    text: "MAKEOVER PROJECTS",
    position: { top: "74%", left: "82%" },
    category: "makeover-projects",
  },
];

interface SpaceSectionProps {
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
  badge: typeof badgePositions[0];
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

export default function SpaceSection({ onBadgeClick }: SpaceSectionProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const serviceMap: Record<string, string> = {
    "space-edit": "space-edit",
    "brand-space": "brand-spaces",
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