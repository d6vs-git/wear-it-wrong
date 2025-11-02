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
    src: "/assets/images/space/space-edit/1.png",
    alt: "painting",
    dimensions: {
      mobile: { width: 80, height: 80 },
      tablet: { width: 107, height: 107 },
      desktop: { width: 135, height: 135 },
    },
    position: {
      mobile: { top: "17%", left: "2%" },
      tablet: { top: "15%", left: "0%" },
      desktop: { top: "14%", left: "-1%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/2.png",
    alt: "painting",
    dimensions: {
      mobile: { width: 90, height: 90 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 150, height: 150 },
    },
    position: {
      mobile: { top: "23%", left: "6%" },
      tablet: { top: "21%", left: "4%" },
      desktop: { top: "20%", left: "3%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/3.png",
    alt: "painting",
    dimensions: {
      mobile: { width: 70, height: 70 },
      tablet: { width: 93, height: 93 },
      desktop: { width: 117, height: 117 },
    },
    position: {
      mobile: { top: "19%", left: "13%" },
      tablet: { top: "17%", left: "11%" },
      desktop: { top: "16%", left: "10%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/4.png",
    alt: "art",
    dimensions: {
      mobile: { width: 60, height: 60 },
      tablet: { width: 80, height: 80 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "9%", left: "7%" },
      tablet: { top: "7%", left: "5%" },
      desktop: { top: "6%", left: "4%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/5.png",
    alt: "painting",
    dimensions: {
      mobile: { width: 135, height: 135 },
      tablet: { width: 180, height: 180 },
      desktop: { width: 225, height: 225 },
    },
    position: {
      mobile: { top: "35%", left: "9%" },
      tablet: { top: "33%", left: "7%" },
      desktop: { top: "32%", left: "6%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/6.png",
    alt: "sofa",
    dimensions: {
      mobile: { width: 210, height: 210 },
      tablet: { width: 280, height: 280 },
      desktop: { width: 350, height: 350 },
    },
    position: {
      mobile: { top: "10%", left: "63%" },
      tablet: { top: "8%", left: "61%" },
      desktop: { top: "7%", left: "60%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/7.png",
    alt: "furniture",
    dimensions: {
      mobile: { width: 210, height: 210 },
      tablet: { width: 280, height: 280 },
      desktop: { width: 350, height: 350 },
    },
    position: {
      mobile: { top: "57%", left: "7%" },
      tablet: { top: "56%", left: "5%" },
      desktop: { top: "55%", left: "4%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/8.png",
    alt: "painting",
    dimensions: {
      mobile: { width: 165, height: 165 },
      tablet: { width: 220, height: 220 },
      desktop: { width: 275, height: 275 },
    },
    position: {
      mobile: { top: "74%", left: "32%" },
      tablet: { top: "73%", left: "30%" },
      desktop: { top: "72%", left: "29%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/9.png",
    alt: "painting",
    dimensions: {
      mobile: { width: 150, height: 150 },
      tablet: { width: 200, height: 200 },
      desktop: { width: 250, height: 250 },
    },
    position: {
      mobile: { top: "45%", left: "55%" },
      tablet: { top: "43%", left: "53%" },
      desktop: { top: "42%", left: "52%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/10.png",
    alt: "furniture",
    dimensions: {
      mobile: { width: 75, height: 75 },
      tablet: { width: 100, height: 100 },
      desktop: { width: 125, height: 125 },
    },
    position: {
      mobile: { top: "51%", left: "66%" },
      tablet: { top: "50%", left: "64%" },
      desktop: { top: "49%", left: "63%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/11.png",
    alt: "plant",
    dimensions: {
      mobile: { width: 60, height: 60 },
      tablet: { width: 80, height: 80 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "63%", left: "70%" },
      tablet: { top: "62%", left: "68%" },
      desktop: { top: "61%", left: "67%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/12.png",
    alt: "painting",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 160, height: 160 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "30%", left: "84%" },
      tablet: { top: "28%", left: "82%" },
      desktop: { top: "27%", left: "81%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/13.png",
    alt: "sofa",
    dimensions: {
      mobile: { width: 165, height: 165 },
      tablet: { width: 220, height: 220 },
      desktop: { width: 275, height: 275 },
    },
    position: {
      mobile: { top: "64%", left: "75%" },
      tablet: { top: "63%", left: "73%" },
      desktop: { top: "62%", left: "72%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/14.png",
    alt: "painting",
    dimensions: {
      mobile: { width: 80, height: 80 },
      tablet: { width: 107, height: 107 },
      desktop: { width: 135, height: 135 },
    },
    position: {
      mobile: { top: "10%", left: "90%" },
      tablet: { top: "8%", left: "88%" },
      desktop: { top: "7%", left: "87%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/15.png",
    alt: "painting",
    dimensions: {
      mobile: { width: 135, height: 135 },
      tablet: { width: 180, height: 180 },
      desktop: { width: 225, height: 225 },
    },
    position: {
      mobile: { top: "31%", left: "30%" },
      tablet: { top: "29%", left: "28%" },
      desktop: { top: "28%", left: "27%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/space-edit/16.png",
    alt: "painting",
    dimensions: {
      mobile: { width: 105, height: 105 },
      tablet: { width: 140, height: 140 },
      desktop: { width: 175, height: 175 },
    },
    position: {
      mobile: { top: "58%", left: "86%" },
      tablet: { top: "57%", left: "84%" },
      desktop: { top: "56%", left: "83%" },
    },
    zIndex: 5,
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
    <div className="w-screen overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        <div className="flex justify-between items-center gap-3">
          <Heading text="SPACE EDIT" />
          <BookNowButton />
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
              Sometimes your space just needs a few small shifts to feel
              right again — not a full change, just the things that were
              slightly off or no longer working for you.
              <br />
              <br />
              This one&apos;s for when you don&apos;t need a big overhaul, but
              could use a second eye, a clearer direction, or someone to help
              you figure out what&apos;s missing.
              <br />
              <br />
              We&apos;ll walk through your space together — physically or
              through photos — and talk about what feels stuck or incomplete.
              <br />
              <br />
              Then I&apos;ll give you clear, specific suggestions for small
              updates that can make a bigger difference: lighting, layout
              tweaks, color, rearranging furniture, or adding a few key
              pieces.
              <br />
              <br />
              It&apos;s practical, intentional, and built around what you already
              have and how you actually use the space. No overthinking, no
              unnecessary things.
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
