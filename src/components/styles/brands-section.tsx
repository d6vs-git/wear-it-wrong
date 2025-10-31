"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useRef, MouseEvent } from "react";
import Badge from "../badge";

// Smooth spring configuration for buttery animations
const springConfig = {
  stiffness: 150,
  damping: 20,
  mass: 0.5,
};

const imagePositions = [
  //Merchandising images
  {
    src: "/assets/images/brand/concept-development/2.png",
    alt: "cafe -> mon bar a couture",
    width: 440,
    height: 400,
    position: { top: "10%", left: "43%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "merchandising",
  },
  {
    src: "/assets/images/brand/concept-development/6.png",
    alt: "cafe-2",
    width: 370,
    height: 370,
    position: { top: "17%", left: "28%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "merchandising",
  },
  {
    src: "/assets/images/brand/concept-development/7.png",
    alt: "chairs ",
    width: 250,
    height: 250,
    position: { top: "49%", left: "30%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "merchandising",
  },
  {
    src: "/assets/images/brand/main/image69.png",
    alt: "M symbol",
    width: 50,
    height: 50,
    position: { top: "36.5%", left: "48%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "merchandising",
  },
  {
    src: "/assets/images/brand/main/image70.png",
    alt: "V symbol",
    width: 50,
    height: 50,
    position: { top: "34%", left: "36%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "merchandising",
  },
  //concept-development image
  {
    src: "/assets/images/brand/concept-development/9.png",
    alt: "cafe-23vins Hotel",
    width: 300,
    height: 300,
    position: { top: "14%", left: "1.5%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
  },
  {
    src: "/assets/images/brand/concept-development/8.png",
    alt: "cafe-23vins Hotel-2",
    width: 300,
    height: 300,
    position: { top: "52%", left: "6%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
  },
  {
    src: "/assets/images/brand/main/image62.png",
    alt: "my-girl",
    width: 110,
    height: 110,
    position: { top: "54%", left: "7.5%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
  },
  {
    src: "/assets/images/space/main/makeover1.png",
    alt: "cat",
    width: 60,
    height: 50,
    position: { top: "61%", left: "8%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
  },
  {
    src: "/assets/images/brand/main/image64.png",
    alt: "women with dog ",
    width: 170,
    height: 150,
    position: { top: "67%", left: "12%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
  },
  //brand-shoot images
  {
    src: "/assets/images/brand/concept-development/1.png",
    alt: "apartment ",
    width: 500,
    height: 500,
    position: { top: "35%", left: "65%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brandShoot",
  },
  {
    src: "/assets/images/brand/main/image65.png",
    alt: "ladies group ",
    width: 300,
    height: 300,
    position: { top: "27%", left: "75%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brandShoot",
  },
  {
    src: "/assets/images/brand/main/brand-shoots2.png",
    alt: "camera ",
    width: 230,
    height: 230,
    position: { top: "19%", left: "76%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: -110 },
    category: "brandShoot",
  },
];

const badgePositions = [
  {
    text: "VISUAL MERCHANDISING",
    position: { top: "28%", left: "37%" },
    category: "merchandising",
  },
  {
    text: "CONCEPT DEVELOPMENT",
    position: { top: "67%", left: "30%" },
    category: "concept",
  },
  {
    text: "BRAND SHOOTS",
    position: { top: "74%", left: "82%" },
    category: "brandShoot",
  },
];

interface BrandSectionProps {
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

export default function BrandSection({ onBadgeClick }: BrandSectionProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const serviceMap: Record<string, string> = {
    merchandising: "visual-merchandising",
    concept: "concept-development",
    brandShoot: "brand-shoots",
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