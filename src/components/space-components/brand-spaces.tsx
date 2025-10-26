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
    src: "/assets/images/space/brand-spaces/1.png",
    alt: "chair-left",
    width: 200,
    height: 200,
    position: { top: "10%", left: "4%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/2.png",
    alt: "chair-right ",
    width: 200,
    height: 200,
    position: { top: "10%", left: "26%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.png",
    alt: "table",
    width: 160,
    height: 160,
    position: { top: "22%", left: "18%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/4.png",
    alt: "lamp",
    width: 100,
    height: 100,
    position: { top: "12%", left: "21%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/5.png",
    alt: "seat-sofa",
    width: 500,
    height: 500,
    position: { top: "10%", left: "40%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.png",
    alt: "table",
    width: 160,
    height: 160,
    position: { top: "61%", left: "87%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/4.png",
    alt: "lamp",
    width: 100,
    height: 100,
    position: { top: "51%", left: "90%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.png",
    alt: "table",
    width: 160,
    height: 160,
    position: { top: "82%", left: "72%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/4.png",
    alt: "lamp",
    width: 100,
    height: 100,
    position: { top: "72%", left: "75%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/2.png",
    alt: "chair-right ",
    width: 240,
    height: 240,
    position: { top: "72%", left: "89%" },
    type: "hover",
    zIndex: 5,
  },
  

  {
    src: "/assets/images/space/brand-spaces/1.png",
    alt: "chair-left",
    width: 200,
    height: 200,
    position: { top: "60%", left: "-6%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/2.png",
    alt: "chair-right ",
    width: 200,
    height: 200,
    position: { top: "60%", left: "16%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.png",
    alt: "table",
    width: 160,
    height: 160,
    position: { top: "72%", left: "8%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/4.png",
    alt: "lamp",
    width: 100,
    height: 100,
    position: { top: "62%", left: "11%" },
    type: "hover",
    zIndex: 5,
  },
   {
    src: "/assets/images/space/brand-spaces/3.png",
    alt: "table",
    width: 160,
    height: 160,
    position: { top: "57%", left: "42%" },
    type: "hover",
    zIndex: 0,
  },
  {
    src: "/assets/images/space/brand-spaces/4.png",
    alt: "lamp",
    width: 100,
    height: 100,
    position: { top: "47%", left: "45%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.png",
    alt: "table",
    width: 160,
    height: 160,
    position: { top: "79%", left: "38%" },
    type: "hover",
    zIndex: 9,
  },
  {
    src: "/assets/images/space/brand-spaces/4.png",
    alt: "lamp",
    width: 100,
    height: 100,
    position: { top: "69%", left: "41%" },
    type: "hover",
    zIndex: 11,
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

export default function BrandSpaces() {
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
          <Heading text="BRAND SPACES" />
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
              Your space is often the first time someone experiences your brand,
              so it should tell your story without saying a word.
              <br />
              I help brands design and style their physical spaces; whether
              it&apos;s a store, studio, or pop-up, so it looks good, feels
              cohesive, and makes sense for how people actually move through it.
              We start by understanding your identity and what you want the
              space to communicate. From there, I help plan the layout,
              materials, color story, and decor details that bring that feeling
              to life.
              <br />
              It&apos;s not just about making things pretty but about creating a
              space that feels intentional, on-brand, and easy to maintain.
              <br />
              Whether you&apos;re setting up from scratch or reworking an
              existing space, the goal is simple: to make your space feel like
              your brand — lived-in, real, and instantly recognizable.
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
