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
    src: "/assets/images/people/main/wardrobe-detox.png",
    alt: "jacket on hanger ",
    width: 200,
    height: 200,
    position: { top: "15%", left: "20%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "wardrobe-detox",
  },
  {
    src: "/assets/images/people/main/image49.png",
    alt: "nob ",
    width: 80,
    height: 80,
    position: { top: "15%", left: "8%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: -30 },
    category: "wardrobe-detox",
  },
  {
    src: "/assets/images/people/main/image47.png",
    alt: "music player cd ",
    width: 180,
    height: 200,
    position: { top: "65%", left: "4%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "package-offers",
  },
  {
    src: "/assets/images/people/main/image42.png",
    alt: "paper ",
    width: 300,
    height: 300,
    position: { top: "58%", left: "18%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "style-drop",
  },
  {
    src: "/assets/images/people/main/image44.png",
    alt: "paper -2",
    width: 180,
    height: 220,
    position: { top: "64%", left: "22%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "style-drop",
  },
  {
    src: "/assets/images/people/main/image41.jpg",
    alt: "web-view",
    width: 260,
    height: 260,
    position: { top: "59%", left: "40%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "style-drop",
  },
  {
    src: "/assets/images/people/main/image55.png",
    alt: "blocks",
    width: 110,
    height: 220,
    position: { top: "70%", left: "33%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "style-drop",
  },
  {
    src: "/assets/images/people/main/image53.png",
    alt: "bags",
    width: 300,
    height: 300,
    position: { top: "-3%", left: "37%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "wardrobe-detox",
  },
  {
    src: "/assets/images/people/main/personal-shopper1.png",
    alt: "2-ppl-walk",
    width: 260,
    height: 300,
    position: { top: "51%", left: "54%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "occasion-styling",
  },
  {
    src: "/assets/images/people/main/image21.png",
    alt: "girl-with bag",
    width: 180,
    height: 300,
    position: { top: "36%", left: "66%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "occasion-styling",
  },
  {
    src: "/assets/images/people/main/personal-shopper2.png",
    alt: "girl-with dog",
    width: 220,
    height: 300,
    position: { top: "48%", left: "79%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "personal-shopper",
  },
  {
    src: "/assets/images/people/main/image.png",
    alt: "beauty-products",
    width: 430,
    height: 300,
    position: { top: "6%", left: "72%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "personal-shopper",
  },
  {
    src: "/assets/images/people/main/image72.jpg",
    alt: "photo-frame",
    width: 110,
    height: 110,
    position: { top: "32%", left: "52%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: -30 },
    category: "occasion-styling",
  },
];

const badgePositions = [
  {
    text: "WARDROBE DETOX",
    position: { top: "19%", left: "10%" },
    category: "wardrobe-detox",
  },
  {
    text: "PACKAGE AND OFFERS",
    position: { top: "53%", left: "4%" },
    category: "package-offers",
  },
  {
    text: "OCCASION STYLING",
    position: { top: "47%", left: "49%" },
    category: "occasion-styling",
  },
  {
    text: "STYLE DROP",
    position: { top: "89%", left: "19%" },
    category: "style-drop",
  },
  {
    text: "PERSONAL SHOPPER",
    position: { top: "90%", left: "72%" },
    category: "personal-shopper",
  },
];

interface PeopleSectionProps {
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