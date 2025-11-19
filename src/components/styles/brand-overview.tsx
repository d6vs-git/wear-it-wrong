"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useRef, MouseEvent, useEffect } from "react";
import Badge from "@/components/badge";
import { useRouter } from "next/navigation";

type Breakpoint = "mobile" | "tablet" | "desktop";

interface ImageConfig {
  src: string;
  alt: string;
  top: string;
  left: string;
  width: number;
  height: number;
  z: number;
  cat: string;
}

interface BadgeConfig {
  text: string;
  top: string;
  left: string;
  z: number;
  cat: string;
  px: number;
  py: number;
  fs: number;
  mobileTop?: string;
  mobileLeft?: string;
}

const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };

const CONFIG = {
  images: [
    {
      src: "/assets/images/brand-overview/space-edit/hangover-clothes.png",
      alt: "hanger",
      top: "15%",
      left: "5%",
      width: 130,
      height: 80,
      z: 25,
      cat: "space-edit",
    },
    {
      src: "/assets/images/brand-overview/space-edit/hey.png",
      alt: "hey text",
      top: "13%",
      left: "20%",
      width: 140,
      height: 175,
      z: 22,
      cat: "space-edit",
    },
    {
      src: "/assets/images/brand-overview/space-edit/disco-ball.png",
      alt: "disco ball",
      top: "12%",
      left: "7%",
      width: 80,
      height: 175,
      z: 30,
      cat: "space-edit",
    },
    {
      src: "/assets/images/brand-overview/space-edit/pink-pot.png",
      alt: "plant",
      top: "12%",
      left: "16%",
      width: 120,
      height: 65,
      z: 23,
      cat: "space-edit",
    },
    {
      src: "/assets/images/brand-overview/space-edit/radio-caset.png",
      alt: "cassette",
      top: "36%",
      left: "15%",
      width: 80,
      height: 125,
      z: 20,
      cat: "space-edit",
    },
    {
      src: "/assets/images/brand-overview/wardrobe-detox/hangover-clothes.png",
      alt: "coat",
      top: "50%",
      left: "13%",
      width: 180,
      height: 130,
      z: 1,
      cat: "wardrobe-detox",
    },
    {
      src: "/assets/images/brand-overview/wardrobe-detox/hand-bags.png",
      alt: "bags",
      top: "30%",
      left: "25%",
      width: 210,
      height: 130,
      z: 23,
      cat: "wardrobe-detox",
    },
    {
      src: "/assets/images/brand-overview/style-drop/cd.png",
      alt: "vinyl",
      top: "80%",
      left: "3%",
      width: 100,
      height: 100,
      z: 22,
      cat: "package-offers",
    },
    {
      src: "/assets/images/brand-overview/style-drop/paper.png",
      alt: "papers",
      top: "80%",
      left: "12%",
      width: 160,
      height: 125,
      z: 21,
      cat: "style-drop",
    },
    {
      src: "/assets/images/brand-overview/wardrobe-detox/c-pin.png",
      alt: "pin",
      top: "65%",
      left: "15%",
      width: 80,
      height: 135,
      z: 1,
      cat: "wardrobe-detox",
    },
    {
      src: "/assets/images/brand-overview/style-drop/mac-notes.jpg",
      alt: "notes",
      top: "80%",
      left: "28%",
      width: 190,
      height: 185,
      z: 23,
      cat: "style-drop",
    },
    {
      src: "/assets/images/brand-overview/concept-development/old-cafe.png",
      alt: "cafe",
      top: "10%",
      left: "32%",
      width: 160,
      height: 105,
      z: 21,
      cat: "concept",
    },
    {
      src: "/assets/images/brand-overview/concept-development/blue-cafe.png",
      alt: "cafe2",
      top: "40%",
      left: "41%",
      width: 160,
      height: 125,
      z: 2,
      cat: "concept",
    },
    {
      src: "/assets/images/brand-overview/concept-development/my-girl.png",
      alt: "girl",
      top: "36%",
      left: "42%",
      width: 90,
      height: 105,
      z: 22,
      cat: "concept",
    },
    {
      src: "/assets/images/brand-overview/concept-development/cats.png",
      alt: "cats",
      top: "40%",
      left: "40%",
      width: 100,
      height: 105,
      z: 20,
      cat: "concept",
    },
    {
      src: "/assets/images/brand-overview/concept-development/girl-with-dog.png",
      alt: "girl-dog",
      top: "48%",
      left: "42%",
      width: 130,
      height: 105,
      z: 21,
      cat: "concept",
    },
    {
      src: "/assets/images/brand-overview/concept-development/favorite-person.png",
      alt: "logo",
      top: "60%",
      left: "46%",
      width: 80,
      height: 55,
      z: 23,
      cat: "concept",
    },
    {
      src: "/assets/images/brand-overview/occasion-styling/girl-painting.png",
      alt: "painting",
      top: "55%",
      left: "32%",
      width: 130,
      height: 105,
      z: 22,
      cat: "occasion-styling",
    },
    {
      src: "/assets/images/brand-overview/occasion-styling/girl-with-cap.png",
      alt: "cap",
      top: "69%",
      left: "48%",
      width: 130,
      height: 105,
      z: 23,
      cat: "occasion-styling",
    },
    {
      src: "/assets/images/brand-overview/occasion-styling/walking-women.png",
      alt: "walk",
      top: "80%",
      left: "40%",
      width: 150,
      height: 105,
      z: 21,
      cat: "occasion-styling",
    },
    {
      src: "/assets/images/brand-overview/personal-shopper/slippers.png",
      alt: "slippers",
      top: "93%",
      left: "49%",
      width: 130,
      height: 105,
      z: 24,
      cat: "personal-shopper",
    },
    {
      src: "/assets/images/brand-overview/personal-shopper/girl-with-dog.png",
      alt: "girl-with-dog-1",
      top: "75%",
      left: "53%",
      width: 150,
      height: 105,
      z: 2,
      cat: "personal-shopper",
    },
    {
      src: "/assets/images/brand-overview/visual-merchandising/moon-cafe.png",
      alt: "moon",
      top: "10%",
      left: "63%",
      width: 260,
      height: 305,
      z: 25,
      cat: "visual-merchandising",
    },
    {
      src: "/assets/images/brand-overview/visual-merchandising/green-chairs.png",
      alt: "green-chairs",
      top: "32%",
      left: "52%",
      width: 130,
      height: 305,
      z: 25,
      cat: "visual-merchandising",
    },
    {
      src: "/assets/images/brand-overview/visual-merchandising/light-blue-cafe.png",
      alt: "moon",
      top: "12%",
      left: "50%",
      width: 230,
      height: 305,
      z: 25,
      cat: "visual-merchandising",
    },
    {
      src: "/assets/images/brand-overview/brand-shoots/white-house.png",
      alt: "house",
      top: "30%",
      left: "72%",
      width: 230,
      height: 105,
      z: 22,
      cat: "visual-merchandising",
    },
    {
      src: "/assets/images/brand-overview/brand-shoots/models.png",
      alt: "models",
      top: "24%",
      left: "76%",
      width: 150,
      height: 205,
      z: 23,
      cat: "brand-shoots",
    },
    {
      src: "/assets/images/brand-overview/brand-spaces/cars.png",
      alt: "car",
      top: "52%",
      left: "75%",
      width: 130,
      height: 125,
      z: 21,
      cat: "brand-spaces",
    },
    {
      src: "/assets/images/brand-overview/brand-shoots/girl-painting.png",
      alt: "girl",
      top: "12%",
      left: "88%",
      width: 90,
      height: 125,
      z: 24,
      cat: "brand-shoots",
    },
    {
      src: "/assets/images/brand-overview/brand-shoots/sleeping-man.png",
      alt: "man",
      top: "20%",
      left: "88%",
      width: 150,
      height: 125,
      z: 22,
      cat: "brand-shoots",
    },
    {
      src: "/assets/images/brand-overview/style-drop/gift-packs.png",
      alt: "gift",
      top: "12%",
      left: "90%",
      width: 100,
      height: 125,
      z: 20,
      cat: "brand-shoots",
    },
    {
      src: "/assets/images/brand-overview/brand-shoots/camera.png",
      alt: "camera",
      top: "20%",
      left: "78%",
      width: 110,
      height: 125,
      z: 23,
      cat: "brand-shoots",
    },
    {
      src: "/assets/images/brand-overview/personal-shopper/face-utils.png",
      alt: "face",
      top: "45%",
      left: "58%",
      width: 230,
      height: 205,
      z: 25,
      cat: "brand-spaces",
    },
    {
      src: "/assets/images/brand-overview/makeover-projects/blue-storage.png",
      alt: "storage",
      top: "50%",
      left: "84%",
      width: 130,
      height: 105,
      z: 21,
      cat: "makeover-projects",
    },
    {
      src: "/assets/images/brand-overview/makeover-projects/dining-table.png",
      alt: "table",
      top: "78%",
      left: "82%",
      width: 190,
      height: 105,
      z: 24,
      cat: "makeover-projects",
    },
    {
      src: "/assets/images/brand-overview/makeover-projects/brown-pot.png",
      alt: "pot1",
      top: "60%",
      left: "80%",
      width: 88,
      height: 95,
      z: 22,
      cat: "makeover-projects",
    },
    {
      src: "/assets/images/brand-overview/makeover-projects/brown-pot.png",
      alt: "pot2",
      top: "60%",
      left: "90%",
      width: 88,
      height: 95,
      z: 22,
      cat: "makeover-projects",
    },
    {
      src: "/assets/images/brand-overview/makeover-projects/green-chair.png",
      alt: "chair1",
      top: "68%",
      left: "78%",
      width: 100,
      height: 100,
      z: 23,
      cat: "makeover-projects",
    },
    {
      src: "/assets/images/brand-overview/makeover-projects/gold-chair.png",
      alt: "chair2",
      top: "68%",
      left: "90%",
      width: 100,
      height: 100,
      z: 23,
      cat: "makeover-projects",
    },
    {
      src: "/assets/images/brand-overview/makeover-projects/blue-chair.png",
      alt: "chair3",
      top: "68%",
      left: "85%",
      width: 70,
      height: 70,
      z: 21,
      cat: "makeover-projects",
    },
    {
      src: "/assets/images/brand-overview/makeover-projects/lamp.png",
      alt: "lamp",
      top: "67%",
      left: "86%",
      width: 55,
      height: 55,
      z: 22,
      cat: "makeover-projects",
    },
  ],
  badges: [
    {
      text: "SPACE EDIT",
      top: "25%",
      left: "8%",
      mobileTop: "18%",
      mobileLeft: "28%",
      z: 35,
      cat: "space-edit",
      px: 6,
      py: 4,
      fs: 14,
    },
    {
      text: "WARDROBE DETOX",
      top: "58%",
      left: "8%",
      mobileTop: "40%",
      mobileLeft: "22%",
      z: 34,
      cat: "wardrobe-detox",
      px: 6,
      py: 4,
      fs: 14,
    },
    {
      text: "PACKAGES AND OFFERS",
      top: "75%",
      left: "8%",
      mobileTop: "78%",
      mobileLeft: "28%",
      z: 33,
      cat: "package-offers",
      px: 6,
      py: 4,
      fs: 14,
    },
    {
      text: "STYLE DROP",
      top: "92%",
      left: "12%",
      mobileTop: "92%",
      mobileLeft: "32%",
      z: 32,
      cat: "style-drop",
      px: 6,
      py: 4,
      fs: 14,
    },
    {
      text: "CONCEPT DEVELOPMENT",
      top: "50%",
      left: "45%",
      mobileTop: "47%",
      mobileLeft: "50%",
      z: 31,
      cat: "concept",
      px: 6,
      py: 4,
      fs: 14,
    },
    {
      text: "OCCASION STYLING",
      top: "66%",
      left: "30%",
      mobileTop: "60%",
      mobileLeft: "48%",
      z: 30,
      cat: "occasion-styling",
      px: 6,
      py: 4,
      fs: 14,
    },
    {
      text: "PERSONAL SHOPPER",
      top: "78%",
      left: "35%",
      mobileTop: "84%",
      mobileLeft: "52%",
      z: 36,
      cat: "personal-shopper",
      px: 6,
      py: 4,
      fs: 14,
    },
    {
      text: "VISUAL MERCHANDISING",
      top: "22%",
      left: "60%",
      mobileTop: "24%",
      mobileLeft: "58%",
      z: 35,
      cat: "visual-merchandising",
      px: 6,
      py: 4,
      fs: 14,
    },
    {
      text: "BRAND SHOOTS",
      top: "45%",
      left: "78%",
      mobileTop: "42%",
      mobileLeft: "68%",
      z: 34,
      cat: "brand-shoots",
      px: 6,
      py: 4,
      fs: 14,
    },
    {
      text: "BRAND SPACES",
      top: "52%",
      left: "65%",
      mobileTop: "52%",
      mobileLeft: "68%",
      z: 33,
      cat: "brand-spaces",
      px: 6,
      py: 4,
      fs: 14,
    },
    {
      text: "MAKEOVER PROJECTS",
      top: "90%",
      left: "75%",
      mobileTop: "66%",
      mobileLeft: "48%",
      z: 10,
      cat: "makeover-projects",
      px: 6,
      py: 4,
      fs: 14,
    },
  ],
};

