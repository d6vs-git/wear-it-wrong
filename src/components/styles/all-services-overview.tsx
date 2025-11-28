"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useRef, MouseEvent } from "react";
import BadgeItem, { BadgeType } from "@/components/ui/badge";
import { useBreakpoint } from "@/hooks/useBreakPoints";
import { useRouter } from "next/navigation";

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
  hasFlicker?: boolean;
};

interface BrandOverviewProps {
  onBadgeClick: (service: string) => void;
}

const springConfig = {
  stiffness: 150,
  damping: 20,
  mass: 0.5,
};

const imagePositions: readonly SectionImage[] = [
  {
    src: "/assets/images/brand-overview/space-edit/hangover-clothes.webp",
    alt: "hanger",
    dimensions: {
      mobile: { width: 75, height: 46 },
      tablet: { width: 98, height: 60 },
      desktop: { width: 130, height: 80 },
    },
    position: {
      mobile: { top: "15%", left: "5%" },
      tablet: { top: "15%", left: "5%" },
      desktop: { top: "15%", left: "5%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
    zIndex: 25,
  },
  {
    src: "/assets/images/brand-overview/space-edit/hey.webp",
    alt: "hey text",
    dimensions: {
      mobile: { width: 81, height: 102 },
      tablet: { width: 105, height: 131 },
      desktop: { width: 140, height: 175 },
    },
    position: {
      mobile: { top: "13%", left: "20%" },
      tablet: { top: "13%", left: "20%" },
      desktop: { top: "13%", left: "20%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
    zIndex: 22,
  },
  {
    src: "/assets/images/brand-overview/space-edit/disco-ball.webp",
    alt: "disco ball",
    dimensions: {
      mobile: { width: 46, height: 102 },
      tablet: { width: 60, height: 131 },
      desktop: { width: 80, height: 175 },
    },
    position: {
      mobile: { top: "12%", left: "7%" },
      tablet: { top: "12%", left: "7%" },
      desktop: { top: "12%", left: "7%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
    zIndex: 30,
    hasFlicker: true,
  },
  {
    src: "/assets/images/brand-overview/space-edit/pink-pot.webp",
    alt: "plant",
    dimensions: {
      mobile: { width: 70, height: 38 },
      tablet: { width: 90, height: 49 },
      desktop: { width: 120, height: 65 },
    },
    position: {
      mobile: { top: "12%", left: "16%" },
      tablet: { top: "12%", left: "16%" },
      desktop: { top: "12%", left: "16%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
    zIndex: 23,
  },
  {
    src: "/assets/images/brand-overview/space-edit/radio-caset.webp",
    alt: "cassette",
    dimensions: {
      mobile: { width: 46, height: 73 },
      tablet: { width: 60, height: 94 },
      desktop: { width: 80, height: 125 },
    },
    position: {
      mobile: { top: "36%", left: "15%" },
      tablet: { top: "36%", left: "15%" },
      desktop: { top: "36%", left: "15%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "space-edit",
    zIndex: 20,
  },
  {
    src: "/assets/images/brand-overview/wardrobe-detox/hangover-clothes.webp",
    alt: "coat",
    dimensions: {
      mobile: { width: 104, height: 75 },
      tablet: { width: 135, height: 98 },
      desktop: { width: 180, height: 130 },
    },
    position: {
      mobile: { top: "50%", left: "13%" },
      tablet: { top: "50%", left: "13%" },
      desktop: { top: "50%", left: "13%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "wardrobe-detox",
    zIndex: 1,
  },
  {
    src: "/assets/images/brand-overview/wardrobe-detox/hand-bags.webp",
    alt: "bags",
    dimensions: {
      mobile: { width: 122, height: 75 },
      tablet: { width: 158, height: 98 },
      desktop: { width: 210, height: 130 },
    },
    position: {
      mobile: { top: "30%", left: "25%" },
      tablet: { top: "30%", left: "25%" },
      desktop: { top: "30%", left: "25%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "wardrobe-detox",
    zIndex: 23,
  },
  {
    src: "/assets/images/brand-overview/style-drop/cd.webp",
    alt: "vinyl",
    dimensions: {
      mobile: { width: 58, height: 58 },
      tablet: { width: 75, height: 75 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "80%", left: "3%" },
      tablet: { top: "80%", left: "3%" },
      desktop: { top: "80%", left: "3%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "package-offers",
    zIndex: 22,
  },
  {
    src: "/assets/images/brand-overview/style-drop/paper.webp",
    alt: "papers",
    dimensions: {
      mobile: { width: 93, height: 73 },
      tablet: { width: 120, height: 94 },
      desktop: { width: 160, height: 125 },
    },
    position: {
      mobile: { top: "80%", left: "12%" },
      tablet: { top: "80%", left: "12%" },
      desktop: { top: "80%", left: "12%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "style-drop",
    zIndex: 21,
  },
  {
    src: "/assets/images/brand-overview/wardrobe-detox/c-pin.webp",
    alt: "pin",
    dimensions: {
      mobile: { width: 46, height: 78 },
      tablet: { width: 60, height: 101 },
      desktop: { width: 80, height: 135 },
    },
    position: {
      mobile: { top: "65%", left: "15%" },
      tablet: { top: "65%", left: "15%" },
      desktop: { top: "65%", left: "15%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "wardrobe-detox",
    zIndex: 1,
  },
  {
    src: "/assets/images/brand-overview/style-drop/mac-notes.webp",
    alt: "notes",
    dimensions: {
      mobile: { width: 110, height: 107 },
      tablet: { width: 143, height: 139 },
      desktop: { width: 190, height: 185 },
    },
    position: {
      mobile: { top: "80%", left: "28%" },
      tablet: { top: "80%", left: "28%" },
      desktop: { top: "80%", left: "28%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "style-drop",
    zIndex: 23,
  },
  {
    src: "/assets/images/brand-overview/concept-development/old-cafe.webp",
    alt: "cafe",
    dimensions: {
      mobile: { width: 93, height: 61 },
      tablet: { width: 120, height: 79 },
      desktop: { width: 160, height: 105 },
    },
    position: {
      mobile: { top: "10%", left: "32%" },
      tablet: { top: "10%", left: "32%" },
      desktop: { top: "10%", left: "32%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
    zIndex: 21,
  },
  {
    src: "/assets/images/brand-overview/concept-development/blue-cafe.webp",
    alt: "cafe2",
    dimensions: {
      mobile: { width: 93, height: 73 },
      tablet: { width: 120, height: 94 },
      desktop: { width: 160, height: 125 },
    },
    position: {
      mobile: { top: "40%", left: "41%" },
      tablet: { top: "40%", left: "41%" },
      desktop: { top: "40%", left: "41%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
    zIndex: 2,
  },
  {
    src: "/assets/images/brand-overview/concept-development/my-girl.webp",
    alt: "girl",
    dimensions: {
      mobile: { width: 52, height: 61 },
      tablet: { width: 68, height: 79 },
      desktop: { width: 90, height: 105 },
    },
    position: {
      mobile: { top: "36%", left: "42%" },
      tablet: { top: "36%", left: "42%" },
      desktop: { top: "36%", left: "42%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
    zIndex: 22,
  },
  {
    src: "/assets/images/brand-overview/concept-development/cats.webp",
    alt: "cats",
    dimensions: {
      mobile: { width: 58, height: 61 },
      tablet: { width: 75, height: 79 },
      desktop: { width: 100, height: 105 },
    },
    position: {
      mobile: { top: "40%", left: "40%" },
      tablet: { top: "40%", left: "40%" },
      desktop: { top: "40%", left: "40%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
    zIndex: 20,
  },
  {
    src: "/assets/images/brand-overview/concept-development/girl-with-dog.webp",
    alt: "girl-dog",
    dimensions: {
      mobile: { width: 75, height: 61 },
      tablet: { width: 98, height: 79 },
      desktop: { width: 130, height: 105 },
    },
    position: {
      mobile: { top: "48%", left: "42%" },
      tablet: { top: "48%", left: "42%" },
      desktop: { top: "48%", left: "42%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
    zIndex: 21,
  },
  {
    src: "/assets/images/brand-overview/concept-development/favorite-person.webp",
    alt: "logo",
    dimensions: {
      mobile: { width: 46, height: 32 },
      tablet: { width: 60, height: 41 },
      desktop: { width: 80, height: 55 },
    },
    position: {
      mobile: { top: "60%", left: "46%" },
      tablet: { top: "60%", left: "46%" },
      desktop: { top: "60%", left: "46%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "concept",
    zIndex: 23,
    hasFlicker: true,
  },
  {
    src: "/assets/images/brand-overview/occasion-styling/girl-painting.webp",
    alt: "painting",
    dimensions: {
      mobile: { width: 75, height: 61 },
      tablet: { width: 98, height: 79 },
      desktop: { width: 130, height: 105 },
    },
    position: {
      mobile: { top: "55%", left: "32%" },
      tablet: { top: "55%", left: "32%" },
      desktop: { top: "55%", left: "32%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "occasion-styling",
    zIndex: 22,
  },
  {
    src: "/assets/images/brand-overview/occasion-styling/girl-with-cap.webp",
    alt: "cap",
    dimensions: {
      mobile: { width: 75, height: 61 },
      tablet: { width: 98, height: 79 },
      desktop: { width: 130, height: 105 },
    },
    position: {
      mobile: { top: "69%", left: "48%" },
      tablet: { top: "69%", left: "48%" },
      desktop: { top: "69%", left: "48%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "occasion-styling",
    zIndex: 23,
  },
  {
    src: "/assets/images/brand-overview/occasion-styling/walking-women.webp",
    alt: "walk",
    dimensions: {
      mobile: { width: 87, height: 61 },
      tablet: { width: 113, height: 79 },
      desktop: { width: 150, height: 105 },
    },
    position: {
      mobile: { top: "80%", left: "40%" },
      tablet: { top: "80%", left: "40%" },
      desktop: { top: "80%", left: "40%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "occasion-styling",
    zIndex: 21,
  },
  {
    src: "/assets/images/brand-overview/personal-shopper/slippers.webp",
    alt: "slippers",
    dimensions: {
      mobile: { width: 75, height: 61 },
      tablet: { width: 98, height: 79 },
      desktop: { width: 130, height: 105 },
    },
    position: {
      mobile: { top: "93%", left: "49%" },
      tablet: { top: "93%", left: "49%" },
      desktop: { top: "93%", left: "49%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "personal-shopper",
    zIndex: 24,
  },
  {
    src: "/assets/images/brand-overview/personal-shopper/girl-with-dog.webp",
    alt: "girl-with-dog-1",
    dimensions: {
      mobile: { width: 87, height: 61 },
      tablet: { width: 113, height: 79 },
      desktop: { width: 150, height: 105 },
    },
    position: {
      mobile: { top: "75%", left: "53%" },
      tablet: { top: "75%", left: "53%" },
      desktop: { top: "75%", left: "53%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "personal-shopper",
    zIndex: 2,
  },
  {
    src: "/assets/images/brand-overview/visual-merchandising/moon-cafe.webp",
    alt: "moon",
    dimensions: {
      mobile: { width: 151, height: 177 },
      tablet: { width: 195, height: 229 },
      desktop: { width: 260, height: 305 },
    },
    position: {
      mobile: { top: "10%", left: "63%" },
      tablet: { top: "10%", left: "63%" },
      desktop: { top: "10%", left: "63%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "visual-merchandising",
    zIndex: 25,
  },
  {
    src: "/assets/images/brand-overview/visual-merchandising/green-chairs.webp",
    alt: "green-chairs",
    dimensions: {
      mobile: { width: 75, height: 177 },
      tablet: { width: 98, height: 229 },
      desktop: { width: 130, height: 305 },
    },
    position: {
      mobile: { top: "32%", left: "52%" },
      tablet: { top: "32%", left: "52%" },
      desktop: { top: "32%", left: "52%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "visual-merchandising",
    zIndex: 25,
  },
  {
    src: "/assets/images/brand-overview/visual-merchandising/light-blue-cafe.webp",
    alt: "moon",
    dimensions: {
      mobile: { width: 133, height: 177 },
      tablet: { width: 173, height: 229 },
      desktop: { width: 230, height: 305 },
    },
    position: {
      mobile: { top: "12%", left: "50%" },
      tablet: { top: "12%", left: "50%" },
      desktop: { top: "12%", left: "50%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "visual-merchandising",
    zIndex: 25,
  },
  {
    src: "/assets/images/brand-overview/brand-shoots/white-house.webp",
    alt: "house",
    dimensions: {
      mobile: { width: 133, height: 61 },
      tablet: { width: 173, height: 79 },
      desktop: { width: 230, height: 105 },
    },
    position: {
      mobile: { top: "30%", left: "72%" },
      tablet: { top: "30%", left: "72%" },
      desktop: { top: "30%", left: "72%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "visual-merchandising",
    zIndex: 22,
  },
  {
    src: "/assets/images/brand-overview/brand-shoots/models.webp",
    alt: "models",
    dimensions: {
      mobile: { width: 87, height: 119 },
      tablet: { width: 113, height: 154 },
      desktop: { width: 150, height: 205 },
    },
    position: {
      mobile: { top: "24%", left: "76%" },
      tablet: { top: "24%", left: "76%" },
      desktop: { top: "24%", left: "76%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-shoots",
    zIndex: 23,
  },
  {
    src: "/assets/images/brand-overview/brand-spaces/cars.webp",
    alt: "car",
    dimensions: {
      mobile: { width: 75, height: 73 },
      tablet: { width: 98, height: 94 },
      desktop: { width: 130, height: 125 },
    },
    position: {
      mobile: { top: "52%", left: "75%" },
      tablet: { top: "52%", left: "75%" },
      desktop: { top: "52%", left: "75%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-spaces",
    zIndex: 21,
  },
  {
    src: "/assets/images/brand-overview/brand-shoots/girl-painting.webp",
    alt: "girl",
    dimensions: {
      mobile: { width: 52, height: 73 },
      tablet: { width: 68, height: 94 },
      desktop: { width: 90, height: 125 },
    },
    position: {
      mobile: { top: "12%", left: "88%" },
      tablet: { top: "12%", left: "88%" },
      desktop: { top: "12%", left: "88%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-shoots",
    zIndex: 24,
  },
  {
    src: "/assets/images/brand-overview/brand-shoots/sleeping-man.webp",
    alt: "man",
    dimensions: {
      mobile: { width: 87, height: 73 },
      tablet: { width: 113, height: 94 },
      desktop: { width: 150, height: 125 },
    },
    position: {
      mobile: { top: "20%", left: "88%" },
      tablet: { top: "20%", left: "88%" },
      desktop: { top: "20%", left: "88%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-shoots",
    zIndex: 22,
  },
  {
    src: "/assets/images/brand-overview/style-drop/gift-packs.webp",
    alt: "gift",
    dimensions: {
      mobile: { width: 58, height: 73 },
      tablet: { width: 75, height: 94 },
      desktop: { width: 100, height: 125 },
    },
    position: {
      mobile: { top: "12%", left: "90%" },
      tablet: { top: "12%", left: "90%" },
      desktop: { top: "12%", left: "90%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-shoots",
    zIndex: 20,
  },
  {
    src: "/assets/images/brand-overview/brand-shoots/camera.webp",
    alt: "camera",
    dimensions: {
      mobile: { width: 64, height: 73 },
      tablet: { width: 83, height: 94 },
      desktop: { width: 110, height: 125 },
    },
    position: {
      mobile: { top: "20%", left: "78%" },
      tablet: { top: "20%", left: "78%" },
      desktop: { top: "20%", left: "78%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-shoots",
    zIndex: 23,
  },
  {
    src: "/assets/images/brand-overview/personal-shopper/face-utils.webp",
    alt: "face",
    dimensions: {
      mobile: { width: 133, height: 119 },
      tablet: { width: 173, height: 154 },
      desktop: { width: 230, height: 205 },
    },
    position: {
      mobile: { top: "45%", left: "58%" },
      tablet: { top: "45%", left: "58%" },
      desktop: { top: "45%", left: "58%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "brand-spaces",
    zIndex: 25,
  },
  {
    src: "/assets/images/brand-overview/makeover-projects/blue-storage.webp",
    alt: "storage",
    dimensions: {
      mobile: { width: 75, height: 61 },
      tablet: { width: 98, height: 79 },
      desktop: { width: 130, height: 105 },
    },
    position: {
      mobile: { top: "50%", left: "84%" },
      tablet: { top: "50%", left: "84%" },
      desktop: { top: "50%", left: "84%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 21,
  },
  {
    src: "/assets/images/brand-overview/makeover-projects/dining-table.webp",
    alt: "table",
    dimensions: {
      mobile: { width: 110, height: 61 },
      tablet: { width: 143, height: 79 },
      desktop: { width: 190, height: 105 },
    },
    position: {
      mobile: { top: "78%", left: "82%" },
      tablet: { top: "78%", left: "82%" },
      desktop: { top: "78%", left: "82%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 24,
  },
  {
    src: "/assets/images/brand-overview/makeover-projects/brown-pot.webp",
    alt: "pot1",
    dimensions: {
      mobile: { width: 51, height: 55 },
      tablet: { width: 66, height: 71 },
      desktop: { width: 88, height: 95 },
    },
    position: {
      mobile: { top: "60%", left: "80%" },
      tablet: { top: "60%", left: "80%" },
      desktop: { top: "60%", left: "80%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 22,
  },
  {
    src: "/assets/images/brand-overview/makeover-projects/brown-pot.webp",
    alt: "pot2",
    dimensions: {
      mobile: { width: 51, height: 55 },
      tablet: { width: 66, height: 71 },
      desktop: { width: 88, height: 95 },
    },
    position: {
      mobile: { top: "60%", left: "90%" },
      tablet: { top: "60%", left: "90%" },
      desktop: { top: "60%", left: "90%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 22,
  },
  {
    src: "/assets/images/brand-overview/makeover-projects/green-chair.webp",
    alt: "chair1",
    dimensions: {
      mobile: { width: 58, height: 58 },
      tablet: { width: 75, height: 75 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "68%", left: "78%" },
      tablet: { top: "68%", left: "78%" },
      desktop: { top: "68%", left: "78%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 23,
  },
  {
    src: "/assets/images/brand-overview/makeover-projects/gold-chair.webp",
    alt: "chair2",
    dimensions: {
      mobile: { width: 58, height: 58 },
      tablet: { width: 75, height: 75 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "68%", left: "90%" },
      tablet: { top: "68%", left: "90%" },
      desktop: { top: "68%", left: "90%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 23,
  },
  {
    src: "/assets/images/brand-overview/makeover-projects/blue-chair.webp",
    alt: "chair3",
    dimensions: {
      mobile: { width: 41, height: 41 },
      tablet: { width: 53, height: 53 },
      desktop: { width: 70, height: 70 },
    },
    position: {
      mobile: { top: "68%", left: "85%" },
      tablet: { top: "68%", left: "85%" },
      desktop: { top: "68%", left: "85%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 21,
  },
  {
    src: "/assets/images/brand-overview/makeover-projects/lamp.webp",
    alt: "lamp",
    dimensions: {
      mobile: { width: 32, height: 32 },
      tablet: { width: 41, height: 41 },
      desktop: { width: 55, height: 55 },
    },
    position: {
      mobile: { top: "67%", left: "86%" },
      tablet: { top: "67%", left: "86%" },
      desktop: { top: "67%", left: "86%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "makeover-projects",
    zIndex: 22,
    hasFlicker: true,
  },
];

const badgePositions: readonly BadgeType[] = [
  {
    text: "SPACE EDIT",
    dimensions: {
      mobile: { width: 100, height: 26 },
      tablet: { width: 130, height: 32 },
      desktop: { width: 160, height: 44 },
    },
    position: {
      mobile: { top: "18%", left: "28%" },
      tablet: { top: "25%", left: "8%" },
      desktop: { top: "25%", left: "8%" },
    },
    category: "space-edit",
    zIndex: 35,
  },
  {
    text: "WARDROBE DETOX",
    dimensions: {
      mobile: { width: 140, height: 26 },
      tablet: { width: 180, height: 32 },
      desktop: { width: 220, height: 44 },
    },
    position: {
      mobile: { top: "40%", left: "22%" },
      tablet: { top: "58%", left: "8%" },
      desktop: { top: "58%", left: "8%" },
    },
    category: "wardrobe-detox",
    zIndex: 34,
  },
  {
    text: "PACKAGES AND OFFERS",
    dimensions: {
      mobile: { width: 180, height: 26 },
      tablet: { width: 230, height: 32 },
      desktop: { width: 290, height: 44 },
    },
    position: {
      mobile: { top: "78%", left: "28%" },
      tablet: { top: "75%", left: "8%" },
      desktop: { top: "75%", left: "8%" },
    },
    category: "package-offers",
    zIndex: 33,
  },
  {
    text: "STYLE DROP",
    dimensions: {
      mobile: { width: 110, height: 26 },
      tablet: { width: 140, height: 32 },
      desktop: { width: 170, height: 44 },
    },
    position: {
      mobile: { top: "92%", left: "32%" },
      tablet: { top: "92%", left: "12%" },
      desktop: { top: "92%", left: "12%" },
    },
    category: "style-drop",
    zIndex: 32,
  },
  {
    text: "CONCEPT DEVELOPMENT",
    dimensions: {
      mobile: { width: 180, height: 26 },
      tablet: { width: 230, height: 32 },
      desktop: { width: 290, height: 44 },
    },
    position: {
      mobile: { top: "47%", left: "50%" },
      tablet: { top: "50%", left: "45%" },
      desktop: { top: "50%", left: "45%" },
    },
    category: "concept",
    zIndex: 31,
  },
  {
    text: "OCCASION STYLING",
    dimensions: {
      mobile: { width: 160, height: 26 },
      tablet: { width: 200, height: 32 },
      desktop: { width: 250, height: 44 },
    },
    position: {
      mobile: { top: "60%", left: "48%" },
      tablet: { top: "66%", left: "30%" },
      desktop: { top: "66%", left: "30%" },
    },
    category: "occasion-styling",
    zIndex: 30,
  },
  {
    text: "PERSONAL SHOPPER",
    dimensions: {
      mobile: { width: 160, height: 26 },
      tablet: { width: 200, height: 32 },
      desktop: { width: 250, height: 44 },
    },
    position: {
      mobile: { top: "84%", left: "52%" },
      tablet: { top: "78%", left: "35%" },
      desktop: { top: "78%", left: "35%" },
    },
    category: "personal-shopper",
    zIndex: 36,
  },
  {
    text: "VISUAL MERCHANDISING",
    dimensions: {
      mobile: { width: 180, height: 26 },
      tablet: { width: 230, height: 32 },
      desktop: { width: 290, height: 44 },
    },
    position: {
      mobile: { top: "24%", left: "58%" },
      tablet: { top: "22%", left: "60%" },
      desktop: { top: "22%", left: "60%" },
    },
    category: "visual-merchandising",
    zIndex: 35,
  },
  {
    text: "BRAND SHOOTS",
    dimensions: {
      mobile: { width: 130, height: 26 },
      tablet: { width: 170, height: 32 },
      desktop: { width: 210, height: 44 },
    },
    position: {
      mobile: { top: "42%", left: "68%" },
      tablet: { top: "45%", left: "78%" },
      desktop: { top: "45%", left: "78%" },
    },
    category: "brand-shoots",
    zIndex: 34,
  },
  {
    text: "BRAND SPACES",
    dimensions: {
      mobile: { width: 130, height: 26 },
      tablet: { width: 170, height: 32 },
      desktop: { width: 210, height: 44 },
    },
    position: {
      mobile: { top: "52%", left: "68%" },
      tablet: { top: "52%", left: "65%" },
      desktop: { top: "52%", left: "65%" },
    },
    category: "brand-spaces",
    zIndex: 33,
  },
  {
    text: "MAKEOVER PROJECTS",
    dimensions: {
      mobile: { width: 160, height: 26 },
      tablet: { width: 210, height: 32 },
      desktop: { width: 260, height: 44 },
    },
    position: {
      mobile: { top: "66%", left: "48%" },
      tablet: { top: "90%", left: "75%" },
      desktop: { top: "90%", left: "75%" },
    },
    category: "makeover-projects",
    zIndex: 10,
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

  const imageElement = (
    <Image
      src={img.src}
      alt={img.alt}
      width={img.dimensions[breakpoint].width}
      height={img.dimensions[breakpoint].height}
      className="object-contain pointer-events-none"
      priority={index < 2}
      draggable={false}
    />
  );

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
        scale:
          breakpoint === "mobile"
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
        scale: { type: "spring", stiffness: 300, damping: 25, mass: 0.8 },
        filter: { type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        opacity: { type: "tween", duration: 0.3, ease: "easeOut" },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {img.hasFlicker ? (
        <span className="inline-block animate-light-flicker">{imageElement}</span>
      ) : (
        imageElement
      )}
    </motion.div>
  );
}

export default function BrandOverview({ onBadgeClick }: BrandOverviewProps) {
  const router = useRouter();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

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
      {imagePositions.map((img: SectionImage, index: number) => (
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
          onClick={() => handleNav(badge.category)}
        />
      ))}
    </motion.section>
  );
}