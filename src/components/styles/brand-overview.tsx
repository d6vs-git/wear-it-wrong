"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useRef, MouseEvent, useEffect } from "react";
import Badge from "@/components/badge";
import { useRouter } from "next/navigation";

// Define responsive breakpoint types
type Breakpoint = "mobile" | "tablet" | "desktop";

interface Position {
  top: string;
  left: string;
}

type ResponsivePosition = {
  mobile: Position;
  tablet: Position;
  desktop: Position;
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

const createResponsiveConfig = (config: {
  src: string;
  alt: string;
  baseWidth: number;
  baseHeight: number;
  basePosition: { top: string; left: string };
  category: string;
  animation?: { x: number; y: number; opacity: number; rotate: number };
}): SectionImage => ({
  src: config.src,
  alt: config.alt,
  dimensions: {
    mobile: {
      width: Math.round(config.baseWidth * 0.7),
      height: Math.round(config.baseHeight * 0.7),
    },
    tablet: {
      width: Math.round(config.baseWidth * 0.85),
      height: Math.round(config.baseHeight * 0.85),
    },
    desktop: {
      width: config.baseWidth,
      height: config.baseHeight,
    },
  },
  position: {
    mobile: {
      top: config.basePosition.top,
      left: config.basePosition.left,
    },
    tablet: {
      top: config.basePosition.top,
      left: config.basePosition.left,
    },
    desktop: {
      top: config.basePosition.top,
      left: config.basePosition.left,
    },
  },
  animation: config.animation || { x: -30, y: 0, opacity: 0, rotate: 0 },
  category: config.category,
});

const imagePositions: SectionImage[] = [
  // SPACE EDIT SECTION (Top Left)
  createResponsiveConfig({
    src: "/assets/images/brand-overview/space-edit/hangover-clothes.png",
    alt: "hanger with text",
    baseWidth: 100,
    baseHeight: 75,
    basePosition: { top: "8%", left: "5%" },
    category: "space-edit",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/space-edit/hey.png",
    alt: "hey text",
    baseWidth: 150,
    baseHeight: 170,
    basePosition: { top: "8%", left: "25%" },
    category: "space-edit",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/space-edit/disco-ball.png",
    alt: "disco ball",
    baseWidth: 50,
    baseHeight: 170,
    basePosition: { top: "5%", left: "10%" },
    category: "space-edit",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/space-edit/pink-pot.png",
    alt: "plant in pot",
    baseWidth: 80,
    baseHeight: 60,
    basePosition: { top: "12%", left: "20%" },
    category: "space-edit",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/space-edit/radio-caset.png",
    alt: "cassette recorder",
    baseWidth: 40,
    baseHeight: 120,
    basePosition: { top: "50%", left: "8%" },
    category: "space-edit",
  }),

  // WARDROBE DETOX SECTION (Left)
  createResponsiveConfig({
    src: "/assets/images/brand-overview/wardrobe-detox/hangover-clothes.png",
    alt: "coat on hanger",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "30%", left: "4%" },
    category: "wardrobe-detox",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/wardrobe-detox/hand-bags.png",
    alt: "clothing hanger",
    baseWidth: 90,
    baseHeight: 90,
    basePosition: { top: "25%", left: "10%" },
    category: "wardrobe-detox",
  }),

  // PACKAGES AND OFFERS (Bottom Left)
  createResponsiveConfig({
    src: "/assets/images/brand-overview/style-drop/cd.png",
    alt: "vinyl record",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "68%", left: "2%" },
    category: "package-offers",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/style-drop/paper.png",
    alt: "style papers",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "80%", left: "20%" },
    category: "style-drop",
  }),

  // STYLE DROP (Left-Center)
  createResponsiveConfig({
    src: "/assets/images/brand-overview/wardrobe-detox/c-pin.png",
    alt: "shopping bags",
    baseWidth: 40,
    baseHeight: 30,
    basePosition: { top: "100%", left: "18%" },
    category: "wardrobe-detox",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/style-drop/mac-notes.jpg",
    alt: "design notes",
    baseWidth: 100,
    baseHeight: 180,
    basePosition: { top: "80%", left: "28%" },
    category: "style-drop",
  }),

  // CONCEPT DEVELOPMENT (Center-Top)
  createResponsiveConfig({
    src: "/assets/images/brand-overview/concept-development/old-cafe.png",
    alt: "building sketch",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "15%", left: "32%" },
    category: "concept",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/concept-development/blue-cafe.png",
    alt: "cafe interior",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "28%", left: "42%" },
    category: "concept",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/concept-development/my-girl.png",
    alt: "my-girl-heart",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "28%", left: "42%" },
    category: "concept",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/concept-development/cats.png",
    alt: "cats",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "38%", left: "42%" },
    category: "concept",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/concept-development/girl-with-dog.png",
    alt: "girl-with-dog",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "48%", left: "42%" },
    category: "concept",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/concept-development/favorite-person.png",
    alt: "favorite-person-logo",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "48%", left: "42%" },
    category: "concept",
  }),

  // OCCASION STYLING (Center)
  createResponsiveConfig({
    src: "/assets/images/brand-overview/occasion-styling/girl-painting.png",
    alt: "colorful items",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "45%", left: "28%" },
    category: "occasion-styling",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/occasion-styling/girl-with-cap.png",
    alt: "girl-with-cap",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "45%", left: "48%" },
    category: "occasion-styling",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/occasion-styling/walking-women.png",
    alt: "colorful items",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "50%", left: "38%" },
    category: "occasion-styling",
  }),

  // PERSONAL SHOPPER (Center-Bottom)
  createResponsiveConfig({
    src: "/assets/images/brand-overview/concept-development/girl-with-dog.png",
    alt: "people group",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "69%", left: "35%" },
    category: "personal-shopper",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/personal-shopper/slippers.png",
    alt: "slippers",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "69%", left: "35%" },
    category: "personal-shopper",
  }),

  // VISUAL MERCHANDISING (Top Right)
  {
    src: "/assets/images/brand-overview/visual-merchandising/moon-cafe.png",
    alt: "cafe design",
    dimensions: {
      mobile: { width: 200, height: 180 },
      tablet: { width: 280, height: 240 },
      desktop: { width: 340, height: 300 },
    },
    position: {
      mobile: { top: "18%", left: "65%" },
      tablet: { top: "15%", left: "62%" },
      desktop: { top: "12%", left: "58%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "visual-merchandising",
  },
  createResponsiveConfig({
    src: "/assets/images/brand-overview/brand-shoots/white-house.png",
    alt: "people in shop",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "28%", left: "72%" },
    category: "visual-merchandising",
  }),

  // BRAND SHOOTS (Top Right)
  createResponsiveConfig({
    src: "/assets/images/brand-overview/brand-shoots/models.png",
    alt: "fashion illustration",
    baseWidth: 100,
    baseHeight: 200,
    basePosition: { top: "8%", left: "82%" },
    category: "brand-shoots",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/brand-spaces/cars.png",
    alt: "pink car",
    baseWidth: 100,
    baseHeight: 120,
    basePosition: { top: "38%", left: "68%" },
    category: "brand-spaces",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/brand-shoots/girl-painting.png",
    alt: "girl car",
    baseWidth: 100,
    baseHeight: 120,
    basePosition: { top: "8%", left: "68%" },
    category: "brand-shoots",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/brand-shoots/sleeping-man.png",
    alt: "painting-sleeping-man",
    baseWidth: 100,
    baseHeight: 120,
    basePosition: { top: "10%", left: "78%" },
    category: "brand-shoots",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/style-drop/gift-packs.png",
    alt: "painting-sleeping-man",
    baseWidth: 100,
    baseHeight: 120,
    basePosition: { top: "10%", left: "78%" },
    category: "brand-shoots",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/brand-shoots/camera.png",
    alt: "painting-sleeping-man",
    baseWidth: 100,
    baseHeight: 120,
    basePosition: { top: "21%", left: "91%" },
    category: "brand-shoots",
  }),

  // BRAND SPACES (Right)
  createResponsiveConfig({
    src: "/assets/images/brand-overview/personal-shopper/face-utils.png",
    alt: "face utilities",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "45%", left: "58%" },
    category: "brand-spaces",
  }),
  // {
  //   src: "/assets/images/brand-overview/makeover-projects/rack.jpg",
  //   alt: "face utilities ",
  //   width: 180,
  //   height: 160,
  //   position: { top: "45%", left: "58%" },
  //   animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
  //   category: "brand-spaces",
  // },

  // MAKEOVER PROJECTS (Bottom Right)
  createResponsiveConfig({
    src: "/assets/images/brand-overview/makeover-projects/blue-storage.png",
    alt: "blue cabinet",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "15%", left: "88%" },
    category: "makeover-projects",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/makeover-projects/dining-table.png",
    alt: "wooden table setup",
    baseWidth: 160,
    baseHeight: 100,
    basePosition: { top: "78%", left: "78%" },
    category: "makeover-projects",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/makeover-projects/brown-pot.png",
    alt: "flower pot-1",
    baseWidth: 80,
    baseHeight: 90,
    basePosition: { top: "58%", left: "78%" },
    category: "makeover-projects",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/makeover-projects/brown-pot.png",
    alt: "flower pot-2",
    baseWidth: 80,
    baseHeight: 90,
    basePosition: { top: "28%", left: "78%" },
    category: "makeover-projects",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/makeover-projects/green-chair.png",
    alt: "chair details",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "68%", left: "88%" },
    category: "makeover-projects",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/makeover-projects/gold-chair.png",
    alt: "golder-chair",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "28%", left: "88%" },
    category: "makeover-projects",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/makeover-projects/blue-chair.png",
    alt: "blue-chair",
    baseWidth: 60,
    baseHeight: 60,
    basePosition: { top: "68%", left: "85%" },
    category: "makeover-projects",
  }),
  createResponsiveConfig({
    src: "/assets/images/brand-overview/makeover-projects/lamp.png",
    alt: "lamp",
    baseWidth: 100,
    baseHeight: 100,
    basePosition: { top: "28%", left: "88%" },
    category: "makeover-projects",
  }),
];

