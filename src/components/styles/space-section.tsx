"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect, MouseEvent } from "react";
import TimedAudio from "@/components/audio/timed-audio";
import {
  useHoverUtilsAudio,
  UtilAudioSegment,
} from "@/components/audio/hovered-audio";
import BadgeItem, { BadgeType } from "@/components/ui/badge";
import FlickerWrapper from "@/components/flicker-wrapper";
import { useBreakpoint } from "@/hooks/useBreakPoints";

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

type SectionImage = {
  src: string;
  alt: string;
  dimensions: ResponsiveDimensions;
  position: ResponsivePosition;
  animation?: { x: number; y: number; opacity: number; rotate: number };
  category: string;
  zIndex?: number;
  utilId?: string;
  hasFlicker?: boolean;
};

interface SpaceSectionProps {
  onBadgeClick: (service: string) => void;
}

const springConfig = {
  stiffness: 150,
  damping: 20,
  mass: 0.5,
};

const spaceAudioUtils: UtilAudioSegment[] = [
  {
    id: "util-car",
    src: "/assets/sounds/page13/21-savage-redrum-1.mp3",
    start: 3,
    volume: 0.5,
  },
  {
    id: "util-plant",
    src: "/assets/sounds/page13/21-savage-redrum-2.mp3",
    start: 0,
    volume: 0.25,
  },
];