function ImageItem({
  img,
  i,
  hovered,
  bp,
}: {
  img: ImageConfig;
  i: number;
  hovered: string | null;
  bp: Breakpoint;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0),
    y = useMotionValue(0),
    rx = useMotionValue(0),
    ry = useMotionValue(0);
  const sx = useSpring(x, springConfig),
    sy = useSpring(y, springConfig),
    srx = useSpring(rx, springConfig),
    sry = useSpring(ry, springConfig);

  const isHovered = hovered === img.cat,
    isOtherHovered = hovered && hovered !== img.cat;
  const dim = {
    mobile: Math.round(img.width * 0.58),
    tablet: Math.round(img.width * 0.75),
    desktop: img.width,
  }[bp];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || bp === "mobile") return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2,
      cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
    rx.set(-((e.clientY - cy) / rect.height) * 8);
    ry.set(((e.clientX - cx) / rect.width) * 8);
  };

  return (
    <motion.div
      ref={ref}
      className="absolute cursor-pointer will-change-transform"
      style={{
        top: img.top,
        left: img.left,
        transform: "translate(-50%, -50%)",
        x: sx,
        y: sy,
        rotateX: srx,
        rotateY: sry,
        zIndex: img.z,
      }}
      initial={{ x: -30, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      animate={{
        scale:
          bp === "mobile"
            ? isHovered
              ? 1.08
              : isOtherHovered
              ? 0.92
              : 1
            : isHovered
            ? 1.25
            : isOtherHovered
            ? 0.88
            : 1,
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
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        rx.set(0);
        ry.set(0);
      }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={dim}
        height={Math.round(img.height * (dim / img.width))}
        className="object-contain pointer-events-none"
        priority={i < 2}
        draggable={false}
      />
    </motion.div>
  );
}

function BadgeItem({
  badge,
  hovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  bp,
}: {
  badge: BadgeConfig;
  hovered: string | null;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  bp: Breakpoint;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0),
    y = useMotionValue(0),
    rz = useMotionValue(0);
  const sx = useSpring(x, { ...springConfig, stiffness: 200 }),
    sy = useSpring(y, { ...springConfig, stiffness: 200 }),
    srz = useSpring(rz, { ...springConfig, stiffness: 250 });

  const isHovered = hovered === badge.cat,
    isOtherHovered = hovered && hovered !== badge.cat;

  // Responsive positioning
  const badgeTop =
    bp === "mobile" && badge.mobileTop ? badge.mobileTop : badge.top;
  const badgeLeft =
    bp === "mobile" && badge.mobileLeft ? badge.mobileLeft : badge.left;

  // Responsive badge sizing
  const badgePadding = {
    mobile: { px: 4, py: 2 },
    tablet: { px: 5, py: 3 },
    desktop: { px: badge.px, py: badge.py },
  }[bp];

  const badgeFontSize = {
    mobile: 10,
    tablet: 12,
    desktop: badge.fs,
  }[bp];

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || bp === "mobile") return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2,
      cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.25);
    y.set((e.clientY - cy) * 0.25);
    rz.set(((e.clientX - cx) / rect.width) * 4);
  };

  return (
    <motion.div
      ref={ref}
      className="absolute z-30 cursor-pointer will-change-transform"
      style={{
        top: badgeTop,
        left: badgeLeft,
        transform: "translate(-50%, -50%)",
        x: sx,
        y: sy,
        rotate: srz,
        zIndex: badge.z,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      animate={{
        scale:
          bp === "mobile"
            ? isHovered
              ? 1.05
              : isOtherHovered
              ? 0.95
              : 1
            : isHovered
            ? 1.12
            : isOtherHovered
            ? 0.92
            : 1,
        filter: isOtherHovered ? "blur(3px)" : "blur(0px)",
        opacity: isOtherHovered ? 0.5 : 1,
      }}
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
      onMouseEnter={onHoverStart}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        rz.set(0);
        onHoverEnd();
      }}
      onClick={onClick}
    >
      <Badge
        text={badge.text}
        isHovered={isHovered}
        paddingX={badgePadding.px}
        paddingY={badgePadding.py}
        fontSize={badgeFontSize}
      />
    </motion.div>
  );
}

