"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heading } from "../heading";
import { BookNowButton } from "../book-now-button";
import { useState, useRef, useEffect } from "react";
import useHoverWiggle from "@/lib/useHoverWiggle";

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
  {
    src: "/assets/images/brand/visual-merch/1.png",
    alt: "frame-1",
    width: 300,
    height: 300,
    position: { top: "-3%", left: "12%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/visual-merch/2.png",
    alt: "frame-2",
    width: 300,
    height: 300,
    position: { top: "41%", left: "12%" },
    type: "hover",
    zIndex: 3,
  },
  {
    src: "/assets/images/brand/visual-merch/3.png",
    alt: "H",
    width: 380,
    height: 380,
    position: { top: "40%", left: "46%" },
    type: "hover",
    zIndex: 6,
    hoverScale: 1.05,
    hoverY: -8,
    hoverRotate: 1,
  },

  {
    src: "/assets/images/brand/visual-merch/4.png",
    alt: "prada-hermlies",
    width: 420,
    height: 420,
    position: { top: "-14%", left: "46%" },
    type: "hover",
    zIndex: 1,
  },
  {
    src: "/assets/images/brand/visual-merch/5.png",
    alt: "fence",
    width: 140,
    height: 140,
    position: { top: "85%", left: "1%" },
    type: "hover",
    zIndex: 4,
    hoverScale: 1.1,
    hoverY: -6,
    hoverRotate: 3,
  },
  {
    src: "/assets/images/brand/visual-merch/5.png",
    alt: "fence",
    width: 140,
    height: 140,
    position: { top: "85%", left: "87%" },
    type: "hover",
    zIndex: 10,
    hoverScale: 1.1,
    hoverY: -6,
    hoverRotate: 3,
  },
  {
    src: "/assets/images/brand/visual-merch/6.png",
    alt: "tree",
    width: 480,
    height: 480,
    position: { top: "6%", left: "88%" },
    type: "hover",
    zIndex: 1,
  },
  {
    src: "/assets/images/brand/visual-merch/6.png",
    alt: "tree",
    width: 200,
    height: 200,
    position: { top: "64%", left: "-1%" },
    type: "hover",
    zIndex: 9,
  },
  
    {
    src: "/assets/images/brand/visual-merch/7.png",
    alt: "frame with nike ",
    width: 240,
    height: 240,
    position: { top: "79%", left: "18%" },
    type: "hover",
    zIndex: 1,
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
  const { x, y, rot, onMove, onLeave } = useHoverWiggle(6);

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
      style={{ ...baseStyle, x, y, rotate: rot }}
      initial={{ opacity: 1 }}
      whileHover={{
        scale: img.hoverScale || 1.08,
      }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
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

export default function VisualMerchandising() {
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
    <div className="w-screen overflow-x-hidden overflow-y-auto max-h-screen bg-landing">
      {/* Sticky top bar with title and About button */}
      <div className="sticky top-0 z-50 bg-landing/80 backdrop-blur-sm border-b border-black/5">
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 flex items-center justify-between">
          <h1 className="font-badtyp text-primary text-2xl sm:text-3xl md:text-4xl">VISUAL MERCHANDISING</h1>
          <div className="flex items-center gap-4">
            <Link href="/about" className="font-atbserif text-black text-base sm:text-lg underline underline-offset-4">
              About
            </Link>
            <BookNowButton />
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-20">
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
              <p className="text-sm sm:text-base md:text-lg text-black leading-relaxed font-atbserif">
                How your store looks says everything before anything else.
                <br />
                I help you make sure it&apos;s saying the right thing.
                <br />
                From window displays and shelf styling to layout flow and
                product presentation; I style your space so people want to
                walk in and stay.
                <br />
                Whether you&apos;re a boutique, concept store, or brand doing a
                pop-up, I help translate your identity into a physical
                experience that feels good and looks right.
                <br />
                We&apos;ll start by understanding your brand and what you want
                people to feel when they walk in. Then I plan, source, and
                style your space: ensuring everything from color flow to
                product placement tells a story.
                <br />
                <br />
                Why it works: Because good styling doesn&apos;t just look
                pretty; it sells, connects, and makes people remember your
                brand.
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

        {/* Spacer content to ensure page scrolls nicely */}
        <div className="h-24" />
      </div>
    </div>
  );
}