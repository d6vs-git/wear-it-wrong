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
    src: "/assets/sounds/page14/21-savage-redrum-2.mp3",
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
  transformOrigin?: string;
  hasFlicker?: boolean;
};

const images: ImageConfig[] = [
  // Top Row - 6 Paintings (Left to Right)
  {
    src: "/assets/images/space/space-edit/painting1.png",
    alt: "painting-top-1",
    dimensions: {
      mobile: { width: 110, height: 110 },
      tablet: { width: 87, height: 87 },
      desktop: { width: 155, height: 155 },
    },
    position: {
      mobile: { top: "-55%", left: "-3%" },
      tablet: { top: "5%", left: "4%" },
      desktop: { top: "9%", left: "12%" },
    },
    zIndex: 3,
   className: "animate-popdown-loop-slow"
  },
  {
    src: "/assets/images/space/space-edit/painting5.png",
    alt: "painting-top-2",
    dimensions: {
      mobile: { width: 110, height: 110 },
      tablet: { width: 127, height: 127 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "-55%", left: "7%" },
      tablet: { top: "3%", left: "15%" },
      desktop: { top: "7%", left: "24%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting3.png",
    alt: "painting-top-3",
    dimensions: {
      mobile: { width: 110, height: 110 },
      tablet: { width: 113, height: 113 },
      desktop: { width: 165, height: 165 },
    },
    position: {
      mobile: { top: "-55%", left: "30%" },
      tablet: { top: "4%", left: "32%" },
      desktop: { top: "8%", left: "41%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting4.png",
    alt: "painting-top-4",
    dimensions: {
      mobile: { width: 110, height: 110 },
      tablet: { width: 133, height: 133 },
      desktop: { width: 190, height: 195 },
    },
    position: {
      mobile: { top: "-55%", left: "47%" },
      tablet: { top: "2%", left: "50%" },
      desktop: { top: "6%", left: "57%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting3.png",
    alt: "painting-top-5",
    dimensions: {
      mobile: { width: 110, height: 110 },
      tablet: { width: 107, height: 107 },
      desktop: { width: 155, height: 155 },
    },
    position: {
      mobile: { top: "-55%", left: "62%" },
      tablet: { top: "5%", left: "67%" },
      desktop: { top: "9%", left: "76%" },
    },
    zIndex: 3,
    className: "animate-popdown-loop-slow"
  },
  {
    src: "/assets/images/space/space-edit/painting5.png",
    alt: "painting-top-6",
    dimensions: {
      mobile: { width: 105, height: 105 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 170, height: 170 },
    },
    position: {
      mobile: { top: "-55%", left: "80%" },
      tablet: { top: "3%", left: "82%" },
      desktop: { top: "7%", left: "91%" },
    },
    zIndex: 3,
  },
  // Middle Row - Perfume (far left, small)

  // Middle Row - 5 Paintings
  {
    src: "/assets/images/space/space-edit/perfume.png",
    alt: "perfume",
    dimensions: {
      mobile: { width: 30, height: 30 },
      tablet: { width: 40, height: 40 },
      desktop: { width: 50, height: 50 },
    },
    position: {
      mobile: { top: "63%", left: "75%" },
      tablet: { top: "60%", left: "75%" },
      desktop: { top: "65%", left: "85%" },
    },
    zIndex: 8,
    className: "animate-always-wide-slow",
    transformOrigin: "50% 50%",
  },

  // Middle Row - 5 Paintings
  {
    src: "/assets/images/space/space-edit/painting2.png",
    alt: "painting-middle-1",
    dimensions: {
      mobile: { width: 110, height: 110 },
      tablet: { width: 107, height: 107 },
      desktop: { width: 155, height: 155 },
    },
    position: {
      mobile: { top: "-10%", left: "-5%" },
      tablet: { top: "23%", left: "15%" },
      desktop: { top: "27%", left: "11%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting4.png",
    alt: "painting-middle-2",
    dimensions: {
      mobile: { width: 110, height: 110 },
      tablet: { width: 107, height: 107 },
      desktop: { width: 160, height: 165 },
    },
    position: {
      mobile: { top: "-10%", left: "10%" },
      tablet: { top: "23%", left: "15%" },
      desktop: { top: "27%", left: "25%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting1.png",
    alt: "painting-middle-3",
    dimensions: {
      mobile: { width: 110, height: 110 },
      tablet: { width: 113, height: 113 },
      desktop: { width: 165, height: 165 },
      
    },
    position: {
      mobile: { top: "-15%", left: "27%" },
      tablet: { top: "22%", left: "32%" },
      desktop: { top: "26%", left: "41%" },
    },
    zIndex: 3,
    className: "animate-popdown-loop-slow" 
  },
  {
    src: "/assets/images/space/space-edit/painting3.png",
    alt: "painting-middle-4",
    dimensions: {
      mobile: { width: 110, height: 110 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 170, height: 170 },
    },
    position: {
      mobile: { top: "-10%", left: "46%" },
      tablet: { top: "21%", left: "50%" },
      desktop: { top: "25%", left: "59%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting6.png",
    alt: "painting-middle-5",
    dimensions: {
      mobile: { width: 110, height: 110 },
      tablet: { width: 113, height: 113 },
      desktop: { width: 165, height: 165 },
    },
    position: {
      mobile: { top: "-10%", left: "62%" },
      tablet: { top: "22%", left: "67%" },
      desktop: { top: "26%", left: "76%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting4.png",
    alt: "painting-middle-6",
    dimensions: {
      mobile: { width: 110, height: 110 },
      tablet: { width: 107, height: 107 },
      desktop: { width: 155, height: 155 },
    },
    position: {
      mobile: { top: "-10%", left: "78%" },
      tablet: { top: "23%", left: "82%" },
      desktop: { top: "27%", left: "91%" },
    },
    zIndex: 3,
    className: "animate-popdown-loop-slow"
  },
  // Lamp (standing, left side, below perfume) - WITH FLICKER
  {
    src: "/assets/images/space/space-edit/lamp.png",
    alt: "standing-lamp",
    dimensions: {
      mobile: { width: 195, height: 205 },
      tablet: { width: 200, height: 250 },
      desktop: { width: 300, height: 400 },
    },
    position: {
      mobile: { top: "25%", left: "-17%" },
      tablet: { top: "30%", left: "15%" },
      desktop: { top: "20%", left: "10%" },
    },
    zIndex: 4,
    hasFlicker: true,
  },

  // Bottom Section - Large Sofa (Center)
  {
    src: "/assets/images/space/space-edit/sofa.png",
    alt: "sofa",
    dimensions: {
      mobile: { width: 300, height: 300 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 530, height: 309 },
    },
    position: {
      mobile: { top: "30%", left: "6%" },
      tablet: { top: "45%", left: "30%" },
      desktop: { top: "55%", left: "25%" },
    },
    zIndex: 5,
  },

  // Bottom Right - Side Table (right of sofa)
  {
    src: "/assets/images/space/space-edit/table.png",
    alt: "side-table",
    dimensions: {
      mobile: { width: 150, height: 70 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 165, height: 165 },
    },
    position: {
      mobile: { top: "75%", left: "60%" },
      tablet: { top: "66%", left: "68%" },
      desktop: { top: "72%", left: "78%" },
    },
    zIndex: 4,
  },

  // Small Cactus on table✅
  {
    src: "/assets/images/space/space-edit/cactus.png",
    alt: "small-cactus",
    dimensions: {
      mobile: { width: 50, height: 55 },
      tablet: { width: 60, height: 60 },
      desktop: { width: 80, height: 80 },
    },
    position: {
      mobile: { top: "55%", left: "76%" },
      tablet: { top: "55%", left: "70%" },
      desktop: { top: "60%", left: "79%" },
    },
    zIndex: 6,
  },

  // Large Flowerpot with plant (far right) ✅
  {
    src: "/assets/images/space/space-edit/flowerpot.png",
    alt: "large-flowerpot",
    dimensions: {
      mobile: { width: 120, height: 150 },
      tablet: { width: 180, height: 180 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "50%", left: "78%" },
      tablet: { top: "50%", left: "75%" },
      desktop: { top: "40%", left: "80%" },
    },
    zIndex: 6,
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
      style={{ 
        ...baseStyle, 
        x: springX, 
        y: springY,
        transformOrigin: img.transformOrigin ?? "50% 50%",
      }}
      whileHover={{ scale: breakpoint === "mobile" ? 1 : 1.08 }}
      whileTap={{ scale: breakpoint === "mobile" ? 0.95 : 1 }}
      animate={{
        filter: img.hasFlicker ? [
          "blur(0px) brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0))",
          "blur(0px) brightness(1.3) drop-shadow(0 0 8px rgba(255,255,200,0.6))",
          "blur(0px) brightness(0.9) drop-shadow(0 0 4px rgba(255,255,200,0.3))",
          "blur(0px) brightness(1.2) drop-shadow(0 0 10px rgba(255,255,200,0.8))",
          "blur(0px) brightness(1) drop-shadow(0 0 6px rgba(255,255,200,0.4))",
          "blur(0px) brightness(1.1) drop-shadow(0 0 5px rgba(255,255,200,0.5))",
          "blur(0px) brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0))",
        ] : undefined,
      }}
      transition={{
        scale: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
        filter: img.hasFlicker ? {
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1],
        } : undefined,
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

export default function SpaceEdit() {
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
                    <TimedAudio key={segment.id} src={segment.src} start={segment.start} volume={segment.volume} fixed loop className="z-70" />
                  ))}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        <div className="flex justify-between items-center gap-3">
          <Heading text="SPACE EDIT" />
          <BookNowButton sessionType="space-edit" />
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
            <p className="text-[17px] sm:text-[15px] md:text-base lg:text-lg text-black leading-relaxed">
              Sometimes your space just needs a few small shifts to feel right
              again — not a full change, just the things that were slightly off
              or no longer working for you. This one&apos;s for when you
              don&apos;t need a big overhaul, but could use a second eye, a
              clearer direction, or someone to help you figure out what&apos;s
              missing. We&apos;ll walk through your space together — physically
              or through photos — and talk about what feels stuck or incomplete.
              Then I&apos;ll give you clear, specific suggestions for small
              updates that can make a bigger difference: lighting, layout
              tweaks, color, rearranging furniture, or adding a few key pieces.
              It&apos;s practical, intentional, and built around what you
              already have and how you actually use the space. No overthinking,
              no unnecessary things.
            </p>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/3 relative aspect-video mt-40 sm:mt-0"
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