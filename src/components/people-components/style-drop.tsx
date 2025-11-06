"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Heading } from "../heading";
import { BookNowButton } from "../book-now-button";
import { useState, useRef, useEffect } from "react";

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
};

const images: ImageConfig[] = [
  {
    src: "/assets/images/people/style-drop/1.png",
    alt: "Frame-1",
    dimensions: {
      mobile: { width: 280, height: 280 },
      tablet: { width: 390, height: 390 },
      desktop: { width: 500, height: 500 },
    },
    position: {
      mobile: { top: "-5%", left: "-4%" },
      tablet: { top: "-8%", left: "-7%" },
      desktop: { top: "-10%", left: "-9%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/people/style-drop/2.png",
    alt: "wooden-box-1",
    dimensions: {
      mobile: { width: 100, height: 100 },
      tablet: { width: 140, height: 140 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "24%", left: "44%" },
      tablet: { top: "22%", left: "42%" },
      desktop: { top: "21%", left: "40%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/people/style-drop/3.png",
    alt: "carpet",
    dimensions: {
      mobile: { width: 220, height: 220 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 380, height: 380 },
    },
    position: {
      mobile: { top: "49%", left: "65%" },
      tablet: { top: "47%", left: "63%" },
      desktop: { top: "46%", left: "61%" },
    },
    zIndex: 0,
  },
  {
    src: "/assets/images/people/style-drop/4.png",
    alt: "Cake-2",
    dimensions: {
      mobile: { width: 160, height: 160 },
      tablet: { width: 215, height: 215 },
      desktop: { width: 270, height: 270 },
    },
    position: {
      mobile: { top: "20%", left: "60%" },
      tablet: { top: "18%", left: "58%" },
      desktop: { top: "17%", left: "57%" },
    },
    zIndex: 1,
  },
  {
    src: "/assets/images/people/style-drop/5.png",
    alt: "flowers",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 160, height: 160 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "1%", left: "66%" },
      tablet: { top: "0%", left: "64%" },
      desktop: { top: "-2%", left: "63%" },
    },
    zIndex: 6,
  },
  {
    src: "/assets/images/people/style-drop/6.png",
    alt: "roller with cloths in it",
    dimensions: {
      mobile: { width: 240, height: 240 },
      tablet: { width: 320, height: 320 },
      desktop: { width: 400, height: 400 },
    },
    position: {
      mobile: { top: "6%", left: "76%" },
      tablet: { top: "4%", left: "74%" },
      desktop: { top: "3%", left: "72%" },
    },
    zIndex: 1,
  },
  {
    src: "/assets/images/people/style-drop/image55.png",
    alt: "wooden blocks",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 160, height: 160 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "20%", left: "34%" },
      tablet: { top: "18%", left: "32%" },
      desktop: { top: "17%", left: "31%" },
    },
    zIndex: 9,
  },
  {
    src: "/assets/images/people/style-drop/7.png",
    alt: "lamp",
    dimensions: {
      mobile: { width: 140, height: 140 },
      tablet: { width: 185, height: 185 },
      desktop: { width: 230, height: 230 },
    },
    position: {
      mobile: { top: "25%", left: "28%" },
      tablet: { top: "23%", left: "26%" },
      desktop: { top: "22%", left: "25%" },
    },
    zIndex: 10,
  },
  {
    src: "/assets/images/people/style-drop/8.png",
    alt: "dress3",
    dimensions: {
      mobile: { width: 180, height: 180 },
      tablet: { width: 240, height: 240 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "57%", left: "31%" },
      tablet: { top: "55%", left: "29%" },
      desktop: { top: "54%", left: "28%" },
    },
    zIndex: 8,
  },
  {
    src: "/assets/images/people/style-drop/9.png",
    alt: "table",
    dimensions: {
      mobile: { width: 150, height: 90 },
      tablet: { width: 200, height: 120 },
      desktop: { width: 250, height: 150 },
    },
    position: {
      mobile: { top: "77%", left: "17%" },
      tablet: { top: "76%", left: "15%" },
      desktop: { top: "75%", left: "14%" },
    },
    zIndex: 10,
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
      className="absolute cursor-pointer will-change-transform"
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

export default function StyleDrop() {
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
    <div className="w-screen overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        <div className="flex justify-between items-center gap-3">
          <Heading text="STYLE DROP" />
          <BookNowButton sessionType="style-drop" />
        </div>
        <div className="text-2xl sm:text-3xl md:text-4xl mt-4 sm:mt-6">
          ₹5,000
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
              You fill out a quick form or send me a moodboard to show your
              vibe.
              <br />
              <br />
              We talk through what you already have and what you&apos;re
              looking for; maybe you&apos;re updating your basics, building work
              looks, or want help finding everyday pieces that feel more you.
              <br />
              <br />
              I then curate a digital style pack just for you, complete with
              outfit ideas, styling notes, and shopping links to everything you
              need.
              <br />
              <br />
              Your Style Drop arrives straight in your inbox, ready to shop or
              save for later.
              <br />
              <br />
              It&apos;s personal styling made easy; no appointments, no stress,
              just your style delivered.
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