const createResponsiveBadgeConfig = (config: {
  text: string;
  basePosition: { top: string; left: string };
  category: string;
}): BadgeConfig => ({
  text: config.text,
  position: {
    mobile: {
      top: config.basePosition.top,
      left: `calc(${config.basePosition.left} + 5%)`,
    },
    tablet: {
      top: config.basePosition.top,
      left: `calc(${config.basePosition.left} + 2%)`,
    },
    desktop: {
      top: config.basePosition.top,
      left: config.basePosition.left,
    },
  },
  category: config.category,
});

type BadgeConfig = {
  text: string;
  position: ResponsivePosition;
  category: string;
};

const badgePositions: BadgeConfig[] = [
  createResponsiveBadgeConfig({
    text: "SPACE EDIT",
    basePosition: { top: "14%", left: "8%" },
    category: "space-edit",
  }),
  createResponsiveBadgeConfig({
    text: "WARDROBE DETOX",
    basePosition: { top: "35%", left: "8%" },
    category: "wardrobe-detox",
  }),
  createResponsiveBadgeConfig({
    text: "PACKAGES AND OFFERS",
    basePosition: { top: "75%", left: "8%" },
    category: "package-offers",
  }),
  createResponsiveBadgeConfig({
    text: "STYLE DROP",
    basePosition: { top: "58%", left: "12%" },
    category: "style-drop",
  }),
  createResponsiveBadgeConfig({
    text: "CONCEPT DEVELOPMENT",
    basePosition: { top: "45%", left: "38%" },
    category: "concept",
  }),
  createResponsiveBadgeConfig({
    text: "OCCASION STYLING",
    basePosition: { top: "52%", left: "22%" },
    category: "occasion-styling",
  }),
  createResponsiveBadgeConfig({
    text: "PERSONAL SHOPPER",
    basePosition: { top: "78%", left: "35%" },
    category: "personal-shopper",
  }),
  createResponsiveBadgeConfig({
    text: "VISUAL MERCHANDISING",
    basePosition: { top: "22%", left: "65%" },
    category: "visual-merchandising",
  }),
  createResponsiveBadgeConfig({
    text: "BRAND SHOOTS",
    basePosition: { top: "28%", left: "82%" },
    category: "brand-shoots",
  }),
  createResponsiveBadgeConfig({
    text: "BRAND SPACES",
    basePosition: { top: "52%", left: "65%" },
    category: "brand-spaces",
  }),
  createResponsiveBadgeConfig({
    text: "MAKEOVER PROJECTS",
    basePosition: { top: "78%", left: "82%" },
    category: "makeover-projects",
  }),
];

