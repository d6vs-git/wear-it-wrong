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
    src: "/assets/images/people/occasion-styling/flower-pot.png",
    alt: "flower pot with leaves",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 160, height: 160 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "70%", left: "-15%" },
      tablet: { top: "59%", left: "-8%" },
      desktop: { top: "58%", left: "-11%" },
    },
    zIndex: 10,
  },
  {
    src: "/assets/images/people/occasion-styling/table.png",
    alt: "table",
    dimensions: {
      mobile: { width: 100, height: 100 },
      tablet: { width: 135, height: 135 },
      desktop: { width: 170, height: 170 },
    },
    position: {
      mobile: { top: "74%", left: "25%" },
      tablet: { top: "63%", left: "36%" },
      desktop: { top: "62%", left: "34%" },
    },
    zIndex: 12,
  },
  {
    src: "/assets/images/people/occasion-styling/dress-roller.png",
    alt: "Standing Dress Roller",
    dimensions: {
      mobile: { width: 280, height: 280 },
      tablet: { width: 390, height: 390 },
      desktop: { width: 500, height: 500 },
    },
    position: {
      mobile: { top: "5%", left: "-18%" },
      tablet: { top: "-15%", left: "-12%" },
      desktop: { top: "-19%", left: "-14%" },
    },
    zIndex: 6,
  },
  {
    src: "/assets/images/people/occasion-styling/carpet2.png",
    alt: "Carpet",
    dimensions: {
      mobile: { width: 240, height: 240 },
      tablet: { width: 330, height: 330 },
      desktop: { width: 420, height: 420 },
    },
    position: {
      mobile: { top: "38%", left: "-8%" },
      tablet: { top: "26%", left: "0%" },
      desktop: { top: "25%", left: "-1%" },
    },
    zIndex: 1,
  },
  {
    src: "/assets/images/people/occasion-styling/box.png",
    alt: "box",
    dimensions: {
      mobile: { width: 80, height: 80 },
      tablet: { width: 110, height: 110 },
      desktop: { width: 140, height: 140 },
    },
    position: {
      mobile: { top: "71%", left: "10%" },
      tablet: { top: "60%", left: "20%" },
      desktop: { top: "59%", left: "19%" },
    },
    zIndex: 10,
  },
  {
    src: "/assets/images/people/occasion-styling/carpet1.png",
    alt: "Carpet 1",
    dimensions: {
      mobile: { width: 300, height: 300 },
      tablet: { width: 420, height: 420 },
      desktop: { width: 530, height: 530 },
    },
    position: {
      mobile: { top: "28%", left: "35%" },
      tablet: { top: "16%", left: "45%" },
      desktop: { top: "15%", left: "43%" },
    },
    zIndex: 1,
  },
  {
    src: "/assets/images/people/occasion-styling/dress2.png",
    alt: "dress2",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 160, height: 160 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "40%", left: "57%" },
      tablet: { top: "28%", left: "58%" },
      desktop: { top: "27%", left: "56%" },
    },
    zIndex: 9,
  },
  {
    src: "/assets/images/people/occasion-styling/dress3.png",
    alt: "dress3",
    dimensions: {
      mobile: { width: 240, height: 240 },
      tablet: { width: 320, height: 320 },
      desktop: { width: 400, height: 400 },
    },
    position: {
      mobile: { top: "13%", left: "23%" },
      tablet: { top: "1%", left: "34%" },
      desktop: { top: "-1%", left: "32%" },
    },
    zIndex: 8,
  },
  {
    src: "/assets/images/people/occasion-styling/hanging-lamp.png",
    alt: "Hanging Lamp",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 160, height: 160 },
      desktop: { width: 200, height: 200 },
    },
    position: {
      mobile: { top: "-5%", left: "21%" },
      tablet: { top: "-17%", left: "32%" },
      desktop: { top: "-19%", left: "30%" },
    },
    zIndex: 10,
  },
  {
    src: "/assets/images/people/occasion-styling/shoes.png",
    alt: "Shoes",
    dimensions: {
      mobile: { width: 60, height: 60 },
      tablet: { width: 80, height: 80 },
      desktop: { width: 100, height: 100 },
    },
    position: {
      mobile: { top: "62%", left: "28%" },
      tablet: { top: "51%", left: "39%" },
      desktop: { top: "50%", left: "38%" },
    },
    zIndex: 13,
  },
  {
    src: "/assets/images/people/occasion-styling/dress1.png",
    alt: "dress-4",
    dimensions: {
      mobile: { width: 140, height: 140 },
      tablet: { width: 190, height: 190 },
      desktop: { width: 240, height: 240 },
    },
    position: {
      mobile: { top: "19%", left: "53%" },
      tablet: { top: "7%", left: "54%" },
      desktop: { top: "6%", left: "53%" },
    },
    zIndex: 9,
  },
  {
    src: "/assets/images/people/occasion-styling/dress4.png",
    alt: "dress-5",
    dimensions: {
      mobile: { width: 240, height: 240 },
      tablet: { width: 320, height: 320 },
      desktop: { width: 400, height: 400 },
    },
    position: {
      mobile: { top: "31%", left: "63%" },
      tablet: { top: "19%", left: "64%" },
      desktop: { top: "18%", left: "62%" },
    },
    zIndex: 6,
  },
  {
    src: "/assets/images/people/occasion-styling/rod.png",
    alt: "rod",
    dimensions: {
      mobile: { width: 200, height: 200 },
      tablet: { width: 280, height: 280 },
      desktop: { width: 360, height: 360 },
    },
    position: {
      mobile: { top: "-8%", left: "54%" },
      tablet: { top: "-26%", left: "55%" },
      desktop: { top: "-28%", left: "54%" },
    },
    zIndex: 7,
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

export default function OccasionStyling() {
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
          <Heading text="OCCASION STYLING" />
          <BookNowButton sessionType="occasion-styling" />
        </div>
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 sm:mt-6">
          ₹3,500 <span className="text-base sm:text-lg md:text-xl lg:text-2xl"> per look </span>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-6 sm:mt-8 mb-8 sm:mb-12">
        <div className="flex flex-col-reverse lg:flex-row gap-8 md:gap-10 lg:gap-4">
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
              Tell me about your occasion; the event, the mood you&apos;re going for,
              and any ideas you already have.
             
              I&apos;ll take a look at your wardrobe, see what pieces you want to
              wear, and figure out how to make them feel fresh, elevated, and
              just you.
            
              I put together a full look: outfit, accessories, even hair and
              makeup suggestions (so you don&apos;t have to worry about a single
              detail). You&apos;ll get a clear presentation with options, links,
              and brand suggestions that fit your style and budget.
           
              If you want, I can also shop or join you for fittings to make sure
              everything comes together perfectly — this can be added as an
              hourly service.
            
              It&apos;s styling that actually works for you, your wardrobe, and
              your life.
            </p>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/3 relative aspect-video min-h-[400px] sm:min-h-[450px] md:min-h-[500px]"
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
