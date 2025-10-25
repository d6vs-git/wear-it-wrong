"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heading } from "../heading";
import { BookNowButton } from "../book-now-button";
import { useState, useRef, useEffect } from "react";

type ImageConfig = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: { top: string; left: string };
  zIndex?: number;
  type: "flower" | "carpet" | "hover" | "walk";
  moveDuration?: number;
  hoverScale?: number;
  hoverY?: number;
  hoverRotate?: number;
};

const images: ImageConfig[] = [
  // Top row - 6 paintings
  {
    src: "/assets/images/space/space-edit/painting1.png",
    alt: "painting1",
    width: 140,
    height: 160,
    position: { top: "12%", left: "12%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/painting2.png",
    alt: "painting2",
    width: 140,
    height: 160,
    position: { top: "12%", left: "28%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/painting3.png",
    alt: "painting3",
    width: 140,
    height: 160,
    position: { top: "12%", left: "44%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/painting4.png",
    alt: "painting4",
    width: 140,
    height: 160,
    position: { top: "12%", left: "60%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/painting5.png",
    alt: "painting5",
    width: 140,
    height: 160,
    position: { top: "12%", left: "76%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/painting6.png",
    alt: "painting6",
    width: 140,
    height: 160,
    position: { top: "12%", left: "92%" },
    type: "hover",
    zIndex: 5,
  },

  // Middle row - 4 paintings
  {
    src: "/assets/images/space/space-edit/painting7.png",
    alt: "painting7",
    width: 140,
    height: 160,
    position: { top: "35%", left: "12%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/painting1.png",
    alt: "painting1-repeat",
    width: 140,
    height: 160,
    position: { top: "35%", left: "28%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/painting2.png",
    alt: "painting2-repeat",
    width: 140,
    height: 160,
    position: { top: "35%", left: "44%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/painting4.png",
    alt: "painting4-repeat",
    width: 140,
    height: 160,
    position: { top: "35%", left: "60%" },
    type: "hover",
    zIndex: 5,
  },

  // Bottom row - furniture and decor
  {
    src: "/assets/images/space/space-edit/sofa.png",
    alt: "sofa",
    width: 400,
    height: 180,
    position: { top: "72%", left: "32%" },
    type: "hover",
    zIndex: 4,
  },
  {
    src: "/assets/images/space/space-edit/table.png",
    alt: "table",
    width: 160,
    height: 110,
    position: { top: "72%", left: "65%" },
    type: "hover",
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/cactus.png",
    alt: "cactus",
    width: 150,
    height: 170,
    position: { top: "58%", left: "78%" },
    type: "hover",
    zIndex: 6,
    hoverScale: 1.1,
    hoverY: -8,
  },
  {
    src: "/assets/images/space/space-edit/lamp.png",
    alt: "lamp",
    width: 70,
    height: 90,
    position: { top: "65%", left: "65%" },
    type: "hover",
    zIndex: 5,
    hoverScale: 1.12,
    hoverY: -10,
  },
  {
    src: "/assets/images/space/space-edit/perfume.png",
    alt: "perfume",
    width: 50,
    height: 70,
    position: { top: "68%", left: "58%" },
    type: "hover",
    zIndex: 5,
    hoverScale: 1.15,
    hoverY: -8,
  },

  {
    src: "/assets/images/space/space-edit/flowerpot.png",
    alt: "perfume",
    width: 50,
    height: 70,
    position: { top: "68%", left: "78%" },
    type: "hover",
    zIndex: 5,
    hoverScale: 1.15,
    hoverY: -8,
  },
];

type ImageItemProps = {
  img: ImageConfig;
  index: number;
  isFlowersHovered: boolean;
  onFlowerHover: () => void;
  areaWidth: number;
};

const ImageItem = ({
  img,
  index,
  isFlowersHovered,
  onFlowerHover,
  areaWidth,
}: ImageItemProps) => {
  const [isMoving, setIsMoving] = useState(false);
  const [key, setKey] = useState(0);

  const baseStyle = {
    top: img.position.top,
    left: img.position.left,
    transform: "translate(-50%, -50%)",
    width: `${img.width}px`,
    height: `${img.height}px`,
    zIndex: img.zIndex ?? index,
  };

  // Flower animation
  if (img.type === "flower") {
    return (
      <motion.div
        className="absolute cursor-pointer"
        style={baseStyle}
        initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
        animate={{ y: isFlowersHovered ? [0, -15, 0] : 0 }}
        transition={{
          y: {
            duration: 2.5,
            repeat: isFlowersHovered ? Infinity : 0,
            ease: "easeInOut",
          },
        }}
        onMouseEnter={onFlowerHover}
        onMouseLeave={onFlowerHover}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className="object-contain w-full h-full"
          priority={index < 2}
        />
      </motion.div>
    );
  }

  // Carpet (static)
  if (img.type === "carpet") {
    return (
      <motion.div
        className="absolute"
        style={baseStyle}
        initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className="object-contain w-full h-full"
          priority={index < 2}
        />
      </motion.div>
    );
  }

  // Walking animation
  if (img.type === "walk") {
    const isDress2 = img.alt === "dress2";
    const leftPercent = parseFloat(img.position.left) / 100;
    const leftPx = areaWidth * leftPercent;
    const margin = 16;

    const targetX = isDress2
      ? areaWidth - img.width / 2 - margin - leftPx
      : img.width / 2 + margin - leftPx;

    return (
      <motion.div
        key={key}
        className="absolute cursor-pointer"
        style={baseStyle}
        initial={{ x: 0, opacity: 0 }}
        animate={isMoving ? { x: targetX, opacity: 1 } : { x: 0, opacity: 1 }}
        transition={
          isMoving
            ? { duration: img.moveDuration || 5, ease: "linear" }
            : { opacity: { duration: 0.25 } }
        }
        onMouseEnter={() => !isMoving && setIsMoving(true)}
        onAnimationComplete={() => {
          if (isMoving) {
            setIsMoving(false);
            setKey((k) => k + 1);
          }
        }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          className="object-contain w-full h-full"
          priority={index < 2}
        />
      </motion.div>
    );
  }

  // Hover animation
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={baseStyle}
      initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
      whileHover={{
        scale: img.hoverScale || 1.08,
        y: img.hoverY || -10,
        rotate: img.hoverRotate || 0,
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        className="object-contain w-full h-full"
        priority={index < 2}
      />
    </motion.div>
  );
};

export default function SpaceEdit() {
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isFlowersHovered, setIsFlowersHovered] = useState(false);
  const imageAreaRef = useRef<HTMLDivElement>(null);
  const [areaWidth, setAreaWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (imageAreaRef.current) setAreaWidth(imageAreaRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div className="w-screen overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        <div className="flex justify-between items-center gap-3">
          <Heading text="SPACE EDIT" />
          <BookNowButton />
        </div>
        {/* <div className="text-2xl sm:text-3xl md:text-4xl mt-4 sm:mt-6">
          ₹5,000 
        </div> */}
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-8 mb-12">
        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-4">
          <motion.div
            className="w-full lg:w-1/3 shrink-0"
            onMouseEnter={() => setIsTextHovered(true)}
            onMouseLeave={() => setIsTextHovered(false)}
            animate={{
              scale: isImageHovered ? 0.92 : isTextHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-sm sm:text-base md:text-lg text-black leading-relaxed">
              Sometimes your space just needs a fresh perspective, not a full
              makeover.
              <br />
              I spend time understanding how you use your space, what you love
              about it, and what doesn&apos;t quite feel right.
              <br />
              We walk through it together, talk about your routine, and figure
              out what&apos;s missing: whether it&apos;s warmth, structure, or
              just better flow.
              <br />
              From there, I rework what you already have: moving pieces around,
              reorganizing, adding a few thoughtful details, and helping it all
              come together more naturally.
              <br />
              If something&apos;s missing, I&apos;ll suggest small additions:
              furniture, lighting, decor that actually make sense for your space
              and style.
              <br />
              <br />
              The goal isn&apos;t to start over; it&apos;s to make what you
              already have feel intentional and pulled together so your space
              finally works for you, not against you.
            </p>
          </motion.div>

          <motion.div
            ref={imageAreaRef}
            className="w-full lg:w-2/3 relative aspect-video"
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
            animate={{
              scale: isTextHovered ? 0.92 : isImageHovered ? 1.08 : 1,
              filter: isTextHovered ? "blur(2px)" : "blur(0px)",
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "visible" }}
          >
            {images.map((img, idx) => (
              <ImageItem
                key={idx}
                img={img}
                index={idx}
                isFlowersHovered={isFlowersHovered}
                onFlowerHover={() => setIsFlowersHovered((prev) => !prev)}
                areaWidth={areaWidth}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
