"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useRef, MouseEvent, useEffect } from "react";
import BadgeItem, { BadgeType } from "@/components/ui/badge";
import TimedAudio from "../audio/timed-audio";
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
      mobile: { width: 120, height: 180 },
      tablet: { width: 200, height: 200 },
      desktop: { width: 220, height: 220 },
    },
    position: {
      mobile: { top: "6%", left: "56%" },
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
      mobile: { width: 65, height: 65 },
      tablet: { width: 80, height: 80 },
      desktop: { width: 110, height: 110 },
    },
    position: {
      mobile: { top: "7%", left: "17%" },
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
      mobile: { width: 140, height: 155 },
      tablet: { width: 180, height: 200 },
      desktop: { width: 170, height: 180 },
    },
    position: {
      mobile: { top: "16%", left: "24%" },
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
      mobile: { width: 185, height: 185 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 280, height: 280 },
    },
    position: {
      mobile: { top: "33%", left: "10%" },
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
      mobile: { width: 180, height: 140 },
      tablet: { width: 180, height: 220 },
      desktop: { width: 180, height: 200 },
    },
    position: {
      mobile: { top: "32%", left: "10%" },
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
      mobile: { width: 250, height: 160 },
      tablet: { width: 260, height: 260 },
      desktop: { width: 240, height: 240 },
    },
    position: {
      mobile: { top: "73%", left: "15%" },  
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
      mobile: { width: 150, height: 150 },
      tablet: { width: 110, height: 220 },
      desktop: { width: 140, height: 240 },
    },
    position: {
      mobile: { top: "34%", left: "42%" },
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
      mobile: { width: 220, height: 170 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "15%", left: "55%" },
      tablet: { top: "-3%", left: "37%" },
      desktop: { top: "10%", left: "37%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "wardrobe-detox",
    zIndex: 9,
  },
  {
    src: "/assets/images/people/main/personal-shopper1.png",
    alt: "2-ppl-walk",
    dimensions: {
      mobile: { width: 180, height: 185 },
      tablet: { width: 260, height: 300 },
      desktop: { width: 250, height: 280 },
    },
    position: {
      mobile: { top: "95%", left: "10%" },
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
      mobile: { width: 120, height: 185 },
      tablet: { width: 180, height: 300 },
      desktop: { width: 180, height: 280 },
    },
    position: {
      mobile: { top: "60%", left: "9%" },
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
      mobile: { width: 165, height: 180 },
      tablet: { width: 220, height: 300 },
      desktop: { width: 230, height: 300 },
    },
    position: {
      mobile: { top: "70%", left: "41%" },
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
      mobile: { width: 260, height: 180 },
      tablet: { width: 430, height: 300 },
      desktop: { width: 410, height: 300 },
    },
    position: {
      mobile: { top: "43%", left: "56%" },
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
      mobile: { width: 60, height: 75 },
      tablet: { width: 110, height: 110 },
      desktop: { width: 120, height: 120 },
    },
    position: {
      mobile: { top: "100%", left: "61%" },
      tablet: { top: "32%", left: "52%" },
      desktop: { top: "38%", left: "52%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: -30 },
    category: "occasion-styling",
    zIndex: 11,
  },
];

const badgePositions: readonly BadgeType[] = [
  {
    text: "WARDROBE DETOX",
    dimensions: {
      mobile: { width: 150, height: 28 },
      tablet: { width: 200, height: 36 },
      desktop: { width: 230, height: 44 },
    },
    position: {
      mobile: { top: "10%", left: "25%" },
      tablet: { top: "23%", left: "29%" },
      desktop: { top: "30%", left: "29%" },
    },
    category: "wardrobe-detox",
    zIndex: 50,
  },
  {
    text: "OCCASION STYLING",
    dimensions: {
      mobile: { width: 170, height: 28 },
      tablet: { width: 220, height: 36 },
      desktop: { width: 260, height: 44 },
    },
    position: {
      mobile: { top: "108%", left: "40%" },
      tablet: { top: "47%", left: "37%" },
      desktop: { top: "51%", left: "37%" },
    },
    category: "occasion-styling",
    zIndex: 50,
  },
  {
    text: "STYLE DROP",
    dimensions: {
      mobile: { width: 110, height: 28 },
      tablet: { width: 145, height: 36 },
      desktop: { width: 170, height: 44 },
    },
    position: {
      mobile: { top: "51%", left: "30%" },
      tablet: { top: "74%", left: "43%" },
      desktop: { top: "82%", left: "43%" },
    },
    category: "style-drop",
    zIndex: 50,
  },
  {
    text: "PERSONAL SHOPPER",
    dimensions: {
      mobile: { width: 180, height: 28 },
      tablet: { width: 230, height: 36 },
      desktop: { width: 270, height: 44 },
    },
    position: {
      mobile: { top: "67%", left: "24%" },
      tablet: { top: "59%", left: "55%" },
      desktop: { top: "66%", left: "75%" },
    },
    category: "personal-shopper",
    zIndex: 50,
  },
  {
    text: "PACKAGE AND OFFERS",
    dimensions: {
      mobile: { width: 195, height: 28 },
      tablet: { width: 260, height: 36 },
      desktop: { width: 300, height: 44 },
    },
    position: {
      mobile: { top: "27%", left: "5%" },
      tablet: { top: "75%", left: "8%" },
      desktop: { top: "84%", left: "8%" },
    },
    category: "package-offers",
    zIndex: 50,
  },
];

interface PeopleSectionProps {
  onBadgeClick: (service: string) => void;
}

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
  onDogHover,
  onCdHover,
  onPaperHover,
}: {
  img: SectionImage;
  index: number;
  hoveredCategory: string | null;
  onDogHover?: (hovering: boolean) => void;
  onCdHover?: (hovering: boolean) => void;
  onPaperHover?: (hovering: boolean) => void;
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
    if (onDogHover) onDogHover(false);
    if (onCdHover) onCdHover(false);
    if (onPaperHover) onPaperHover(false);
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
      onMouseEnter={() => {
        if (onDogHover) onDogHover(true);
        if (onCdHover) onCdHover(true);
        if (onPaperHover) onPaperHover(true);
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

// Smooth fade helper (clamps volume)
function fadeAudio(audio: HTMLAudioElement, target: number, duration: number) {
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  const start = clamp(audio.volume);
  const end = clamp(target);
  const diff = end - start;
  if (diff === 0) return;
  const startTime = performance.now();
  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / (duration * 1000), 1);
    audio.volume = clamp(start + diff * progress);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
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

  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const segmentRef = useRef<HTMLAudioElement | null>(null);
  const barkRef = useRef<HTMLAudioElement | null>(null);
  const barkTimeoutRef = useRef<number | null>(null);
  const cdHoveringRef = useRef(false);

  // Handle CD hover controlled segment playback with clamped volume
  useEffect(() => {
    const seg = segmentRef.current;
    if (!seg) return;
    const BASE_VOL = 0.35;
    const onTime = () => {
      if (!cdHoveringRef.current) return;
      if (seg.currentTime >= 45) {
        seg.currentTime = 40;
        seg.volume = BASE_VOL;
        seg.play().catch(()=>{});
      } else if (seg.currentTime >= 44.6) {
        const remaining = Math.max(0, 45 - seg.currentTime);
        const proportion = Math.max(0, Math.min(1, remaining / 0.4));
        const vol = Math.max(0, Math.min(1, BASE_VOL * proportion));
        seg.volume = vol;
      } else if (seg.currentTime < 40) {
        seg.currentTime = 40;
      }
    };
    seg.addEventListener("timeupdate", onTime);
    return () => seg.removeEventListener("timeupdate", onTime);
  }, []);

  const handleDogHover = (hovering: boolean) => {
    const bark = barkRef.current;
    if (!bark) return;
    if (hovering) {
      if (barkTimeoutRef.current) {
        clearTimeout(barkTimeoutRef.current);
        barkTimeoutRef.current = null;
      }
      bark.currentTime = 0;
      bark.volume = 0.6;
      bark.play().catch(()=>{});
      barkTimeoutRef.current = window.setTimeout(() => {
        bark.pause();
        bark.currentTime = 0;
        barkTimeoutRef.current = null;
      }, 5000);
    } else {
      if (barkTimeoutRef.current) {
        clearTimeout(barkTimeoutRef.current);
        barkTimeoutRef.current = null;
      }
      bark.pause();
      bark.currentTime = 0;
    }
  };

  const handleCdHover = (hovering: boolean) => {
    const seg = segmentRef.current;
    if (!seg) return;
    const BASE_VOL = 0.35;
    cdHoveringRef.current = hovering;
    if (hovering) {
      seg.currentTime = 40;
      seg.volume = 0;
      seg.play().catch(()=>{});
      fadeAudio(seg, BASE_VOL, 0.7);
    } else {
      fadeAudio(seg, 0, 0.5);
      setTimeout(() => {
        if (!cdHoveringRef.current) {
          seg.pause();
          seg.currentTime = 40;
          seg.volume = BASE_VOL;
        }
      }, 500);
    }
  };

  const handlePaperHover = (hovering: boolean) => {
    const rustle = ambientRef.current;
    if (!rustle) return;
    if (hovering) {
      rustle.currentTime = 0;
      rustle.volume = 0.2;
      rustle.loop = false;
      rustle.play().catch(()=>{});
    } else {
      rustle.pause();
      rustle.currentTime = 0;
    }
  };

  return (
    <div className="absolute inset-0">
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
        <TimedAudio
          src="/assets/sounds/page9/21-savage-redrum-3.mp3"
          start={0}
          volume={0.0}
          autoPlay={false}
          fixed
          loop={false}
          className="z-70"
        />

        {/* Hidden audio elements */}
        <audio ref={ambientRef} src="/assets/sounds/page4/21-savage-redrum-3.mp3" preload="auto" playsInline />
        <audio ref={segmentRef} src="/assets/sounds/page4/21-savage-redrum-1.mp3" preload="auto" playsInline />
        <audio ref={barkRef} src="/assets/sounds/page4/21-savage-redrum-4.mp3" preload="auto" playsInline />

        {/* Images */}
        {imagePositions.map((img, index) => (
          <SectionImageItem
            key={index}
            img={img}
            index={index}
            hoveredCategory={hoveredCategory}
            onDogHover={img.src.includes("personal-shopper2.png") ? handleDogHover : undefined}
            onCdHover={img.src.includes("image47.png") ? handleCdHover : undefined}
            onPaperHover={img.src.includes("image42.png") || img.src.includes("image44.png") ? handlePaperHover : undefined}
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
    </div>
  );
}