interface UnifiedSectionProps {
  onBadgeClick: (service: string) => void;
}

type SectionImage = {
  src: string;
  alt: string;
  dimensions: ResponsiveDimensions;
  position: ResponsivePosition;
  animation?: { x: number; y: number; opacity: number; rotate: number };
  category: string;
};

function SectionImageItem({
  img,
  index,
  hoveredCategory,
  breakpoint,
}: {
  img: SectionImage;
  index: number;
  hoveredCategory: string | null;
  breakpoint: Breakpoint;
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
    if (!ref.current || breakpoint === "mobile") return;

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

  const dimensions = img.dimensions[breakpoint];
  const position = img.position[breakpoint];

  return (
    <motion.div
      ref={ref}
      className="absolute z-20 cursor-pointer"
      style={{
        top: position.top,
        left: position.left,
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
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain w-full h-full pointer-events-none"
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
  breakpoint,
}: {
  badge: (typeof badgePositions)[0];
  hoveredCategory: string | null;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  breakpoint: Breakpoint;
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
        onHoverEnd();
      }}
      onClick={onClick}
      viewport={{ once: true }}
      transition={{
        scale: {
          type: "spring",
          stiffness: breakpoint === "mobile" ? 300 : 350,
          damping: breakpoint === "mobile" ? 25 : 22,
          mass: breakpoint === "mobile" ? 0.8 : 0.6,
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
  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  // Add breakpoint detection
  useEffect(() => {
    const updateBreakpoint = () => {
      if (window.innerWidth < 768) {
        setBreakpoint("mobile");
      } else if (window.innerWidth < 1024) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

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

  const handleServiceNavigation = (service: string) => {
    onBadgeClick(service);
    router.push(`/styles/brands?service=${service}`);
  };

  return (
    <motion.section
      className={`relative w-full h-screen flex items-center justify-center bg-landing overflow-hidden ${
        breakpoint === "mobile"
          ? "px-4"
          : breakpoint === "tablet"
          ? "px-8"
          : "px-12"
      }`}
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
          breakpoint={breakpoint}
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
          onClick={() => handleServiceNavigation(serviceMap[badge.category])}
          breakpoint={breakpoint}
        />
      ))}
    </motion.section>
  );
}
