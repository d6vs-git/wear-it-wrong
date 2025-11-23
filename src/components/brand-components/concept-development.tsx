"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Heading } from "../heading";
import { BookNowButton } from "../ui/book-now-button";
import { useState, useRef, useEffect } from "react";
import TimedAudio from "@/components/audio/timed-audio";

// Audio config for page7
type AudioSegment = {
  id: string;
  type: "background" | "utils";
  src: string;
  start?: number;
  end?: number;
  volume?: number;
  loopSegment?: boolean;
  fadeDuration?: number;
};

const audioSegments: AudioSegment[] = [
  {
    id: "bg-occasion",
    type: "background",
    src: "/assets/sounds/concept-development/angel-kid-cudi.mp3",
    start: 0,
    volume: 0.38,
    loopSegment: false,
  },
];

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

type ImageConfig = {
  src: string;
  alt: string;
  dimensions: ResponsiveDimensions;
  position: ResponsivePosition;
  zIndex?: number;
  className?: string;
  transformOrigin?: string;
};

const images: ImageConfig[] = [
  {
    src: "/assets/images/brand/concept-development/1.webp",
    alt: "Building",
    dimensions: {
      mobile: { width: 300, height: 280 },
      tablet: { width: 320, height: 320 },
      desktop: { width: 450, height: 450 },
    },
    position: {
      mobile: { top: "100%", left: "38%" },
      tablet: { top: "18%", left: "48%" },
      desktop: { top: "15%", left: "46%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/concept-development/2.webp",
    alt: "cafe -> mon bar a couture",
    dimensions: {
      mobile: { width: 240, height: 220 },
      tablet: { width: 280, height: 280 },
      desktop: { width: 400, height: 400 },
    },
    position: {
      mobile: { top: "-10%", left: "46%" },
      tablet: { top: "8%", left: "12%" },
      desktop: { top: "3%", left: "6%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/brand/concept-development/3.webp",
    alt: "dress roller stand",
    dimensions: {
      mobile: { width: 130, height: 130 },
      tablet: { width: 150, height: 150 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "60%", left: "30%" },
      tablet: { top: "28%", left: "38%" },
      desktop: { top: "24%", left: "40%" },
    },
    zIndex: 6,
  },
  {
    src: "/assets/images/brand/concept-development/6.webp",
    alt: "Cafe-2",
    dimensions: {
      mobile: { width: 200, height: 160 },
      tablet: { width: 220, height: 220 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "0%", left: "-2%" },
      tablet: { top: "22%", left: "8%" },
      desktop: { top: "18%", left: "2%" },
    },
    zIndex: 1,
  },
  {
    src: "/assets/images/brand/concept-development/7.webp",
    alt: "chairs",
    dimensions: {
      mobile: { width: 130, height: 130 },
      tablet: { width: 220, height: 220 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "53%", left: "0%" },
      tablet: { top: "52%", left: "5%" },
      desktop: { top: "47%", left: "-1%" },
    },
    zIndex: 1,
  },
  {
    src: "/assets/images/brand/concept-development/8.webp",
    alt: "Cafe-3",
    dimensions: {
      mobile: { width: 210, height: 210 },
      tablet: { width: 220, height: 220 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "120%", left: "-3%" },
      tablet: { top: "35%", left: "25%" },
      desktop: { top: "29%", left: "24%" },
    },
    zIndex: 1,
  },
  {
    src: "/assets/images/brand/concept-development/10.webp",
    alt: "My-girl",
    dimensions: {
      mobile: { width: 50, height: 50 },
      tablet: { width: 80, height: 80 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "94%", left: "15%" },
      tablet: { top: "72%", left: "8%" },
      desktop: { top: "64%", left: "1%" },
    },
    zIndex: 1,
    className: "animate-always",
  },
  {
    src: "/assets/images/brand/concept-development/11.webp",
    alt: "Cat",
    dimensions: {
      mobile: { width: 90, height: 70 },
      tablet: { width: 100, height: 100 },
      desktop: { width: 130, height: 130 },
    },
    position: {
      mobile: { top: "105%", left: "9%" },
      tablet: { top: "78%", left: "8%" },
      desktop: { top: "73%", left: "1%" },
    },
    zIndex: 1,
  },
  {
    src: "/assets/images/brand/concept-development/12.webp",
    alt: "Girl-with-dog",
    dimensions: {
      mobile: { width: 110, height: 110 },
      tablet: { width: 150, height: 150 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "160%", left: "20%" },
      tablet: { top: "72%", left: "20%" },
      desktop: { top: "68%", left: "14%" },
    },
    zIndex: 18,
  },
  {
    src: "/assets/images/brand/concept-development/13.webp",
    alt: "Camera",
    dimensions: {
      mobile: { width: 80, height: 80 },
      tablet: { width: 140, height: 140 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "148%", left: "69%" },
      tablet: { top: "45%", left: "68%" },
      desktop: { top: "40%", left: "64%" },
    },
    zIndex: 10,
    className: "animate-always",
  },
  {
    src: "/assets/images/brand/concept-development/14.webp",
    alt: "ladies",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 180, height: 180 },
      desktop: { width: 230, height: 230 },
    },
    position: {
      mobile: { top: "165%", left: "61%" },
      tablet: { top: "62%", left: "65%" },
      desktop: { top: "57%", left: "60%" },
    },
    zIndex: 9,
  },
  {
    src: "/assets/images/brand/concept-development/15.webp",
    alt: "girl with cigarette",
    dimensions: {
      mobile: { width: 110, height: 110 },
      tablet: { width: 180, height: 180 },
      desktop: { width: 240, height: 240 },
    },
    position: {
      mobile: { top: "165%", left: "30%" },
      tablet: { top: "55%", left: "42%" },
      desktop: { top: "50%", left: "36%" },
    },
    zIndex: 10,
  },
  {
    src: "/assets/images/brand/concept-development/16.webp",
    alt: "girl-walking", // renamed from Carpet 1 for walking logic
    dimensions: {
      mobile: { width: 90, height: 90 },
      tablet: { width: 150, height: 150 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "175%", left: "85%" },
      tablet: { top: "62%", left: "82%" },
      desktop: { top: "58%", left: "80%" },
    },
    zIndex: 10,
    className: "walk", // marker for left walking loop
  },
  {
    src: "/assets/images/brand/concept-development/17.webp",
    alt: "Silver carpet",
    dimensions: {
      mobile: { width: 200, height: 210 },
      tablet: { width: 280, height: 280 },
      desktop: { width: 400, height: 400 },
    },
    position: {
      mobile: { top: "118%", left: "24%" },
      tablet: { top: "18%", left: "24%" },
      desktop: { top: "13%", left: "20%" },
    },
    zIndex: 1,
  },
];

type Breakpoint = "mobile" | "tablet" | "desktop";

type ImageItemProps = {
  img: ImageConfig;
  index: number;
  breakpoint: Breakpoint;
};

const ImageItem = ({ img, index, breakpoint }: ImageItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || breakpoint === "mobile") return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * 0.15;
    const deltaY = (e.clientY - centerY) * 0.15;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Walking markers
  const isWalkLeft =
    img.className?.includes("walk") ||
    img.alt.toLowerCase().includes("girl-walking");
  const isWalkRight =
    img.className?.includes("walk-right") ||
    img.alt.toLowerCase().includes("girl-with-dog");
  if (isWalkLeft) {
    const position = img.position[breakpoint];
    const dimensions = img.dimensions[breakpoint];
    return (
      <motion.div
        ref={ref}
        className={`absolute cursor-pointer will-change-transform ${
          img.className || ""
        }`}
        style={{
          top: position.top,
          left: position.left,
          transform: "translate(-50%, -50%)",
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          zIndex: img.zIndex ?? index,
        }}
        animate={{ x: [0, -300] }}
        transition={{
          x: {
            duration: 4,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
          scale: { duration: 0.3 },
        }}
        whileHover={{ scale: breakpoint === "mobile" ? 1 : 1.08 }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={dimensions.width}
          height={dimensions.height}
          className="object-contain w-full h-full pointer-events-none"
          priority={index < 2}
        />
      </motion.div>
    );
  }
  if (isWalkRight) {
    const position = img.position[breakpoint];
    const dimensions = img.dimensions[breakpoint];
    return (
      <motion.div
        ref={ref}
        className={`absolute cursor-pointer will-change-transform ${
          img.className || ""
        }`}
        style={{
          top: position.top,
          left: position.left,
          transform: "translate(-50%, -50%)",
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          zIndex: img.zIndex ?? index,
        }}
        animate={{ x: [0, 180] }}
        transition={{
          x: { duration: 4, ease: "linear", repeat: Infinity },
          scale: { duration: 0.3 },
        }}
        whileHover={{ scale: breakpoint === "mobile" ? 1 : 1.08 }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={dimensions.width}
          height={dimensions.height}
          className="object-contain w-full h-full pointer-events-none"
          priority={index < 2}
        />
      </motion.div>
    );
  }

  const position = img.position[breakpoint];
  const dimensions = img.dimensions[breakpoint];

  const baseStyle = {
    top: position.top,
    left: position.left,
    transform: "translate(-50%, -50%)",
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    zIndex: img.zIndex ?? index,
  };

  return (
    <motion.div
      ref={ref}
      className={`absolute cursor-pointer will-change-transform ${
        img.className || ""
      }`}
      style={{ ...baseStyle, x: springX, y: springY }}
      whileHover={{ scale: breakpoint === "mobile" ? 1 : 1.08 }}
      whileTap={{ scale: breakpoint === "mobile" ? 0.95 : 1 }}
      transition={{
        scale: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={dimensions.width}
        height={dimensions.height}
        className="object-contain w-full h-full pointer-events-none"
        priority={index < 2}
      />
    </motion.div>
  );
};

export default function ConceptDevelopment() {
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");

  useEffect(() => {
    const updateBreakpoint = () => {
      if (window.innerWidth < 768) {
        setBreakpoint("mobile");
      } else if (window.innerWidth < 1024) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  return (
    <div className="w-screen overflow-hidden pt-16 md:pt-20">
      {audioSegments
        .filter((s) => s.type === "background")
        .map((segment) => (
          <TimedAudio
            key={segment.id}
            src={segment.src}
            start={segment.start}
            volume={segment.volume}
            fixed
            loop
            className="z-70"
          />
        ))}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <Heading text="CONCEPT DEVELOPMENT" />
          <div className="self-end sm:self-auto">
            <BookNowButton sessionType="concept-development" />
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-6 sm:mt-8 mb-8 sm:mb-12">
        <div className="flex flex-col-reverse lg:flex-row gap-12 md:gap-10 lg:gap-4 lg:items-center">
          <motion.div
            className="w-full lg:w-1/3 shrink-0 mt-69 sm:mt-0"
            onMouseEnter={() =>
              breakpoint !== "mobile" && setIsTextHovered(true)
            }
            onMouseLeave={() =>
              breakpoint !== "mobile" && setIsTextHovered(false)
            }
            animate={{
              scale:
                breakpoint === "mobile"
                  ? 1
                  : isImageHovered
                  ? 0.92
                  : isTextHovered
                  ? 1.08
                  : 1,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-[17px] sm:text-[15px] md:text-base lg:text-lg text-black leading-relaxed">
              Each brand has its own unique vision that defines its identity,
              and I help bring that vision to life. Whether you&apos;re
              embarking on a new project, establishing a pop-up, or redefining
              your brand&apos;s visual narrative, I transform your identity into
              a concrete expression. We delve into your vision, explore what
              your brand represents, what it should avoid, and the emotions it
              should evoke. From this foundation, I develop a comprehensive
              concept deck that encompasses mood, tone, styling direction, and
              visual language, serving as your roadmap for photo shoots,
              campaigns, or store layouts -- whatever you&apos;re creating.
              <br />
              <br />
              The reason it succeeds: when your visuals and energy match, your
              brand stands out instead of fading into the background.
            </p>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/3 relative aspect-video"
            onMouseEnter={() =>
              breakpoint !== "mobile" && setIsImageHovered(true)
            }
            onMouseLeave={() =>
              breakpoint !== "mobile" && setIsImageHovered(false)
            }
            animate={{
              scale:
                breakpoint === "mobile"
                  ? 1
                  : isTextHovered
                  ? 0.92
                  : isImageHovered
                  ? 1.08
                  : 1,
              filter:
                breakpoint === "mobile"
                  ? "blur(0px)"
                  : isTextHovered
                  ? "blur(2px)"
                  : "blur(0px)",
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{
              overflow: "visible",
              padding:
                breakpoint === "mobile"
                  ? "60px"
                  : breakpoint === "tablet"
                  ? "80px"
                  : "100px",
            }}
          >
            {images.map((img, idx) => (
              <ImageItem
                key={idx}
                img={img}
                index={idx}
                breakpoint={breakpoint}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
