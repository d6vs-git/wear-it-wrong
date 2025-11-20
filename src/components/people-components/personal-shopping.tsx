"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heading } from "../heading";
import { BookNowButton } from "../book-now-button";
import { useState, useRef, useEffect } from "react";
import TimedAudio from "@/components/audio/timed-audio";
import { useHoverUtilsAudio } from "@/components/audio/useHoverUtilsAudio";
import Footer from "../footer";
// Unified audio config (page4)
// Extended: include background and util segments in one array
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
    id: "bg-romance",
    type: "background",
    src: "/assets/sounds/page5/Hiroshi_Suzuki_Romance.mp3",
    start: 0,
    volume: 0.22,
    loopSegment: false,
  },
];

type Breakpoint = "mobile" | "tablet" | "desktop";

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
  type: "flower" | "carpet" | "hover" | "walk";
  moveDuration?: number;
  hoverScale?: number;
  hoverY?: number;
  hoverRotate?: number;
  hoverAudio?: string; // path to audio file to play on hover
  hoverAudioVolume?: number; // volume for hover audio (0-1)
};

const images: ImageConfig[] = [
  // Floating flowers - top row
  {
    src: "/assets/images/people/personal-shopping/bg-1.png",
    alt: "Background Element 1",
    dimensions: {
      mobile: { width: 180, height: 180 },
      tablet: { width: 260, height: 260 },
      desktop: { width: 350, height: 350 },
    },
    position: {
      mobile: { top: "-5%", left: "0%" },
      tablet: { top: "-8%", left: "0%" },
      desktop: { top: "-10%", left: "0%" },
    },
    className: "animate-light-flicker-slow",
    type: "flower",
    zIndex: 0,
  },
  {
    src: "/assets/images/people/personal-shopping/bg-2.png",
    alt: "Background Element 2",
    dimensions: {
      mobile: { width: 180, height: 180 },
      tablet: { width: 260, height: 260 },
      desktop: { width: 350, height: 350 },
    },
    position: {
      mobile: { top: "-5%", left: "32%" },
      tablet: { top: "-8%", left: "32%" },
      desktop: { top: "-10%", left: "32%" },
    },
    className: "animate-light-flicker-slow",
    type: "flower",
    zIndex: 0,
  },
  {
    src: "/assets/images/people/personal-shopping/bg-1.png",
    alt: "Background Element 3",
    dimensions: {
      mobile: { width: 180, height: 180 },
      tablet: { width: 260, height: 260 },
      desktop: { width: 350, height: 350 },
    },
    position: {
      mobile: { top: "-5%", left: "66%" },
      tablet: { top: "-8%", left: "66%" },
      desktop: { top: "-10%", left: "66%" },
    },
    className: "animate-light-flicker-slow",
    type: "flower",
    zIndex: 0,
  },

  // Carpets - middle row (behind everything)
  {
    src: "/assets/images/people/personal-shopping/carpet1.jpg",
    alt: "Carpet 1",
    dimensions: {
      mobile: { width: 200, height: 200 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 400, height: 400 },
    },
    position: {
      mobile: { top: "45%", left: "0%" },
      tablet: { top: "43%", left: "0%" },
      desktop: { top: "42%", left: "0%" },
    },
    type: "carpet",
    zIndex: 1,
  },
  {
    src: "/assets/images/people/personal-shopping/carpet2.jpg",
    alt: "Carpet 2",
    dimensions: {
      mobile: { width: 200, height: 200 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 400, height: 400 },
    },
    position: {
      mobile: { top: "45%", left: "36%" },
      tablet: { top: "43%", left: "36%" },
      desktop: { top: "42%", left: "36%" },
    },
    type: "carpet",
    zIndex: 1,
  },
  {
    src: "/assets/images/people/personal-shopping/carpet1.jpg",
    alt: "Carpet 3",
    dimensions: {
      mobile: { width: 200, height: 200 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 400, height: 400 },
    },
    position: {
      mobile: { top: "45%", left: "70%" },
      tablet: { top: "43%", left: "70%" },
      desktop: { top: "42%", left: "70%" },
    },
    type: "carpet",
    zIndex: 1,
  },

  // Clothing racks - on top of carpets
  {
    src: "/assets/images/people/personal-shopping/1.png",
    alt: "Clothing Rack",
    dimensions: {
      mobile: { width: 200, height: 200 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 400, height: 400 },
    },
    position: {
      mobile: { top: "8%", left: "18%" },
      tablet: { top: "6%", left: "18%" },
      desktop: { top: "5%", left: "18%" },
    },
    type: "hover",
    hoverAudio: "/assets/sounds/page5/background_noise.mp3",
    hoverAudioVolume: 0.22,
    zIndex: 5,
    hoverScale: 1.08,
    hoverY: -10,
    hoverRotate: 2,
  },
  {
    src: "/assets/images/people/personal-shopping/3.png",
    alt: "clothing rack with clothes",
    dimensions: {
      mobile: { width: 200, height: 200 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 400, height: 400 },
    },
    position: {
      mobile: { top: "8%", left: "55%" },
      tablet: { top: "6%", left: "55%" },
      desktop: { top: "5%", left: "55%" },
    },
    type: "hover",
    hoverAudio: "/assets/sounds/page5/background_noise.mp3",
    hoverAudioVolume: 0.22,
    zIndex: 5,
    hoverScale: 1.08,
    hoverY: -10,
    hoverRotate: -2,
  },

  // Woman - walks across
  {
    src: "/assets/images/people/personal-shopping/4.png",
    alt: "Woman with Bags",
    dimensions: {
      mobile: { width: 150, height: 150 },
      tablet: { width: 220, height: 220 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "42%", left: "0%" },
      tablet: { top: "40%", left: "0%" },
      desktop: { top: "38%", left: "0%" },
    },
    type: "walk",
    moveDuration: 6,
    zIndex: 10,
  },

  // Mat - center bottom
  {
    src: "/assets/images/people/personal-shopping/mat.png",
    alt: "Mat",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 180, height: 180 },
      desktop: { width: 240, height: 240 },
    },
    position: {
      mobile: { top: "64%", left: "48%" },
      tablet: { top: "62%", left: "48%" },
      desktop: { top: "60%", left: "48%" },
    },
    type: "walk",
    moveDuration: 5,
    zIndex: 8,
  },

  // Shopping bags and shoes - front right
  {
    src: "/assets/images/people/personal-shopping/2.png",
    alt: "Shopping Bags",
    dimensions: {
      mobile: { width: 90, height: 90 },
      tablet: { width: 135, height: 135 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "54%", left: "75%" },
      tablet: { top: "52%", left: "75%" },
      desktop: { top: "50%", left: "75%" },
    },
    type: "hover",
    className: "animate-always-slow",
    zIndex: 9,
    hoverScale: 1.15,
    hoverY: -12,
    hoverRotate: 3,
  },
  {
    src: "/assets/images/people/personal-shopping/5.png",
    alt: "Shoes",
    dimensions: {
      mobile: { width: 50, height: 50 },
      tablet: { width: 75, height: 75 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "76%", left: "75%" },
      tablet: { top: "74%", left: "75%" },
      desktop: { top: "72%", left: "75%" },
    },
    type: "hover",
    className: "animate-always-slow",
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
  breakpoint: Breakpoint;
  onWalkHover?: (hovering: boolean) => void; // keep
  utilSegmentId?: string; // optional id of util segment to trigger on hover
};