export default function BrandOverview({
  onBadgeClick,
}: {
  onBadgeClick: (service: string) => void;
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState<string | null>(null);
  const [bp, setBp] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const update = () =>
      setBp(
        window.innerWidth < 768
          ? "mobile"
          : window.innerWidth < 1024
          ? "tablet"
          : "desktop"
      );
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const serviceMap: Record<string, { path: string; service: string }> = {
    "space-edit": { path: "spaces", service: "space-edit" },
    "wardrobe-detox": { path: "people", service: "wardrobe-detox" },
    "package-offers": { path: "people", service: "package-offers" },
    "style-drop": { path: "people", service: "style-drop" },
    concept: { path: "brands", service: "concept-development" },
    "occasion-styling": { path: "people", service: "occasion-styling" },
    "personal-shopper": { path: "people", service: "personal-shopping" },
    "visual-merchandising": { path: "brands", service: "visual-merchandising" },
    "brand-shoots": { path: "brands", service: "brand-shoots" },
    "brand-spaces": { path: "spaces", service: "brand-spaces" },
    "makeover-projects": { path: "spaces", service: "makeover-projects" },
  };

  const handleNav = (cat: string) => {
    const { path, service } = serviceMap[cat];
    onBadgeClick(service);
    router.push(`/styles/${path}?service=${service}`);
  };

  return (
    <motion.section
      className={`relative w-full flex items-center justify-center bg-landing ${
        bp === "mobile"
          ? "h-screen overflow-hidden px-3"
          : bp === "tablet"
          ? "h-screen overflow-hidden px-8"
          : "h-screen overflow-hidden px-12"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {CONFIG.images.map((img, i) => (
        <ImageItem key={i} img={img} i={i} hovered={hovered} bp={bp} />
      ))}
      {CONFIG.badges.map((badge, i) => (
        <BadgeItem
          key={i}
          badge={badge}
          hovered={hovered}
          onHoverStart={() => setHovered(badge.cat)}
          onHoverEnd={() => setHovered(null)}
          onClick={() => handleNav(badge.cat)}
          bp={bp}
        />
      ))}
    </motion.section>
  );
}
