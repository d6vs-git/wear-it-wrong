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
  {
    src: "/assets/images/people/style-drop/1.png",
    alt: "flower pot with leaves",
    width: 280,
    height: 280,
    position: { top: "15%", left: "10%" },
    type: "flower",
    zIndex: 5,
  },
  {
    src: "/assets/images/people/style-drop/2.png",
    alt: "table",
    width: 450,
    height: 450,
    position: { top: "20%", left: "42%" },
    type: "carpet",
    zIndex: 3,
  },
  {
    src: "/assets/images/people/style-drop/3.png",
    alt: "dress roller stand",
    width: 380,
    height: 380,
    position: { top: "18%", left: "82%" },
    type: "hover",
    zIndex: 6,
    hoverScale: 1.05,
    hoverY: -8,
    hoverRotate: 1,
  },

  {
    src: "/assets/images/people/style-drop/4.png",
    alt: "Carpet 2",
    width: 420,
    height: 420,
    position: { top: "52%", left: "28%" },
    type: "carpet",
    zIndex: 1,
  },
  {
    src: "/assets/images/people/style-drop/5.png",
    alt: "box",
    width: 140,
    height: 140,
    position: { top: "48%", left: "42%" },
    type: "hover",
    zIndex: 4,
    hoverScale: 1.1,
    hoverY: -6,
    hoverRotate: 3,
  },
  {
    src: "/assets/images/people/style-drop/6.png",
    alt: "Carpet 1",
    width: 480,
    height: 480,
    position: { top: "68%", left: "75%" },
    type: "carpet",
    zIndex: 1,
  },

  {
    src: "/assets/images/people/style-drop/7.png",
    alt: "dress2",
    width: 200,
    height: 200,
    position: { top: "42%", left: "8%" },
    type: "walk",
    moveDuration: 6,
    zIndex: 7,
  },
  {
    src: "/assets/images/people/style-drop/8.png",
    alt: "dress3",
    width: 180,
    height: 180,
    position: { top: "58%", left: "85%" },
    type: "walk",
    moveDuration: 5,
    zIndex: 8,
  },

  {
    src: "/assets/images/people/style-drop/9.png",
    alt: "Hanging Lamp",
    width: 200,
    height: 200,
    position: { top: "8%", left: "45%" },
    type: "hover",
    zIndex: 10,
    hoverScale: 1.08,
    hoverY: -10,
    hoverRotate: -2,
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

export default function StyleDrop() {
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
          <Heading text="STYLE DROP" />
          <BookNowButton />
        </div>
        <div className="text-2xl sm:text-3xl md:text-4xl mt-4 sm:mt-6">
          ₹5,000 
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
                You fill out a quick form or send me a moodboard to show your
                vibe.
                <br />
                We talk through what you already have and what you&apos;re
                looking for; maybe you&apos;re updating your basics, building work
                looks, or want help finding everyday pieces that feel more you.
                <br />
                I then curate a digital style pack just for you, complete with
                outfit ideas, styling notes, and shopping links to everything you
                need.
                <br />
                Your Style Drop arrives straight in your inbox, ready to shop or
                save for later.
                <br />
                It&apos;s personal styling made easy; no appointments, no stress,
                just your style delivered.
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