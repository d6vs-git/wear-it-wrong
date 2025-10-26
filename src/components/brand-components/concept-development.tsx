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
    src: "/assets/images/brand/concept-development/1.png",
    alt: "Building",
    width: 450,
    height: 450,
    position: { top: "15%", left: "46%" },
    type: "hover",
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/concept-development/2.png",
    alt: "cafe -> mon bar a couture",
    width: 400,
    height: 400,
    position: { top: "3%", left: "6%" },
    type: "hover",
    zIndex: 3,
  },
  {
    src: "/assets/images/brand/concept-development/3.png",
    alt: "dress roller stand",
    width: 200,
    height: 200,
    position: { top: "24%", left: "40%" },
    type: "hover",
    zIndex: 6,
    hoverScale: 1.05,
    hoverY: -8,
    hoverRotate: 1,
  },

  
 
  {
    src: "/assets/images/brand/concept-development/6.png",
    alt: "Cafe-2",
    width: 300,
    height: 300,
    position: { top: "18%", left: "2%" },
    type: "hover",
    zIndex: 1,
  },
    
  {
    src: "/assets/images/brand/concept-development/7.png",
    alt: "chairs",
    width: 300,
    height: 300,
    position: { top: "47%", left: "-1%" },
    type: "hover",
    zIndex: 1,
  },
    {
    src: "/assets/images/brand/concept-development/8.png",
    alt: "Cafe-3",
    width: 300,
    height: 300,
    position: { top: "29%", left: "24%" },
    type: "hover",
    zIndex: 1,
  },

   {
    src: "/assets/images/brand/concept-development/10.png",
    alt: "My-girl ",
    width: 100,
    height: 100,
    position: { top: "68%", left: "1%" },
    type: "hover",
    zIndex: 1,
  },
   {
    src: "/assets/images/brand/concept-development/11.png",
    alt: "Cat",
    width: 130,
    height: 130,
    position: { top: "73%", left: "1%" },
    type: "hover",
    zIndex: 1,
  },
   {
    src: "/assets/images/brand/concept-development/12.png",
    alt: "Girl-with-dog",
    width: 200,
    height: 200,
    position: { top: "68%", left: "14%" },
    type: "hover",
    zIndex: 1,
  },
   {
    src: "/assets/images/brand/concept-development/13.png",
    alt: "Camera",
    width: 180,
    height: 180,
    position: { top: "40%", left: "64%" },
    type: "hover",
    zIndex: 10,
  },
   {
    src: "/assets/images/brand/concept-development/14.png",
    alt: "ladies ",
    width: 230,
    height: 230,
    position: { top: "57%", left: "60%" },
    type: "hover",
    zIndex: 9,
  },
   {
    src: "/assets/images/brand/concept-development/15.png",
    alt: "girl with cigarette",
    width: 240,
    height: 240,
    position: { top: "50%", left: "36%" },
    type: "hover",
    zIndex: 10,
  },
   {
    src: "/assets/images/brand/concept-development/16.png",
    alt: "Carpet 1",
    width: 200,
    height: 200,
    position: { top: "58%", left: "80%" },
    type: "hover",
    zIndex: 10,
  },
  {
    src: "/assets/images/brand/concept-development/17.png",
    alt: "Silver carpet",
    width: 400,
    height: 400,
    position: { top: "13%", left: "20%" },
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

export default function ConceptDevelopment() {
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
          <Heading text="CONCEPT DEVELOPMENT" />
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
                Each brand has its own unique vision that defines its
                identity, and I help bring that vision to life.
                <br />
                Whether you&apos;re embarking on a new project, establishing a
                pop-up, or redefining your brand&apos;s visual narrative, I
                transform your identity into a concrete expression.
                <br />
                We delve into your vision, explore what your brand
                represents, what it should avoid, and the emotions it should
                evoke.
                <br />
                From this foundation, I develop a comprehensive concept deck
                that encompasses mood, tone, styling direction, and visual
                language, serving as your roadmap for photo shoots, campaigns,
                or store layouts — whatever you&apos;re creating.
                <br />
                <br />
                The reason it succeeds: when your visuals and energy match,
                your brand stands out instead of fading into the background.
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