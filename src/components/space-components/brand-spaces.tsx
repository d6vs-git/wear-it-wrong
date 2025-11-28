"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Heading } from "../ui/heading";
import { BookNowButton } from "../ui/book-now-button";
import { useState, useRef, useEffect } from "react";
import TimedAudio from "@/components/audio/timed-audio";

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
    src: "/assets/sounds/brand-spaces/hermans-habit.mp3",
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
  className?: string;
  dimensions: ResponsiveDimensions;
  position: ResponsivePosition;
  zIndex?: number;
  hasFlicker?: boolean;
};

const images: ImageConfig[] = [
  {
    src: "/assets/images/space/brand-spaces/1.webp",
    alt: "chair-left",
    dimensions: {
      mobile: { width: 160, height: 160 },
      tablet: { width: 160, height: 160 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "12%", left: "7%" },
      tablet: { top: "11%", left: "5%" },
      desktop: { top: "10%", left: "4%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/2.webp",
    alt: "chair-right",
    dimensions: {
      mobile: { width: 160, height: 160 },
      tablet: { width: 160, height: 160 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "12%", left: "29%" },
      tablet: { top: "11%", left: "27%" },
      desktop: { top: "10%", left: "26%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.webp",
    alt: "table",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 127, height: 127 },
      desktop: { width: 160, height: 160 },
    },
    position: {
      mobile: { top: "24%", left: "21%" },
      tablet: { top: "23%", left: "19%" },
      desktop: { top: "22%", left: "18%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/4.webp",
    alt: "lamp",
    dimensions: {
      mobile: { width: 70, height: 70 },
      tablet: { width: 80, height: 80 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "14%", left: "29%" },
      tablet: { top: "13%", left: "22%" },
      desktop: { top: "12%", left: "21%" },
    },
    hasFlicker: true,
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/5.webp",
    alt: "seat-sofa",
    dimensions: {
      mobile: { width: 360, height: 360 },
      tablet: { width: 390, height: 390 },
      desktop: { width: 500, height: 500 },
    },
    position: {
      mobile: { top: "75%", left: "25%" },
      tablet: { top: "11%", left: "42%" },
      desktop: { top: "10%", left: "40%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.webp",
    alt: "table",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 127, height: 127 },
      desktop: { width: 160, height: 160 },
    },
    position: {
      mobile: { top: "45%", left: "70%" },
      tablet: { top: "62%", left: "86%" },
      desktop: { top: "61%", left: "87%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/4.webp",
    alt: "lamp",
    dimensions: {
      mobile: { width: 70, height: 70 },
      tablet: { width: 80, height: 80 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "34%", left: "77%" },
      tablet: { top: "52%", left: "89%" },
      desktop: { top: "51%", left: "90%" },
    },
    hasFlicker: true,
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.webp",
    alt: "table",
    dimensions: {
      mobile: { width: 130, height: 130 },
      tablet: { width: 127, height: 127 },
      desktop: { width: 160, height: 160 },
    },
    position: {
      mobile: { top: "165%", left: "50%" },
      tablet: { top: "83%", left: "71%" },
      desktop: { top: "82%", left: "72%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/2.webp",
    alt: "chair-right-1",
    dimensions: {
      mobile: { width: 160, height: 160 },
      tablet: { width: 160, height: 160 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "155%", left: "69%" },
      tablet: { top: "77%", left: "77%" },
      desktop: { top: "77%", left: "82%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/4.webp",
    alt: "lamp",
    dimensions: {
      mobile: { width: 70, height: 70 },
      tablet: { width: 80, height: 80 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "153%", left: "59%" },
      tablet: { top: "73%", left: "74%" },
      desktop: { top: "72%", left: "75%" },
    },
    hasFlicker: true,
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/1.webp",
    alt: "chair-left",
    dimensions: {
      mobile: { width: 160, height: 160 },
      tablet: { width: 160, height: 160 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "62%", left: "-3%" },
      tablet: { top: "61%", left: "-5%" },
      desktop: { top: "60%", left: "-2%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/2.webp",
    alt: "chair-right",
    dimensions: {
      mobile: { width: 160, height: 160 },
      tablet: { width: 160, height: 160 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "62%", left: "19%" },
      tablet: { top: "61%", left: "17%" },
      desktop: { top: "60%", left: "16%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.webp",
    alt: "table",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 127, height: 127 },
      desktop: { width: 160, height: 160 },
    },
    position: {
      mobile: { top: "80%", left: "11%" },
      tablet: { top: "73%", left: "9%" },
      desktop: { top: "72%", left: "8%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/4.webp",
    alt: "lamp",
    dimensions: {
      mobile: { width: 70, height: 70 },
      tablet: { width: 80, height: 80 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "138%", left: "10%" },
      tablet: { top: "63%", left: "12%" },
      desktop: { top: "62%", left: "11%" },
    },
    hasFlicker: true,
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.webp",
    alt: "table",
    dimensions: {
      mobile: { width: 130, height: 130 },
      tablet: { width: 127, height: 127 },
      desktop: { width: 160, height: 160 },
    },
    position: {
      mobile: { top: "115%", left: "30%" },
      tablet: { top: "58%", left: "43%" },
      desktop: { top: "57%", left: "42%" },
    },
    zIndex: 0,
  },
  {
    src: "/assets/images/space/brand-spaces/4.webp",
    alt: "lamp",
    dimensions: {
      mobile: { width: 70, height: 70 },
      tablet: { width: 80, height: 80 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "70%", left: "20%" },
      tablet: { top: "48%", left: "46%" },
      desktop: { top: "47%", left: "45%" },
    },
    hasFlicker: true,
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.webp",
    alt: "table",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 127, height: 127 },
      desktop: { width: 160, height: 160 },
    },
    position: {
      mobile: { top: "155%", left: "5%" },
      tablet: { top: "80%", left: "39%" },
      desktop: { top: "79%", left: "38%" },
    },
    zIndex: 9,
  },
  {
    src: "/assets/images/space/brand-spaces/4.webp",
    alt: "lamp",
    dimensions: {
      mobile: { width: 70, height: 70 },
      tablet: { width: 80, height: 80 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "107%", left: "38%" },
      tablet: { top: "70%", left: "42%" },
      desktop: { top: "69%", left: "41%" },
    },
    hasFlicker: true,
    zIndex: 11,
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
      whileHover={{ scale: breakpoint === "mobile" ? 1 : 1.08 }}
      whileTap={{ scale: breakpoint === "mobile" ? 0.95 : 1 }}
      animate={{
        filter: img.hasFlicker
          ? [
              "blur(0px) brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0))",
              "blur(0px) brightness(1.3) drop-shadow(0 0 8px rgba(255,255,200,0.6))",
              "blur(0px) brightness(0.9) drop-shadow(0 0 4px rgba(255,255,200,0.3))",
              "blur(0px) brightness(1.2) drop-shadow(0 0 10px rgba(255,255,200,0.8))",
              "blur(0px) brightness(1) drop-shadow(0 0 6px rgba(255,255,200,0.4))",
              "blur(0px) brightness(1.1) drop-shadow(0 0 5px rgba(255,255,200,0.5))",
              "blur(0px) brightness(1) drop-shadow(0 0 0px rgba(255,255,255,0))",
            ]
          : undefined,
      }}
      transition={{
        scale: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
        filter: img.hasFlicker
          ? {
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1],
            }
          : undefined,
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

export default function BrandSpaces() {
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
        <div className="flex justify-between items-center gap-3">
          <Heading text="BRAND SPACES" />
          <BookNowButton sessionType="brand-spaces" />
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-6 sm:mt-8 mb-8 sm:mb-12">
        <div className="flex flex-col-reverse lg:flex-row gap-12 md:gap-10 lg:gap-4 mt-8 sm:mt-10">
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
              Your space is often the first time someone experiences your brand,
              so it should tell your story without saying a word.
              <br></br> I help brands design and style their physical spaces;
              whether it&apos;s a store, studio, or pop-up, so it looks good,
              feels cohesive, and makes sense for how people actually move
              through it. We start by understanding your identity and what you
              want the space to communicate. From there, I help plan the layout,
              materials, color story, and decor details that bring that feeling
              to life. It&apos;s not just about making things pretty but about
              creating a space that feels intentional, on-brand, and easy to
              maintain.
              <br></br>Whether you&apos;re setting up from scratch or reworking
              an existing space, the goal is simple: to make your space feel
              like your brand.
              <br></br>lived-in, real, and instantly recognizable.
            </p>
          </motion.div>

          <motion.div
            className={`w-full lg:w-2/3 relative ${
              breakpoint === "mobile" ? "aspect-4/3" : "aspect-video"
            } overflow-hidden`}
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