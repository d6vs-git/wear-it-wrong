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
  // Floating flowers - top row
  {
    src: "/assets/images/people/personal-shopping/bg-1.png",
    alt: "Background Element 1",
    width: 350,
    height: 350,
    position: { top: "-10%", left: "0%" },
    type: "flower",
    zIndex: 0,
  },
  {
    src: "/assets/images/people/personal-shopping/bg-2.png",
    alt: "Background Element 2",
    width: 350,
    height: 350,
    position: { top: "-10%", left: "32%" },
    type: "flower",
    zIndex: 0,
  },
  {
    src: "/assets/images/people/personal-shopping/bg-1.png",
    alt: "Background Element 3",
    width: 350,
    height: 350,
    position: { top: "-10%", left: "66%" },
    type: "flower",
    zIndex: 0,
  },

  // Carpets - middle row (behind everything)
  {
    src: "/assets/images/people/personal-shopping/carpet1.jpg",
    alt: "Carpet 1",
    width: 400,
    height: 400,
    position: { top: "42%", left: "0%" },
    type: "carpet",
    zIndex: 1,
  },
  {
    src: "/assets/images/people/personal-shopping/carpet2.jpg",
    alt: "Carpet 2",
    width: 400,
    height: 400,
    position: { top: "42%", left: "36%" },
    type: "carpet",
    zIndex: 1,
  },
  {
    src: "/assets/images/people/personal-shopping/carpet1.jpg",
    alt: "Carpet 3",
    width: 400,
    height: 400,
    position: { top: "42%", left: "70%" },
    type: "carpet",
    zIndex: 1,
  },

  // Clothing racks - on top of carpets
  {
    src: "/assets/images/people/personal-shopping/1.png",
    alt: "Clothing Rack",
    width: 400,
    height: 400,
    position: { top: "5%", left: "18%" },
    type: "hover",
    zIndex: 5,
    hoverScale: 1.08,
    hoverY: -10,
    hoverRotate: 2,
  },
  {
    src: "/assets/images/people/personal-shopping/3.png",
    alt: "clothing rack with clothes",
    width: 400,
    height: 400,
    position: { top: "5%", left: "55%" },
    type: "hover",
    zIndex: 5,
    hoverScale: 1.08,
    hoverY: -10,
    hoverRotate: -2,
  },

  // Woman - walks across
  {
    src: "/assets/images/people/personal-shopping/4.png",
    alt: "Woman with Bags",
    width: 300,
    height: 300,
    position: { top: "38%", left: "0%" },
    type: "walk",
    moveDuration: 6,
    zIndex: 10,
  },

  // Mat - center bottom
  {
    src: "/assets/images/people/personal-shopping/mat.png",
    alt: "Mat",
    width: 240,
    height: 240,
    position: { top: "60%", left: "48%" },
    type: "walk",
    moveDuration: 5,
    zIndex: 8,
  },

  // Shopping bags and shoes - front right
  {
    src: "/assets/images/people/personal-shopping/2.png",
    alt: "Shopping Bags",
    width: 180,
    height: 180,
    position: { top: "50%", left: "75%" },
    type: "hover",
    zIndex: 9,
    hoverScale: 1.15,
    hoverY: -12,
    hoverRotate: 3,
  },
  {
    src: "/assets/images/people/personal-shopping/5.png",
    alt: "Shoes",
    width: 100,
    height: 100,
    position: { top: "72%", left: "75%" },
    type: "hover",
    zIndex: 9,
    hoverScale: 1.2,
    hoverY: -8,
    hoverRotate: 5,
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
    const isWoman = img.alt === "Woman with Bags";
    const leftPercent = parseFloat(img.position.left) / 100;
    const leftPx = areaWidth * leftPercent;
    const margin = 16;

    const targetX = isWoman
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

export default function PersonalShopping() {
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
          <Heading text="PERSONAL SHOPPING" />
          <BookNowButton />
        </div>
        <div className="text-2xl sm:text-3xl md:text-4xl mt-4 sm:mt-6">
          ₹4,500
        </div>
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
              You start by filling out a quick form so I can get to know your
              style, routine, and what you&apos;re shopping for. Based on that,
              I create a moodboard and we meet to go through it; talk about what
              you like, where you usually shop, and which direction to take.
              <br />
              <br />
              Then comes the fun part, a two-hour shopping session (in-person or
              online). I plan the stores, brands, and pieces beforehand, so
              everything we look at already makes sense for you. During the
              session, I help you pick what works best: fits, colours, price
              points, all of it.
              <br />
              <br />
              After we shop, you&apos;ll receive a personalized presentation
              with your moodboard, the pieces we bought, outfit ideas for
              different occasions, and links to anything else I think would
              complete your wardrobe.
              <br />
              <br />
              It&apos;s an effortless, guided shopping experience. you still
              choose, but I make it all come together beautifully.
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
