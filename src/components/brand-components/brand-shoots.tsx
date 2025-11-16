"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Heading } from "../heading";
import { BookNowButton } from "../book-now-button";
import { useState, useRef, useEffect } from "react";
import TimedAudio from "@/components/audio/timed-audio";
import { useHoverUtilsAudio } from "@/components/audio/useHoverUtilsAudio";

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
    src: "/assets/sounds/page12/Back_to_friends_somber.mp3",
    start: 0,
    volume: 0.38,
    loopSegment: false,
  },];


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
  transitionOrigin?: string;
};

const images: ImageConfig[] = [
  // First row
  {
    src: "/assets/images/brand/brandshoots/bg.png",
    alt: "bg",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "10%", left: "3%" },
      tablet: { top: "15%", left: "3%" },
      desktop: { top: "15%", left: "3%" },
    },
    zIndex: 2,
  },
  {
    src: "/assets/images/brand/brandshoots/1.png",
    alt: "1",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "10%", left: "3%" },
      tablet: { top: "15%", left: "3%" },
      desktop: { top: "15%", left: "3%" },
    },
    zIndex: 5,
    className: "animate-popup-loop" 
  },
  {
    src: "/assets/images/brand/brandshoots/bg.png",
    alt: "bg",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "10%", left: "18%" },
      tablet: { top: "15%", left: "18%" },
      desktop: { top: "15%", left: "18%" },
    },
    zIndex: 2,
  },
  {
    src: "/assets/images/brand/brandshoots/2.png",
    alt: "2",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "10%", left: "18%" },
      tablet: { top: "15%", left: "18%" },
      desktop: { top: "15%", left: "18%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/brandshoots/bg.png",
    alt: "bg",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "10%", left: "33%" },
      tablet: { top: "15%", left: "33%" },
      desktop: { top: "15%", left: "33%" },
    },
    zIndex: 2,
  },
  {
    src: "/assets/images/brand/brandshoots/3.png",
    alt: "3",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "10%", left: "33%" },
      tablet: { top: "15%", left: "33%" },
      desktop: { top: "15%", left: "33%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/brandshoots/bg.png",
    alt: "bg",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "10%", left: "48%" },
      tablet: { top: "15%", left: "48%" },
      desktop: { top: "15%", left: "48%" },
    },
    zIndex: 2,
  },
  {
    src: "/assets/images/brand/brandshoots/4.png",
    alt: "4",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "10%", left: "48%" },
      tablet: { top: "15%", left: "48%" },
      desktop: { top: "15%", left: "48%" },
    },
    zIndex: 5,
    className: "animate-popup-loop" 
  },
  {
    src: "/assets/images/brand/brandshoots/bg.png",
    alt: "bg",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "10%", left: "63%" },
      tablet: { top: "15%", left: "63%" },
      desktop: { top: "15%", left: "63%" },
    },
    zIndex: 2,
  },
  {
    src: "/assets/images/brand/brandshoots/5.png",
    alt: "5",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "10%", left: "63%" },
      tablet: { top: "15%", left: "63%" },
      desktop: { top: "15%", left: "63%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/brandshoots/bg.png",
    alt: "bg",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "10%", left: "78%" },
      tablet: { top: "15%", left: "78%" },
      desktop: { top: "15%", left: "78%" },
    },
    zIndex: 2,
  },
  {
    src: "/assets/images/brand/brandshoots/6.png",
    alt: "6",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "10%", left: "78%" },
      tablet: { top: "15%", left: "78%" },
      desktop: { top: "15%", left: "78%" },
    },
    zIndex: 5,
  },

  // Second row - offset pattern for tablet/desktop, aligned for mobile
  {
    src: "/assets/images/brand/brandshoots/bg.png",
    alt: "bg",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "55%", left: "3%" },
      tablet: { top: "35%", left: "10.5%" },
      desktop: { top: "55%", left: "3%" },
    },
    zIndex: 2,
  },
  {
    src: "/assets/images/brand/brandshoots/7.png",
    alt: "7",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "55%", left: "3%" },
      tablet: { top: "35%", left: "10.5%" },
      desktop: { top: "55%", left: "3%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/brandshoots/bg.png",
    alt: "bg",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "55%", left: "18%" },
      tablet: { top: "35%", left: "25.5%" },
      desktop: { top: "55%", left: "18%" },
    },
    zIndex: 2,
  },
  {
    src: "/assets/images/brand/brandshoots/8.png",
    alt: "8",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "55%", left: "18%" },
      tablet: { top: "35%", left: "25.5%" },
      desktop: { top: "55%", left: "18%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/brandshoots/bg.png",
    alt: "bg",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "55%", left: "33%" },
      tablet: { top: "35%", left: "40.5%" },
      desktop: { top: "55%", left: "33%" },
    },
    zIndex: 2,
  },
  {
    src: "/assets/images/brand/brandshoots/9.png",
    alt: "9",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "55%", left: "33%" },
      tablet: { top: "35%", left: "40.5%" },
      desktop: { top: "55%", left: "33%" },
    },
    zIndex: 5,
    className: "animate-popup-loop" 
  },
  {
    src: "/assets/images/brand/brandshoots/bg.png",
    alt: "bg",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "55%", left: "48%" },
      tablet: { top: "35%", left: "55.5%" },
      desktop: { top: "55%", left: "48%" },
    },
    zIndex: 2,
  },
  {
    src: "/assets/images/brand/brandshoots/10.png",
    alt: "10",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "55%", left: "48%" },
      tablet: { top: "35%", left: "55.5%" },
      desktop: { top: "55%", left: "48%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/brandshoots/bg.png",
    alt: "bg",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "55%", left: "63%" },
      tablet: { top: "35%", left: "70.5%" },
      desktop: { top: "55%", left: "63%" },
    },
    zIndex: 2,
  },
  {
    src: "/assets/images/brand/brandshoots/11.png",
    alt: "11",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "55%", left: "63%" },
      tablet: { top: "35%", left: "70.5%" },
      desktop: { top: "55%", left: "63%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/brandshoots/bg.png",
    alt: "bg",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "55%", left: "78%" },
      tablet: { top: "35%", left: "85.5%" },
      desktop: { top: "55%", left: "78%" },
    },
    zIndex: 2,
  },
  {
    src: "/assets/images/brand/brandshoots/12.png",
    alt: "12",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "55%", left: "78%" },
      tablet: { top: "35%", left: "85.5%" },
      desktop: { top: "55%", left: "78%" },
    },
    zIndex: 5,
    className: "animate-popup-loop" 
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
      className={`absolute cursor-pointer will-change-transform ${img.className || ""}`} 
      style={{ ...baseStyle, x: springX, y: springY }}
      whileHover={{
        scale: breakpoint === "mobile" ? 1 : 1.15, // increased pop
        y: breakpoint === "mobile" ? 0 : -20, // upward movement
      }}
      whileTap={{
        scale: breakpoint === "mobile" ? 0.95 : 1,
      }}
      transition={{
        scale: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
        y: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] },
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