const imagePositions: readonly SectionImage[] = [
  {
    src: "/assets/images/people/main/space-edit2.png",
    alt: "heyy-text",
    dimensions: {
      mobile: { width: 0, height: 0 },
      tablet: { width: 0, height: 0 },
      desktop: { width: 150, height: 170 },
    },
    position: {
      mobile: { top: "8%", left: "30%" },
      tablet: { top: "7%", left: "25%" },
      desktop: { top: "10%", left: "18%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
    zIndex: 5,
  },
  {
    src: "/assets/images/people/main/space-edit1.png",
    alt: "Hanger",
    dimensions: {
      mobile: { width: 130, height: 100 },
      tablet: { width: 184, height: 136 },
      desktop: { width: 230, height: 170 },
    },
    position: {
      mobile: { top: "12%", left: "10%" },
      tablet: { top: "11%", left: "8%" },
      desktop: { top: "15%", left: "4%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
    zIndex: 4,
  },
  {
    src: "/assets/images/people/main/space-edit3.png",
    alt: "Disco-ball",
    dimensions: {
      mobile: { width: 75, height: 113 },
      tablet: { width: 104, height: 136 },
      desktop: { width: 130, height: 170 },
    },
    position: {
      mobile: { top: "16%", left: "22%" },
      tablet: { top: "23%", left: "16%" },
      desktop: { top: "22%", left: "12.6%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
    zIndex: 10,
    hasFlicker: true,
  },
  {
    src: "/assets/images/people/main/image78.png",
    alt: "favourite-person",
    dimensions: {
      mobile: { width: 0, height: 0 },
      tablet: { width: 0, height: 0 },
      desktop: { width: 100, height: 120 },
    },
    position: {
      mobile: { top: "12%", left: "54%" },
      tablet: { top: "5%", left: "10%" },
      desktop: { top: "12%", left: "8%" },
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
      mobile: { top: "32%", left: "19%" },
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
      mobile: { width: 110, height: 113 },
      tablet: { width: 120, height: 136 },
      desktop: { width: 150, height: 170 },
    },
    position: {
      mobile: { top: "43%", left: "63%" },
      tablet: { top: "30%", left: "42%" },
      desktop: { top: "27%", left: "33%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 20 },
    category: "brand-space",
    zIndex: 1,
  },
  {
    src: "/assets/images/space/main/image77.png",
    alt: "recorder",
    dimensions: {
      mobile: { width: 80, height: 113 },
      tablet: { width: 72, height: 136 },
      desktop: { width: 90, height: 170 },
    },
    position: {
      mobile: { top: "28%", left: "58%" },
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
      mobile: { width: 110, height: 113 },
      tablet: { width: 104, height: 136 },
      desktop: { width: 130, height: 170 },
    },
    position: {
      mobile: { top: "22%", left: "71%" },
      tablet: { top: "30%", left: "36%" },
      desktop: { top: "27%", left: "28%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-space",
    zIndex: 4,
    utilId: "util-plant",
  },
  {
    src: "/assets/images/space/main/image87.png",
    alt: "necklace",
    dimensions: {
      mobile: { width: 78, height: 113 },
      tablet: { width: 80, height: 136 },
      desktop: { width: 100, height: 170 },
    },
    position: {
      mobile: { top: "52%", left: "74%" },
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
      mobile: { width: 130, height: 113 },
      tablet: { width: 80, height: 136 },
      desktop: { width: 180, height: 170 },
    },
    position: {
      mobile: { top: "40%", left: "0%" },
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
      mobile: { width: 180, height: 133 },
      tablet: { width: 192, height: 160 },
      desktop: { width: 240, height: 200 },
    },
    position: {
      mobile: { top: "58%", left: "55%" },
      tablet: { top: "23%", left: "62%" },
      desktop: { top: "20%", left: "50%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-space",
    zIndex: 6,
    utilId: "util-car",
  },
  {
    src: "/assets/images/space/makeover/8.png",
    alt: "slippers",
    dimensions: {
      mobile: { width: 140, height: 133 },
      tablet: { width: 192, height: 160 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "42%", left: "33%" },
      tablet: { top: "23%", left: "62%" },
      desktop: { top: "80%", left: "15%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-space",
    zIndex: 6,
  },
  {
    src: "/assets/images/space/main/image79.png",
    alt: "cupboard",
    dimensions: {
      mobile: { width: 120, height: 133 },
      tablet: { width: 176, height: 160 },
      desktop: { width: 170, height: 180 },
    },
    position: {
      mobile: { top: "64%", left: "34%" },
      tablet: { top: "8%", left: "82%" },
      desktop: { top: "14%", left: "76%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 4,
  },
  {
    src: "/assets/images/space/main/image81.png",
    alt: "flower-pots",
    dimensions: {
      mobile: { width: 85, height: 133 },
      tablet: { width: 112, height: 160 },
      desktop: { width: 100, height: 160 },
    },
    position: {
      mobile: { top: "73%", left: "23%" },
      tablet: { top: "31%", left: "76%" },
      desktop: { top: "34%", left: "70%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 1,
  },
  {
    src: "/assets/images/space/main/image81.png",
    alt: "flower-pots-2",
    dimensions: {
      mobile: { width: 85, height: 133 },
      tablet: { width: 112, height: 160 },
      desktop: { width: 100, height: 160 },
    },
    position: {
      mobile: { top: "73%", left: "56%" },
      tablet: { top: "31%", left: "92%" },
      desktop: { top: "34%", left: "87%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 1,
  },
  {
    src: "/assets/images/space/main/image80.png",
    alt: "chair-1",
    dimensions: {
      mobile: { width: 90, height: 80 },
      tablet: { width: 96, height: 96 },
      desktop: { width: 120, height: 120 },
    },
    position: {
      mobile: { top: "85%", left: "39%" },
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
      mobile: { top: "89%", left: "65%" },
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
      mobile: { width: 180, height: 133 },
      tablet: { width: 192, height: 160 },
      desktop: { width: 240, height: 200 },
    },
    position: {
      mobile: { top: "94%", left: "30%" },
      tablet: { top: "69%", left: "80%" },
      desktop: { top: "66%", left: "74%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/main/image85.png",
    alt: "flower vase",
    dimensions: {
      mobile: { width: 65, height: 47 },
      tablet: { width: 56, height: 56 },
      desktop: { width: 70, height: 70 },
    },
    position: {
      mobile: { top: "88%", left: "42%" },
      tablet: { top: "59%", left: "83%" },
      desktop: { top: "56%", left: "79.5%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 5,
    hasFlicker: true,
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
      mobile: { top: "88%", left: "7%" },
      tablet: { top: "53%", left: "70%" },
      desktop: { top: "50%", left: "65%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 4,
  },
];

const badgePositions: readonly BadgeType[] = [
  {
    text: "SPACE EDIT",
    dimensions: {
      mobile: { width: 100, height: 28 },
      tablet: { width: 130, height: 36 },
      desktop: { width: 160, height: 44 },
    },
    position: {
      mobile: { top: "23%", left: "30%" },
      tablet: { top: "37%", left: "24%" },
      desktop: { top: "36%", left: "15%" },
    },
    category: "space-edit",
    zIndex: 31,
  },
  {
    text: "BRAND SPACES",
    dimensions: {
      mobile: { width: 130, height: 28 },
      tablet: { width: 160, height: 36 },
      desktop: { width: 200, height: 44 },
    },
    position: {
      mobile: { top: "54%", left: "34%" },
      tablet: { top: "70%", left: "40%" },
      desktop: { top: "67%", left: "30%" },
    },
    category: "brand-space",
    zIndex: 31,
  },
  {
    text: "MAKEOVER PROJECTS",
    dimensions: {
      mobile: { width: 170, height: 28 },
      tablet: { width: 210, height: 36 },
      desktop: { width: 260, height: 44 },
    },
    position: {
      mobile: { top: "108%", left: "27%" },
      tablet: { top: "77%", left: "84%" },
      desktop: { top: "74%", left: "72%" },
    },
    category: "makeover-projects",
    zIndex: 31,
  },
];

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
  const breakpoint = useBreakpoint();

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
  const [mounted, setMounted] = useState(false);

  const isCar = img.alt === "car";
  const isFavouritePerson = img.alt === "favourite-person";

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
        initial={{ opacity: 0, x: -30 }}
        animate={{
          x: mounted ? [0, -400, 0] : 0,
          scale: isHovered ? 1.25 : isOtherHovered ? 0.88 : 1,
          filter: isOtherHovered ? "blur(6px)" : "blur(0px)",
          opacity: mounted ? (isOtherHovered ? 0.45 : 1) : 1,
        }}
        transition={{
          x: mounted
            ? {
                duration: 5,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }
            : { duration: 0.5 },
          scale: { type: "spring", stiffness: 300, damping: 25, mass: 0.8 },
          filter: { type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          opacity: { type: "tween", duration: 0.5, ease: "easeOut" },
        }}
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
        scale: { type: "spring", stiffness: 300, damping: 25, mass: 0.8 },
        filter: { type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        opacity: isFavouritePerson
          ? {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : { type: "tween", duration: 0.3, ease: "easeOut" },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {img.hasFlicker ? (
        <FlickerWrapper enabled={true}>
          <Image
            src={img.src}
            alt={img.alt}
            width={img.dimensions[breakpoint].width}
            height={img.dimensions[breakpoint].height}
            className="object-contain pointer-events-none"
            priority={index < 2}
            draggable={false}
          />
        </FlickerWrapper>
      ) : (
        <Image
          src={img.src}
          alt={img.alt}
          width={img.dimensions[breakpoint].width}
          height={img.dimensions[breakpoint].height}
          className="object-contain pointer-events-none"
          priority={index < 2}
          draggable={false}
        />
      )}
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
  const { getHoverHandlers } = useHoverUtilsAudio(spaceAudioUtils, "");

  return (
    <motion.section
      className="relative w-full h-screen md:h-screen flex items-center justify-center bg-landing overflow-hidden md:overflow-hidden overflow-y-auto"
      style={{
        minHeight:
          typeof window !== "undefined" && window.innerWidth < 768
            ? "120vh"
            : "100vh",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Global audio toggle icon (silent placeholder) */}
      <TimedAudio
        src="/assets/sounds/page13/21-savage-redrum-2.mp3"
        start={0}
        volume={0}
        autoPlay={false}
        fixed
        loop={false}
        className="z-70"
      />

      {/* Images */}
      {imagePositions.map((img: SectionImage, index: number) => (
        <div
          key={index}
          {...(img.utilId
            ? getHoverHandlers({ id: img.utilId, disabledOnMobile: true })
            : {})}
        >
          <SectionImageItem
            img={img}
            index={index}
            hoveredCategory={hoveredCategory}
          />
        </div>
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