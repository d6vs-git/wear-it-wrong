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
  // Top Row - 6 Paintings (Left to Right)
  {
    src: "/assets/images/space/space-edit/painting1.png",
    alt: "painting-top-1",
    dimensions: {
      mobile: { width: 55, height: 55 },
      tablet: { width: 87, height: 87 },
      desktop: { width: 155, height: 155 },
    },
    position: {
      mobile: { top: "5%", left: "-3%" }, // was 0%
      tablet: { top: "5%", left: "4%" }, // was 4%
      desktop: { top: "9%", left: "8%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting5.png",
    alt: "painting-top-2",
    dimensions: {
      mobile: { width: 90, height: 90 },
      tablet: { width: 127, height: 127 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "2%", left: "12%" }, // was 17%
      tablet: { top: "3%", left: "15%" }, // was 20%
      desktop: { top: "7%", left: "24%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting3.png",
    alt: "painting-top-3",
    dimensions: {
      mobile: { width: 80, height: 80 },
      tablet: { width: 113, height: 113 },
      desktop: { width: 165, height: 165 },
    },
    position: {
      mobile: { top: "6%", left: "33%" }, // was 38%
      tablet: { top: "4%", left: "32%" }, // was 37%
      desktop: { top: "8%", left: "41%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting4.png",
    alt: "painting-top-4",
    dimensions: {
      mobile: { width: 95, height: 95 },
      tablet: { width: 133, height: 133 },
      desktop: { width: 190, height: 190 },
    },
    position: {
      mobile: { top: "4%", left: "51%" }, // was 56%
      tablet: { top: "2%", left: "50%" }, // was 55%
      desktop: { top: "6%", left: "59%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting3.png",
    alt: "painting-top-5",
    dimensions: {
      mobile: { width: 75, height: 75 },
      tablet: { width: 107, height: 107 },
      desktop: { width: 155, height: 155 },
    },
    position: {
      mobile: { top: "7%", left: "68%" }, // was 73%
      tablet: { top: "5%", left: "67%" }, // was 72%
      desktop: { top: "9%", left: "76%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting5.png",
    alt: "painting-top-6",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 170, height: 170 },
    },
    position: {
      mobile: { top: "5%", left: "83%" }, // was 88%
      tablet: { top: "3%", left: "82%" }, // was 87%
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
      mobile: { top: "75%", left: "80%" },
      tablet: { top: "60%", left: "75%" },
      desktop: { top: "65%", left: "85%" },
    },
    zIndex: 8,
  },

  // Middle Row - 5 Paintings
  {
    src: "/assets/images/space/space-edit/painting4.png",
    alt: "painting-middle-2",
    dimensions: {
      mobile: { width: 75, height: 75 },
      tablet: { width: 107, height: 107 },
      desktop: { width: 155, height: 155 },
    },
    position: {
      mobile: { top: "25%", left: "16%" }, // was 21%
      tablet: { top: "23%", left: "15%" }, // was 20%
      desktop: { top: "27%", left: "24%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting1.png",
    alt: "painting-middle-3",
    dimensions: {
      mobile: { width: 80, height: 80 },
      tablet: { width: 113, height: 113 },
      desktop: { width: 165, height: 165 },
    },
    position: {
      mobile: { top: "24%", left: "33%" }, // was 38%
      tablet: { top: "22%", left: "32%" }, // was 37%
      desktop: { top: "26%", left: "41%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting3.png",
    alt: "painting-middle-4",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 170, height: 170 },
    },
    position: {
      mobile: { top: "23%", left: "51%" }, // was 56%
      tablet: { top: "21%", left: "50%" }, // was 55%
      desktop: { top: "25%", left: "59%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting6.png",
    alt: "painting-middle-5",
    dimensions: {
      mobile: { width: 80, height: 80 },
      tablet: { width: 113, height: 113 },
      desktop: { width: 165, height: 165 },
    },
    position: {
      mobile: { top: "24%", left: "68%" }, // was 73%
      tablet: { top: "22%", left: "67%" }, // was 72%
      desktop: { top: "26%", left: "76%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/space/space-edit/painting4.png",
    alt: "painting-middle-6",
    dimensions: {
      mobile: { width: 75, height: 75 },
      tablet: { width: 107, height: 107 },
      desktop: { width: 155, height: 155 },
    },
    position: {
      mobile: { top: "25%", left: "83%" }, // was 88%
      tablet: { top: "23%", left: "82%" }, // was 87%
      desktop: { top: "27%", left: "91%" },
    },
    zIndex: 3,
  },
  // Lamp (standing, left side, below perfume)
  {
    src: "/assets/images/space/space-edit/lamp.png",
    alt: "standing-lamp",
    dimensions: {
      mobile: { width: 120, height: 150 },
      tablet: { width: 200, height: 250 },
      desktop: { width: 300, height: 500 },
    },
    position: {
      mobile: { top: "30%", left: "-12%" },
      tablet: { top: "30%", left: "15%" },
      desktop: { top: "12%", left: "10%" },
    },
    zIndex: 4,
  },

  // Bottom Section - Large Sofa (Center)
  {
    src: "/assets/images/space/space-edit/sofa.png",
    alt: "sofa",
    dimensions: {
      mobile: { width: 200, height: 200 },
      tablet: { width: 300, height: 300 },
      desktop: { width: 530, height: 309 },
    },
    position: {
      mobile: { top: "45%", left: "10%" },
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
      mobile: { width: 80, height: 60 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 165, height: 165 },
    },
    position: {
      mobile: { top: "90%", left: "70%" },
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
      mobile: { width: 50, height: 50 },
      tablet: { width: 60, height: 60 },
      desktop: { width: 80, height: 80 },
    },
    position: {
      mobile: { top: "62%", left: "71%" },
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
      mobile: { width: 80, height: 90 },
      tablet: { width: 180, height: 180 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "70%", left: "80%" },
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
    <div className="w-screen overflow-hidden pt-16 md:pt-20">
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
            <p className="text-[13px] sm:text-[15px] md:text-base lg:text-lg text-black leading-relaxed">
              Sometimes your space just needs a few small shifts to feel right
              again — not a full change, just the things that were slightly off
              or no longer working for you.
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
              tweaks, color, rearranging furniture, or adding a few key pieces.
              <br />
              <br />
              It&apos;s practical, intentional, and built around what you
              already have and how you actually use the space. No overthinking,
              no unnecessary things.
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