export default function BrandShoots() {
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
       {audioSegments.filter(s=>s.type==="background").map(segment => (
                          <TimedAudio key={segment.id} src={segment.src} start={segment.start} volume={segment.volume} fixed loop className="z-[70]" />
                        ))}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        <div className="flex justify-between items-center gap-3">
          <Heading text="BRAND SHOOTS" />
          <BookNowButton sessionType="brand-shoots" />
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
              Your shoot should feel like your brand and not a random Pinterest
              board.
              <br></br>I help you build the entire visual direction: from
              concept and styling to how it all comes together on set. We start
              with your brand story, what you&apos;re launching, and the mood
              you want to create. Then I put together a concept deck covering
              mood, palette, styling cues, and references. Once the
              direction&apos;s locked, I handle the styling: sourcing looks,
              creating the set mood, and making sure every shot feels cohesive
              and intentional. Whether it&apos;s for a catalog, campaign, or
              editorial shoot, I work closely with your photographer and team to
              bring the concept to life.
              <br></br>
              <br></br>Why it works? Because your photos aren&apos;t just
              pictures; they are your brand&apos;s first impression. And when
              that&apos;s done right, people get it instantly.
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
                  ? "40px"
                  : breakpoint === "tablet"
                  ? "60px"
                  : "80px",
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
