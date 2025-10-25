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
    src: "/assets/images/people/occasion-styling/flower-pot.png",
    alt: "flower pot with leaves",
    width: 280,
    height: 280,
    position: { top: "15%", left: "10%" },
    type: "flower",
    zIndex: 5,
  },
  {
    src: "/assets/images/people/occasion-styling/table.png",
    alt: "table",
    width: 450,
    height: 450,
    position: { top: "20%", left: "42%" },
    type: "carpet",
    zIndex: 3,
  },
  {
    src: "/assets/images/people/occasion-styling/dress-roller.png",
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
    src: "/assets/images/people/occasion-styling/carpet2.png",
    alt: "Carpet 2",
    width: 420,
    height: 420,
    position: { top: "52%", left: "28%" },
    type: "carpet",
    zIndex: 1,
  },
  {
    src: "/assets/images/people/occasion-styling/box.png",
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
    src: "/assets/images/people/occasion-styling/carpet1.png",
    alt: "Carpet 1",
    width: 480,
    height: 480,
    position: { top: "68%", left: "75%" },
    type: "carpet",
    zIndex: 1,
  },

  {
    src: "/assets/images/people/occasion-styling/dress2.png",
    alt: "dress2",
    width: 200,
    height: 200,
    position: { top: "42%", left: "8%" },
    type: "walk",
    moveDuration: 6,
    zIndex: 7,
  },
  {
    src: "/assets/images/people/occasion-styling/dress3.png",
    alt: "dress3",
    width: 180,
    height: 180,
    position: { top: "58%", left: "85%" },
    type: "walk",
    moveDuration: 5,
    zIndex: 8,
  },

  {
    src: "/assets/images/people/occasion-styling/hanging-lamp.png",
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
  {
    src: "/assets/images/people/occasion-styling/shoes.png",
    alt: "Shoes",
    width: 200,
    height: 200,
    position: { top: "75%", left: "52%" },
    type: "hover",
    zIndex: 9,
    hoverScale: 1.12,
    hoverY: -8,
    hoverRotate: 3,
  },
  {
    src: "/assets/images/people/occasion-styling/dress1.png",
    alt: "dress",
    width: 240,
    height: 240,
    position: { top: "60%", left: "60%" },
    type: "hover",
    zIndex: 8,
    hoverScale: 1.08,
    hoverY: -10,
    hoverRotate: -1,
  },
  {
    src: "/assets/images/people/occasion-styling/dress4.png",
    alt: "dress4",
    width: 160,
    height: 160,
    position: { top: "35%", left: "18%" },
    type: "hover",
    zIndex: 6,
    hoverScale: 1.1,
    hoverY: -8,
    hoverRotate: 2,
  },
  {
    src: "/assets/images/people/occasion-styling/rod.png",
    alt: "rod",
    width: 300,
    height: 300,
    position: { top: "40%", left: "65%" },
    type: "hover",
    zIndex: 7,
    hoverScale: 1.06,
    hoverY: -8,
    hoverRotate: 1,
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

export default function OccasionStyling() {
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
          <Heading text="OCCASION STYLING" />
          <BookNowButton />
        </div>
        <div className="text-2xl sm:text-3xl md:text-4xl mt-4 sm:mt-6">
          ₹3,500 <span className="text-xl"> per look </span>
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
              Tell me about your occasion; the event, the mood you&apos;re going for,
              and any ideas you already have.
              <br />
              I&apos;ll take a look at your wardrobe, see what pieces you want to
              wear, and figure out how to make them feel fresh, elevated, and
              just you.
              <br />
              <br />
              I put together a full look: outfit, accessories, even hair and
              makeup suggestions (so you don&apos;t have to worry about a single
              detail). You&apos;ll get a clear presentation with options, links,
              and brand suggestions that fit your style and budget.
              <br />
              <br />
              If you want, I can also shop or join you for fittings to make sure
              everything comes together perfectly — this can be added as an
              hourly service.
              <br />
              <br />
              It&apos;s styling that actually works for you, your wardrobe, and
              your life.
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