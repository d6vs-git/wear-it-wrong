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
  // Row 1 - Top
  {
    src: "/assets/images/space/makeover/1.png",
    alt: "bar-table",
    width: 300,
    height: 300,
    position: { top: "3%", left: "70%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/2.png",
    alt: "bed",
    width: 300,
    height: 300,
    position: { top: "57%", left: "-1%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/3.png",
    alt: "pillo",
    width: 100,
    height: 100,
    position: { top: "64%", left: "7%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/4.png",
    alt: "pillo covers",
    width: 100,
    height: 100,
    position: { top: "64%", left: "7%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/5.png",
    alt: "chair",
    width: 200,
    height: 200,
    position: { top: "65%", left: "26%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/6.png",
    alt: "chair",
    width: 200,
    height: 200,
    position: { top: "65%", left: "49%" },
    type: "hover",
    zIndex: 5,
  },

  // Row 2
  {
    src: "/assets/images/space/makeover/7.png",
    alt: "lamp",
    width: 120,
    height: 120,
    position: { top: "53%", left: "62%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/8.png",
    alt: "slippers",
    width: 160,
    height: 160,
    position: { top: "83%", left: "2%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/9.png",
    alt: "flower",
    width: 70,
    height: 70,
    position: { top: "74%", left: "4%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/10.png",
    alt: "pot",
    width: 300,
    height: 300,
    position: { top: "30%", left: "62%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/11.png",
    alt: "sofa",
    width: 250,
    height: 250,
    position: { top: "63%", left: "80%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/12.png",
    alt: "frame",
    width: 160,
    height: 160,
    position: { top: "18%", left: "80%" },
    type: "hover",
    zIndex: 5,
  },

  // // Row 3
  {
    src: "/assets/images/space/makeover/13.png",
    alt: "cat",
    width: 80,
    height: 80,
    position: { top: "73%", left: "88%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/14.png",
    alt: "favorite person",
    width: 80,
    height: 80,
    position: { top: "12%", left: "26%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/15.png",
    alt: "frame",
    width: 160,
    height: 160,
    position: { top: "40%", left: "47%" },
    type: "hover",
    zIndex: 1,
  },
  {
    src: "/assets/images/space/makeover/16.png",
    alt: "16",
    width: 90,
    height: 90,
    position: { top: "55%", left: "46%" },
    type: "hover",
    zIndex: 19,
  },
  {
    src: "/assets/images/space/makeover/17.png",
    alt: "table",
    width: 180,
    height: 180,
    position: { top: "18%", left: "4%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/18.png",
    alt: "frame-with a women in it ",
    width: 70,
    height: 80,
    position: { top: "27%", left: "27%" },
    type: "hover",
    zIndex: 9,
  },

  // Row 4 - Bottom
  {
    src: "/assets/images/space/makeover/19.png",
    alt: "heyy text",
    width: 120,
    height: 120,
    position: { top: "7%", left: "-1%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/20.png",
    alt: "hanger-with clothes",
    width: 160,
    height: 160,
    position: { top: "10%", left: "-2%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/21.png",
    alt: "disco ball",
    width: 110,
    height: 110,
    position: { top: "13%", left: "93%" },
    type: "hover",
    zIndex: 1,
  },
  {
    src: "/assets/images/space/makeover/22.png",
    alt: "car",
    width: 110,
    height: 110,
    position: { top: "29%", left: "82%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/23.png",
    alt: "radio tape",
    width: 80,
    height: 80,
    position: { top: "40%", left: "70%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/image6.png",
    alt: "cubborad -pink color ",
    width: 170,
    height: 170,
    position: { top: "28%", left: "22%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/makeover/image10.png",
    alt: "table ",
    width: 300,
    height: 200,
    position: { top: "65%", left: "32%" },
    type: "hover",
    zIndex: 5,
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

export default function MakeoverProject() {
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
          <Heading text="MAKEOVER PROJECT" />
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
        If you&apos;re setting up a new space or ready to give your current
        one a proper refresh, this is for you.
        <br />
        We start by understanding your space, what it needs to feel
        like, and how you want to live or work in it.
        <br />
        From layout and color direction to furniture, decor, and
        finishing touches, I help you put everything together so it
        feels cohesive and considered.
        <br />
        The process is collaborative: you share your ideas, I guide
        you with moodboards, references, and sourcing support.
        <br />
        We work through each area step by step — choosing what to
        keep, what to add, and what to let go of until the space feels
        just right.
        <br />
        Whether it&apos;s a home, studio, or store, the goal stays the
        same: to create a space that feels warm, functional, and true
        to you.
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
