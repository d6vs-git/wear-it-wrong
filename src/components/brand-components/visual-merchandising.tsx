"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Heading } from "../ui/heading";
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
    src: "/assets/sounds/visual-merchandising/shawn-mendes-youth.mp3",
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
    className?: string;           // NEW: Animation class
  transformOrigin?: string;     // NEW: Pivot point for animation
};

const images: ImageConfig[] = [
  {
    src: "/assets/images/brand/visual-merch/1.webp",
    alt: "frame-1",
    dimensions: {
      mobile: { width: 330, height: 300 },
      tablet: { width: 220, height: 220 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "-140%", left: "-6%" },
      tablet: { top: "0%", left: "12%" },
      desktop: { top: "-3%", left: "12%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/visual-merch/4.webp",
    alt: "prada-hermlies",
    dimensions: {
      mobile: { width: 380, height: 340 },
      tablet: { width: 320, height: 320 },
      desktop: { width: 420, height: 420 },
    },
    position: {
      mobile: { top: "-150%", left: "63%" },
      tablet: { top: "-12%", left: "48%" },
      desktop: { top: "-14%", left: "46%" },
    },
    zIndex: 1,
  },
  {
    src: "/assets/images/brand/visual-merch/2.webp",
    alt: "frame-2",
    dimensions: {
      mobile: { width: 280, height: 280 },
      tablet: { width: 220, height: 220 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "-30%", left: "0%" },
      tablet: { top: "43%", left: "12%" },
      desktop: { top: "41%", left: "12%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/brand/visual-merch/3.webp",
    alt: "H",
    dimensions: {
      mobile: { width: 410, height: 420 },
      tablet: { width: 280, height: 280 },
      desktop: { width: 380, height: 380 },
    },
    position: {
      mobile: { top: "-45%", left: "53%" },
      tablet: { top: "42%", left: "48%" },
      desktop: { top: "40%", left: "46%" },
    },
    zIndex: 6,
  },

  {
    src: "/assets/images/brand/visual-merch/5.webp",
    alt: "fence-left",
    dimensions: {
      mobile: { width: 150, height: 150 },
      tablet: { width: 110, height: 110 },
      desktop: { width: 140, height: 140 },
    },
    position: {
      mobile: { top: "130%", left: "-5%" },
      tablet: { top: "84%", left: "2%" },
      desktop: { top: "85%", left: "1%" },
    },
    zIndex: 4,
    className: "animate-always-subtle",
  },
  {
    src: "/assets/images/brand/visual-merch/5.webp",
    alt: "fence-right",
    dimensions: {
      mobile: { width: 150, height: 150 },
      tablet: { width: 110, height: 110 },
      desktop: { width: 140, height: 140 },
    },
    position: {
      mobile: { top: "130%", left: "115%" },
      tablet: { top: "84%", left: "85%" },
      desktop: { top: "85%", left: "87%" },
    },
    zIndex: 10,
    className: "animate-always-subtle",
  },
  {
    src: "/assets/images/brand/visual-merch/6.webp",
    alt: "tree",
    dimensions: {
      mobile: { width: 300, height: 300 },
      tablet: { width: 360, height: 360 },
      desktop: { width: 480, height: 480 },
    },
    position: {
      mobile: { top: "20%", left: "120%" },
      tablet: { top: "8%", left: "88%" },
      desktop: { top: "6%", left: "88%" },
    },
    zIndex: 6,
     className: "animate-always-slow",     // ✅ NEW
  transformOrigin: "50% 50%",            // ✅ NEW (hangs from top)
  },
  {
    src: "/assets/images/brand/visual-merch/6.webp",
    alt: "tree",
    dimensions: {
      mobile: { width: 160, height: 160 },
      tablet: { width: 160, height: 160 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "89%", left: "-7%" },
      tablet: { top: "64%", left: "0%" },
      desktop: { top: "64%", left: "-1%" },
    },
    zIndex: 3,
    className:"animate-always-slow",
    transformOrigin: "50% 100%",
  },
  {
    src: "/assets/images/brand/visual-merch/7.webp",
    alt: "frame with nike",
    dimensions: {
      mobile: { width: 250, height: 220 },
      tablet: { width: 190, height: 190 },
      desktop: { width: 240, height: 240 },
    },
    position: {
      mobile: { top: "60%", left: "-6%" },
      tablet: { top: "79%", left: "20%" },
      desktop: { top: "79%", left: "18%" },
    },
    zIndex: 1,
  },
];

type Breakpoint = "mobile" | "tablet" | "desktop";

type ImageItemProps = {
  img: ImageConfig;
  index: number;
  breakpoint: Breakpoint;
  treesAudioRef: React.RefObject<HTMLAudioElement | null>;
  muted: boolean;
};

const ImageItem = ({
  img,
  index,
  breakpoint,
  treesAudioRef,
  muted,
}: ImageItemProps) => {
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
    // stop trees sfx if leaving a tree image
    if (img.alt.toLowerCase().includes("tree") && treesAudioRef.current) {
      treesAudioRef.current.pause();
      treesAudioRef.current.currentTime = 0;
    }
  };

  const handleMouseEnter = () => {
    if (
      img.alt.toLowerCase().includes("tree") &&
      treesAudioRef.current &&
      !muted
    ) {
      const a = treesAudioRef.current;
      a.currentTime = 0;
      a.volume = 0.5;
      a.play().catch(() => {});
    }
  };

  const position = img.position[breakpoint];
  const dimensions = img.dimensions[breakpoint];

  return (
    <motion.div
      ref={ref}
      className={`absolute cursor-pointer will-change-transform ${img.className || ""}`}
      style={{
        top: position.top,
        left: position.left,
        transform: "translate(-50%, -50%)",
        width: `${dimensions.width}px`,
        height: `${dimensions.height}px`,
        zIndex: img.zIndex ?? index,
        x: springX,
        y: springY,
          transformOrigin: img.transformOrigin ?? "50% 50%"
      }}
      whileHover={{ scale: breakpoint === "mobile" ? 1 : 1.08 }}
      whileTap={{ scale: breakpoint === "mobile" ? 0.95 : 1 }}
      transition={{
        scale: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
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

export default function VisualMerchandising() {
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");
  const [containerScale, setContainerScale] = useState(1);
  const treesAudioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint("mobile");
        setContainerScale(0.7);
      } else if (width < 1024) {
        setBreakpoint("tablet");
        setContainerScale(0.75);
      } else {
        setBreakpoint("desktop");
        setContainerScale(1);
      }
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  // sync with global mute from TimedAudio
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ muted: boolean }>;
      if (ce?.detail && typeof ce.detail.muted === "boolean") {
        setMuted(ce.detail.muted);
        if (ce.detail.muted && treesAudioRef.current) {
          treesAudioRef.current.pause();
          treesAudioRef.current.currentTime = 0;
        }
      }
    };
    window.addEventListener("wiw-audio-mute-change", handler as EventListener);
    return () =>
      window.removeEventListener("wiw-audio-mute-change", handler as EventListener);
  }, []);

  // Force recalculation when switching between desktop/mobile in dev tools
  useEffect(() => {
    const handleResize = () => {
      // Trigger a re-render by forcing state update
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint("mobile");
        setContainerScale(0.7);
      } else if (width < 1024) {
        setBreakpoint("tablet");
        setContainerScale(0.75);
      } else {
        setBreakpoint("desktop");
        setContainerScale(1);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-screen overflow-x-hidden pt-16 md:pt-20">
          {audioSegments.filter(s=>s.type==="background").map(segment => (
              <TimedAudio key={segment.id} src={segment.src} start={segment.start} volume={segment.volume} fixed loop className="z-70" />
            ))}

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        {/* Desktop/Tablet: Side by side layout */}
        <div className="hidden sm:flex justify-between items-center gap-3">
          <Heading text="VISUAL MERCHANDISING" />
          <BookNowButton sessionType="visual-merchandising" />
        </div>

        {/* Mobile: Stacked layout with button on new line at right */}
        <div className="flex flex-col sm:hidden gap-3">
          <Heading text="VISUAL MERCHANDISING" />
          <div className="flex justify-end">
            <BookNowButton sessionType="visual-merchandising" />
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-6 sm:mt-8 mb-8 sm:mb-12">
        <div className="flex flex-col-reverse lg:flex-row gap-8 md:gap-12 lg:gap-8 xl:gap-12">
          {/* Text Section */}
          <motion.div
            className="w-full lg:w-1/3 shrink-0 mt-[100px] sm:mt-0"
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
              How your store looks says everything before anything else. I help
              you make sure it&apos;s saying the right thing.
              <br /> From window displays and shelf styling to layout flow and
              product presentation; I style your space so people want to walk in
              and stay. Whether you&apos;re a boutique, concept store, or brand
              doing a pop-up, I help translate your identity into a physical
              experience that feels good and looks right. We&apos;ll start by
              understanding your brand and what you want people to feel when
              they walk in. Then I plan, source, and style your space: ensuring
              everything from color flow to product placement tells a story.
              <br />
              <br /> Why it works: Because good styling doesn&apos;t just look
              pretty; it sells, connects, and makes people remember your brand.
            </p>
          </motion.div>

          {/* Image Composition Section */}
          <div className="w-full lg:w-2/3 relative  mt-50 sm:mt-0">
            <motion.div
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
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: "16/9", overflow: "visible" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `scale(${containerScale})`,
                    transformOrigin: "top left",
                  }}
                >
                  {images.map((img, idx) => (
                    <ImageItem
                      key={idx}
                      img={img}
                      index={idx}
                      breakpoint={breakpoint}
                      treesAudioRef={treesAudioRef}
                      muted={muted}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
