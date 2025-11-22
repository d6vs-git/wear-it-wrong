"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useRef, MouseEvent, useEffect } from "react";
import Badge from "../badge";
import { useHoverUtilsAudio } from "@/components/audio/useHoverUtilsAudio";

// Page 9 util audio config (ids used by images via utilId)
const page9Utils = [
  {
    id: "util-camera",
    src: "/assets/sounds/page9/camera_click.mp3",
    start: 0,
    volume: 0.55,
  },
  {
    id: "util-chairs",
    src: "/assets/sounds/page9/chiar_noise_people_walking.mp3",
    start: 0,
    volume: 0.45,
    loopSegment: true,
    end: 4.5,
    fadeDuration: 0.6,
  },
  {
    id: "util-people",
    src: "/assets/sounds/page9/people_walking.mp3",
    start: 0,
    volume: 0.5,
    loopSegment: true,
    end: 5.2,
    fadeDuration: 0.6,
  },
] as const;

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

// Add utilId to images for hover sounds
const imagePositions = [
  {
    src: "/assets/images/brand/concept-development/2.png",
    alt: "cafe -> mon bar a couture",
    dimensions: {
      mobile: { width: 330, height: 300 },
      tablet: { width: 330, height: 300 },
      desktop: { width: 440, height: 400 },
    },
    position: {
      mobile: { top: "53%", left: "18%" },
      tablet: { top: "11%", left: "44%" },
      desktop: { top: "10%", left: "43%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "merchandising",
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/concept-development/6.png",
    alt: "cafe-2",
    dimensions: {
      mobile: { width: 230, height: 230 },
      tablet: { width: 277, height: 277 },
      desktop: { width: 370, height: 370 },
    },
    position: {
      mobile: { top: "60%", left: "5%" },
      tablet: { top: "18%", left: "29%" },
      desktop: { top: "17%", left: "28%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "merchandising",
    zIndex: 4,
  },
  {
    src: "/assets/images/brand/concept-development/7.png",
    alt: "chairs",
    dimensions: {
      mobile: { width: 175, height: 175 },
      tablet: { width: 187, height: 187 },
      desktop: { width: 250, height: 250 },
    },
    position: {
      mobile: { top: "75%", left: "15%" },
      tablet: { top: "31%", left: "31%" },
      desktop: { top: "49%", left: "30%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "merchandising",
    zIndex: 6,
    utilId: "util-chairs",
  },
  {
    src: "/assets/images/brand/main/image69.png",
    alt: "M symbol",
    dimensions: {
      mobile: { width: 35, height: 25 },
      tablet: { width: 37, height: 37 },
      desktop: { width: 50, height: 50 },
    },
    position: {
      mobile: { top: "70.5%", left: "60%" },
      tablet: { top: "24.5%", left: "49%" },
      desktop: { top: "36.5%", left: "48%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "merchandising",
    zIndex: 6,
    className: "animate-always",
  },
  {
    src: "/assets/images/brand/main/image70.png",
    alt: "V symbol",
    dimensions: {
      mobile: { width: 35, height: 25 },
      tablet: { width: 37, height: 37 },
      desktop: { width: 50, height: 50 },
    },
    position: {
      mobile: { top: "70.5%", left: "37.5%" },
      tablet: { top: "35%", left: "37%" },
      desktop: { top: "34%", left: "36%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "merchandising",
    zIndex: 6,
    className: "animate-always",
  },
  //concept-development image
  {
    src: "/assets/images/brand/concept-development/9.png",
    alt: "cafe-23vins Hotel",
    dimensions: {
      mobile: { width: 250, height: 250 },
      tablet: { width: 225, height: 225 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "4%", left: "3.5%" },
      tablet: { top: "15%", left: "2.5%" },
      desktop: { top: "14%", left: "1.5%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
    zIndex: 4,
  },
  {
    src: "/assets/images/brand/concept-development/8.png",
    alt: "cafe-23vins Hotel-2",
    dimensions: {
      mobile: { width: 225, height: 225 },
      tablet: { width: 225, height: 225 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "13%", left: "32%" },
      tablet: { top: "53%", left: "7%" },
      desktop: { top: "52%", left: "6%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
    zIndex: 4,
  },
  {
    src: "/assets/images/brand/main/image62.png",
    alt: "my-girl",
    dimensions: {
      mobile: { width: 55, height: 55 },
      tablet: { width: 82, height: 82 },
      desktop: { width: 110, height: 110 },
    },
    position: {
      mobile: { top: "76%", left: "81.5%" },
      tablet: { top: "55%", left: "8.5%" },
      desktop: { top: "54%", left: "7.5%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
    zIndex: 5,
    className: "animate-always",
    transformOrigin: "50% 8%",
    utilId: "util-people",
  },
  {
    src: "/assets/images/space/main/makeover1.png",
    alt: "cat",
    dimensions: {
      mobile: { width: 50, height: 50 },
      tablet: { width: 45, height: 37 },
      desktop: { width: 60, height: 50 },
    },
    position: {
      mobile: { top: "79%", left: "73%" },
      tablet: { top: "62%", left: "9%" },
      desktop: { top: "61%", left: "8%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/main/image64.png",
    alt: "women with dog",
    dimensions: {
      mobile: { width: 150, height: 150 },
      tablet: { width: 127, height: 112 },
      desktop: { width: 170, height: 150 },
    },
    position: {
      mobile: { top: "35%", left: "11%" },
      tablet: { top: "68%", left: "13%" },
      desktop: { top: "67%", left: "12%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
    zIndex: 34,
    className: "animate-walk-forward-loop",
    utilId: "util-people",
  },
  // //brand-shoot images
  {
    src: "/assets/images/brand/concept-development/1.png",
    alt: "apartment",
    dimensions: {
      mobile: { width: 300, height: 300 },
      tablet: { width: 375, height: 375 },
      desktop: { width: 500, height: 500 },
    },
    position: {
      mobile: { top: "98%", left: "9%" },
      tablet: { top: "36%", left: "66%" },
      desktop: { top: "35%", left: "65%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brandShoot",
    zIndex: 3,
  },
  {
    src: "/assets/images/brand/main/image65.png",
    alt: "ladies group",
    dimensions: {
      mobile: { width: 175, height: 150 },
      tablet: { width: 225, height: 225 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "96%", left: "32%" },
      tablet: { top: "28%", left: "76%" },
      desktop: { top: "27%", left: "75%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brandShoot",
    zIndex: 4,
  },
  {
    src: "/assets/images/brand/main/brand-shoots2.png",
    alt: "camera",
    dimensions: {
      mobile: { width: 140, height: 115 },
      tablet: { width: 172, height: 172 },
      desktop: { width: 230, height: 230 },
    },
    position: {
      mobile: { top: "89%", left: "14%" },
      tablet: { top: "25%",  left: "77%" },
      desktop: { top: "15%", left: "67%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: -110 },
    category: "brandShoot",
    zIndex: 5,
    className: "animate-vertical-pendulum",
    transformOrigin: "85% 8%",
    utilId: "util-camera",
  },
];

const badgePositions: Badge[] = [
  {
    text: "VISUAL MERCHANDISING",
    dimensions: {
      mobile: { width: 231, height: 32 },
      tablet: { width: 231, height: 32 },
      desktop: { width: 345, height: 56 },
    },
    position: {
      mobile: { top: "65%", left: "27%" },
      tablet: { top: "67%", left: "30%" },
      desktop: { top: "28%", left: "37%" },
    },
    category: "merchandising",
    zIndex: 31,
  },
  {
    text: "CONCEPT DEVELOPMENT",
    dimensions: {
      mobile: { width: 231, height: 32 },
      tablet: { width: 231, height: 32 },
      desktop: { width: 323, height: 56 },
    },
    position: {
      mobile: { top: "30%", left: "34%" },
      tablet: { top: "28%", left: "37%" },
      desktop: { top: "67%", left: "30%" },
    },
    category: "concept",
    zIndex: 31,
  },
  {
    text: "BRAND SHOOTS",
    dimensions: {
      mobile: { width: 146, height: 32 },
      tablet: { width: 146, height: 32 },
      desktop: { width: 220, height: 56 },
    },
    position: {
      mobile: { top: "118%", left: "44%" },
      tablet: { top: "45%", left: "78%" },
      desktop: { top: "74%", left: "82%" },
    },
    category: "brandShoot",
    zIndex: 31,
  },
];

interface BrandsSectionProps {
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
  type?: "walk";
  moveDuration?: number;
  className?: string;
  // Optional fraction (0..1) of container width to walk to (center=0.5)
  walkTargetFraction?: number;
  // Optional pendulum swing settings
  swing?: boolean;
  swingAmplitude?: number; // degrees around base rotate
  swingDuration?: number; // seconds for half-cycle
  transformOrigin?: string; // CSS transform-origin to pivot around tip
  utilId?: string; // Added utilId for hover audio
};

type SectionImageItemProps = {
  img: SectionImage;
  index: number;
  hoveredCategory: string | null;
  areaWidth: number; // added
};

function SectionImageItem({
  img,
  index,
  hoveredCategory,
  areaWidth,
}: SectionImageItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);
  const [isWalking, setIsWalking] = useState(false);

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
  const isOtherHovered =
    hoveredCategory !== null && hoveredCategory !== img.category;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || isWalking) return; // disable wiggle while walking
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
    if (!isWalking) {
      x.set(0);
      y.set(0);
      rotateX.set(0);
      rotateY.set(0);
    }
  };

  const handleEnter = () => {
    if (img.type === "walk" && !isWalking && areaWidth > 0) {
      setIsWalking(true);
    }
  };

  // compute walking target distance (to the chosen fraction of width)
  let walkTargetX = 0;
  if (isWalking) {
    const leftPercent = parseFloat(img.position[breakpoint].left) / 100; // starting left % (center-based)
    const startLeftPx = areaWidth * leftPercent; // element center X in px
    const fraction = img.walkTargetFraction ?? 0.9; // default closer to right if not specified
    const targetCenterX = areaWidth * fraction;
    walkTargetX = targetCenterX - startLeftPx; // displacement needed
  }

  return (
    <motion.div
      ref={ref}
      className={`absolute cursor-pointer ${img.className || ""}`}
      style={{
        top: img.position[breakpoint].top,
        left: img.position[breakpoint].left,
        transform: "translate(-50%, -50%)",
        zIndex: img.zIndex ?? 20,
        transformOrigin: img.transformOrigin ?? "50% 50%",
        // Bind motion values only when not walking and not shaking
        ...(!isWalking
          ? {
              x: springX,
              y: springY,
              rotateX: springRotateX,
              rotateY: springRotateY,
            }
          : {}),
      }}
      initial={{
        x: img.animation?.x ?? 0,
        y: img.animation?.y ?? 0,
        opacity: img.animation?.opacity ?? 1,
        rotate: img.animation?.rotate ?? 0,
      }}
      whileInView={{
        // Let animate control rotate/x for pendulum and shake
        y: 0,
        opacity: 1,
      }}
      animate={{
        scale: isHovered ? 1.25 : isOtherHovered ? 0.88 : 1,
        filter: isOtherHovered ? "blur(6px)" : "blur(0px)",
        opacity: isOtherHovered ? 0.45 : 1,
        x: isWalking ? walkTargetX : 0,
      }}
      transition={{
        scale: {
          stiffness: 300,
          damping: 25,
          mass: 0.8,
          type: "spring",
        },
        filter: {
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
          type: "tween",
        },
        opacity: {
          duration: 0.3,
          ease: "easeOut",
          type: "tween",
        },
        x: isWalking
          ? { duration: img.moveDuration ?? 6, ease: [0, 0, 1, 1] }
          : { stiffness: 200, damping: 30 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleEnter}
      onAnimationComplete={() => {
        if (isWalking) {
          setIsWalking(false);
          // Reset motion values for future wiggle interactions
          x.set(0);
          y.set(0);
          rotateX.set(0);
          rotateY.set(0);
        }
      }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={img.dimensions[breakpoint].width}
        height={img.dimensions[breakpoint].height}
        className="object-contain pointer-events-none h-auto"
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
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );
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
        top: badge.position[breakpoint].top,
        left: badge.position[breakpoint].left,
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
        dimensions={badge.dimensions[breakpoint]}
      />
    </motion.div>
  );
}

export default function BrandsSection({ onBadgeClick }: BrandsSectionProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const serviceMap: Record<string, string> = {
    merchandising: "visual-merchandising",
    concept: "concept-development",
    brandShoot: "brand-shoots",
  };

  // util audio setup (use top-level page9Utils config)
  const { getHoverHandlers } = useHoverUtilsAudio(page9Utils as any, "");
  // Log preload state once
  useEffect(() => {
    console.debug(
      "[brands] util audio ids ready:",
      page9Utils.map((u) => u.id)
    );
  }, []);

  // measure container width
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [areaWidth, setAreaWidth] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) setAreaWidth(containerRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative w-full lg:h-screen flex items-center justify-center bg-landing overflow-y-auto lg:overflow-hidden min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Global audio toggle icon (no background track) */}
      

      {/* Images */}
      {imagePositions.map((img: any, index: number) => (
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
            areaWidth={areaWidth}
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
