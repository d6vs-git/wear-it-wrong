
 
"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Heading } from "../heading";
import { BookNowButton } from "../ui/book-now-button";
import { useState, useRef, useEffect } from "react";
import TimedAudio from "@/components/audio/timed-audio";

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
   fixedTop?: boolean;
};

const images: ImageConfig[] = [
  {
    src: "/assets/images/people/wardrobe-detox/1.png",
    alt: "bags",
    dimensions: {
      mobile: { width: 140, height: 140 },
      tablet: { width: 220, height: 220 },
      desktop: { width: 280, height: 280 },
    },
    position: {
      mobile: { top: "63%", left: "29%" },
      tablet: { top: "43%", left: "34%" },
      desktop: { top: "42%", left: "32%" },
    },
    zIndex: 5,
    
  },
  {
    src: "/assets/images/people/wardrobe-detox/2.png",
    alt: "hanger-with cloths on it",
    dimensions: {
      mobile: { width: 330, height: 330},
      tablet: { width: 390, height: 390 },
      desktop: { width: 500, height: 500 },
    },
    position: {
      mobile: { top: "-10%", left: "-2%" },
      tablet: { top: "-27%", left: "2%" },
      desktop: { top: "-29%", left: "1%" },
    },
    zIndex: 3,
  },
  {
    src: "/assets/images/people/wardrobe-detox/3.png",
    alt: "bag",
    dimensions: {
      mobile: { width: 130, height: 130 },
      tablet: { width: 175, height: 175 },
      desktop: { width: 220, height: 220 },
    },
    position: {
      mobile: { top: "1%", left: "25%" },
      tablet: { top: "-15%", left: "19%" },
      desktop: { top: "-17%", left: "18%" },
    },
    zIndex: 6,
    className: "animate-always-slow",
    transformOrigin: "50% 0%",
    fixedTop: true,
  },
  {
    src: "/assets/images/people/wardrobe-detox/4.png",
    alt: "umbrella",
    dimensions: {
      mobile: { width: 230, height: 230 },
      tablet: { width: 330, height: 330 },
      desktop: { width: 420, height: 420 },
    },
    position: {
      mobile: { top: "97%", left: "46%" },
      tablet: { top: "35%", left: "56%" },
      desktop: { top: "34%", left: "54%" },
    },
    zIndex: 1,
  },
  {
    src: "/assets/images/people/wardrobe-detox/5.png",
    alt: "frame-1",
    dimensions: {
      mobile: { width: 40, height: 40},
      tablet: { width: 110, height: 110 },
      desktop: { width: 140, height: 140 },
    },
    position: {
      mobile: { top: "8%", left: "57%" },
      tablet: { top: "-2%", left: "69%" },
      desktop: { top: "-3%", left: "68%" },
    },
    zIndex: 4,
  },
  {
    src: "/assets/images/people/wardrobe-detox/6.png",
    alt: "frame-2",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 110, height: 110 },
      desktop: { width: 140, height: 140 },
    },
    position: {
      mobile: { top: "53%", left: "5%" },
      tablet: { top: "7%", left: "61%" },
      desktop: { top: "6%", left: "60%" },
    },
    zIndex: 5,
  },
  {
    src: "/assets/images/people/wardrobe-detox/7.png",
    alt: "clock",
    dimensions: {
      mobile: { width: 120, height: 120 },
      tablet: { width: 120, height: 120 },
      desktop: { width: 150, height: 150 },
    },
    position: {
      mobile: { top: "12%", left: "75%" },
      tablet: { top: "-3%", left: "80%" },
      desktop: { top: "-4%", left: "79%" },
    },
    zIndex: 7,
    className:"animate-rotate-360-slow"
  },
  {
    src: "/assets/images/people/wardrobe-detox/8.png",
    alt: "dress3",
    dimensions: {
      mobile: { width: 300, height: 300 },
      tablet: { width: 355, height: 355 },
      desktop: { width: 450, height: 450 },
    },
    position: {
      mobile: { top: "40%", left: "52%" },
      tablet: { top: "22%", left: "70%" },
      desktop: { top: "21%", left: "68%" },
    },
    zIndex: 8,
  },
  {
    src: "/assets/images/people/wardrobe-detox/9.png",
    alt: "Shoes-2",
    dimensions: {
      mobile: { width: 200, height: 200 },
      tablet: { width: 240, height: 240 },
      desktop: { width: 300, height: 300 },
    },
    position: {
      mobile: { top: "99%", left: "6%" },
      tablet: { top: "58%", left: "4%" },
      desktop: { top: "57%", left: "3%" },
    },
    zIndex: 10,
  },
  {
    src: "/assets/images/people/wardrobe-detox/10.png",
    alt: "poster",
    dimensions: {
      mobile: { width: 100, height: 100 },
      tablet: { width: 95, height: 95 },
      desktop: { width: 120, height: 120 },
    },
    position: {
      mobile: { top: "10%", left: "67%" },
      tablet: { top: "19%", left: "73%" },
      desktop: { top: "18%", left: "72%" },
    },
    zIndex: 6,
    className: "animate-popup-loop"  
  },
  {
    src: "/assets/images/people/wardrobe-detox/11.png",
    alt: "shoes-1",
    dimensions: {
      mobile: { width: 200, height: 200 },
      tablet: { width: 190, height: 190 },
      desktop: { width: 240, height: 240 },
    },
    position: {
      mobile: { top: "107%", left: "62%" },
      tablet: { top: "70%", left: "87%" },
      desktop: { top: "69%", left: "86%" },
    },
    zIndex: 2,
  },
  {
    src: "/assets/images/people/wardrobe-detox/12.png",
    alt: "high heels",
    dimensions: {
      mobile: { width: 85, height: 85 },
      tablet: { width: 127, height: 127 },
      desktop: { width: 160, height: 160 },
    },
    position: {
      mobile: { top: "85%", left: "35%" },
      tablet: { top: "74%", left: "44%" },
      desktop: { top: "73%", left: "43%" },
    },
    zIndex: 6,
    className: "animate-always-slow",
   transformOrigin: "50% 50%"  
    
  },
];