const ImageItem = ({
  img,
  index,
  isFlowersHovered,
  onFlowerHover,
  areaWidth,
  breakpoint,
  onWalkHover,
  utilSegmentId,
}: ImageItemProps) => {
  const [key, setKey] = useState(0);
  const hoverAudioRef = useRef<HTMLAudioElement | null>(null);

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

  // Hover audio handlers
  const handleAudioMouseEnter = () => {
    if (img.hoverAudio && hoverAudioRef.current && breakpoint !== "mobile") {
      hoverAudioRef.current.volume = img.hoverAudioVolume ?? 0.3;
      hoverAudioRef.current.currentTime = 0;
      hoverAudioRef.current.play().catch(() => {});
    }
  };

  const handleAudioMouseLeave = () => {
    if (img.hoverAudio && hoverAudioRef.current) {
      hoverAudioRef.current.pause();
      hoverAudioRef.current.currentTime = 0;
    }
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
        <div
          className={img.className || ""}
          style={{ width: "100%", height: "100%" }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={dimensions.width}
            height={dimensions.height}
            className="object-contain w-full h-full"
            priority={index < 2}
          />
        </div>
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
          width={dimensions.width}
          height={dimensions.height}
          className="object-contain w-full h-full"
          priority={index < 2}
        />
      </motion.div>
    );
  }

  // Walking animation
  if (img.type === "walk") {
    const isWoman = img.alt === "Woman with Bags";
    const leftPercent = parseFloat(position.left) / 100;
    const leftPx = areaWidth * leftPercent;
    const margin = 16;

    const targetX = isWoman
      ? areaWidth - dimensions.width / 2 - margin - leftPx
      : dimensions.width / 2 + margin - leftPx;

    return (
      <motion.div
        key={key}
        className="absolute cursor-pointer"
        style={baseStyle}
        initial={{ x: 0, opacity: 1 }}
        animate={{ x: targetX, opacity: 1 }}
        transition={{
          duration: img.moveDuration || 5,
          ease: "linear",
        }}
        onAnimationComplete={() => {
          // Reset position and restart
          setKey((k) => k + 1);
        }}
        onMouseEnter={() => {
          if (onWalkHover) onWalkHover(true);
        }}
        onMouseLeave={() => {
          if (onWalkHover) onWalkHover(false);
        }}
      >
        <Image
          src={img.src}
          alt={img.alt}
          width={dimensions.width}
          height={dimensions.height}
          className="object-contain w-full h-full"
          priority={index < 2}
        />
      </motion.div>
    );
  }

  // Hover animation
  return (
    <>
      {img.hoverAudio && (
        <audio ref={hoverAudioRef} src={img.hoverAudio} preload="auto" playsInline />
      )}
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
        onMouseEnter={handleAudioMouseEnter}
        onMouseLeave={handleAudioMouseLeave}
      >
        <div
          className={img.className || ""}
          style={{ width: "100%", height: "100%" }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={dimensions.width}
            height={dimensions.height}
            className="object-contain w-full h-full"
            priority={index < 2}
          />
        </div>
      </motion.div>
    </>
  );
};

export default function PersonalShopping() {
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isFlowersHovered, setIsFlowersHovered] = useState(false);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");
  const imageAreaRef = useRef<HTMLDivElement>(null);
  const [areaWidth, setAreaWidth] = useState(0);
  const { getHoverHandlers } = useHoverUtilsAudio([], "/assets/sounds/page5/background_noise.mp3");

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

  useEffect(() => {
    const measure = () => {
      if (imageAreaRef.current) setAreaWidth(imageAreaRef.current.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Walk hover stub (no extra audio logic now)
  const handleWalkHover = (_hovering: boolean) => {};

  return (
    <div className="w-screen overflow-hidden pt-16 md:pt-20">
      {/* Background segments rendered via TimedAudio with higher z to ensure visible CD */}
      {audioSegments.filter(s => s.type === 'background').map(seg => (
        <TimedAudio
          key={seg.id}
          src={seg.src} // page5 audio
          start={seg.start}
          end={seg.end}
          volume={seg.volume}
          loopSegment={seg.loopSegment}
          fadeDuration={seg.fadeDuration}
          fixed
          loop
          className="z-[70]"
        />
      ))}

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        <div className="flex justify-between items-center gap-3">
          <Heading text="PERSONAL SHOPPING" />
          <BookNowButton sessionType="personal-shopping" />
        </div>
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 sm:mt-6">
          ₹4,500
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-6 sm:mt-8 mb-8 sm:mb-12">
        <div className="flex flex-col-reverse lg:flex-row gap-12 md:gap-10 lg:gap-4">
          <motion.div
            className="w-full lg:w-1/3 shrink-0"
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
            <p className="text-[13px] sm:text-[15px] md:text-base lg:text-lg text-black leading-relaxed">
              You start by filling out a quick form so I can get to know your
              style, routine, and what you&apos;re shopping for. Based on that,
              I create a moodboard and we meet to go through it; talk about what
              you like, where you usually shop, and which direction to take.
              <br></br>
              Then comes the fun part, a two-hour shopping session (in-person or
              online). I plan the stores, brands, and pieces beforehand, so
              everything we look at already makes sense for you. During the
              session, I help you pick what works best: fits, colours, price
              points, all of it.
              <br></br>After we shop, you&apos;ll receive a personalized
              presentation with your moodboard, the pieces we bought, outfit
              ideas for different occasions, and links to anything else I think
              would complete your wardrobe.
              <br></br>It&apos;s an effortless, guided shopping experience. you
              still choose, but I make it all come together beautifully.
            </p>
          </motion.div>

          <motion.div
            ref={imageAreaRef}
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
                  ? "20px"
                  : breakpoint === "tablet"
                  ? "40px"
                  : "60px",
            }}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                {...(img.alt === 'Clothing Rack' || img.alt === 'clothing rack with clothes'
                  ? getHoverHandlers({ src: "/assets/sounds/page5/background_noise.mp3", volume: 0.22, disabledOnMobile: true })
                  : {})}
              >
                <ImageItem
                  img={img}
                  index={idx}
                  isFlowersHovered={isFlowersHovered}
                  onFlowerHover={() => setIsFlowersHovered(prev => !prev)}
                  areaWidth={areaWidth}
                  breakpoint={breakpoint}
                  onWalkHover={img.type === 'walk' ? handleWalkHover : undefined}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
    </div>
  );
}