type Breakpoint = "mobile" | "tablet" | "desktop";

type ImageItemProps = {
  img: ImageConfig;
  index: number;
  breakpoint: Breakpoint;
};

export default function WardrobeDetox() {
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("desktop");
  const clockTickRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(true);

  // listen to global mute changes from TimedAudio
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ muted: boolean }>;
      if (ce?.detail && typeof ce.detail.muted === 'boolean') {
        setMuted(ce.detail.muted);
        if (ce.detail.muted && clockTickRef.current) {
          clockTickRef.current.pause();
          clockTickRef.current.currentTime = 0;
        }
      }
    };
    window.addEventListener('wiw-audio-mute-change', handler as EventListener);
    return () => window.removeEventListener('wiw-audio-mute-change', handler as EventListener);
  }, []);

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

  function ImageItem({ img, index, breakpoint }: ImageItemProps) {
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
       if (!img.fixedTop) {
    y.set(deltaY);
  }
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

    const isClock = img.alt.toLowerCase().includes('clock');
    const handleEnter = () => {
      if (isClock && clockTickRef.current && !muted) {
        const a = clockTickRef.current;
        a.currentTime = 0;
        a.volume = 0.5;
        a.play().catch(()=>{});
      }
    };
    const handleLeave = () => {
      if (isClock && clockTickRef.current) {
        const a = clockTickRef.current;
        a.pause();
        a.currentTime = 0;
      }
      handleMouseLeave();
    };
    return (
      <motion.div
        ref={ref}
        className={`absolute cursor-pointer will-change-transform ${img.className || ""}`}
        style={{ ...baseStyle, x: springX, y: springY,
          transformOrigin: img.transformOrigin ?? "50% 50%",
         }}
        whileHover={{ scale: breakpoint === "mobile" ? 1 : 1.08 }}
        whileTap={{ scale: breakpoint === "mobile" ? 0.95 : 1 }}
        transition={{
          scale: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
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

  return (
    <div className="w-screen overflow-hidden pt-16 md:pt-20">
      <TimedAudio
        src="/assets/sounds/page6/21-savage-redrum-1.mp3" // page6 audio
        start={0}
        volume={0.35}
        fixed
        loop
        className="z-70"
      />
      <audio ref={clockTickRef} src="/assets/sounds/page6/21-savage-redrum-2.mp3" preload="auto" playsInline loop />
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        <div className="flex justify-between items-center gap-3">
          <Heading text="WARDROBE DETOX" />
          <BookNowButton sessionType="wardrobe-detox" />
        </div>
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 sm:mt-6">
          ₹6,500
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-6 sm:mt-8 mb-8 sm:mb-12">
        <div className="flex flex-col-reverse lg:flex-row gap-8 md:gap-10 lg:gap-4">
          <motion.div
             className="w-full lg:w-1/3 shrink-0 mt-50 sm:mt-0"
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
              We go through your wardrobe together: what you wear often, what
              just sits there, and what you actually love. I&apos;ll ask a few
              questions, get you to try some pieces, and understand your style
              in real life and not just on paper.
              <br></br>
              We&apos;ll build new outfit combinations, organize your space so
              it&apos;s easy to use, and note what&apos;s missing to make it
              work better. After the session, you&apos;ll receive a personalized
              presentation with: <br></br>- full outfit ideas styled using your
              pieces and a few suggested additions, <br></br>- links to the new
              items, <br />- a mini guide on how to mix and match everything.
              <br />
              It&apos;s a practical, no-drama reset for your wardrobe so you
              know exactly what you own and how to wear it.
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
