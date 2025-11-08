"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { useState, useRef, MouseEvent, useEffect } from "react";

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

// Smooth spring configuration for buttery animations
const springConfig = {
  stiffness: 150,
  damping: 20,
  mass: 0.5,
};

const imagePositions = [
  //wardrobe-detox
  {
    src: "/assets/images/people/main/personal-shopper1.png",
    alt: "girls walking together",
    dimensions: {
      mobile: { width: 120, height: 180 },
      tablet: { width: 200, height: 200 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "6%", left: "10%" },
      tablet: { top: "15%", left: "20%" },
      desktop: { top: "9%", left: "25%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "wardrobe-detox",
    zIndex: 4,
  },
  {
    src: "/assets/images/brand/concept-development/12.png",
    alt: "dog walking",
    dimensions: {
      mobile: { width: 120, height: 180 },
      tablet: { width: 200, height: 200 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "6%", left: "59%" },
      tablet: { top: "15%", left: "59%" },
      desktop: { top: "9%", left: "66%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "wardrobe-detox",
    zIndex: 4,
  },
  {
    src: "/assets/images/testimonial/image235.jpg",
    alt: "potrait girl smoking ",
    dimensions: {
      mobile: { width: 120, height: 180 },
      tablet: { width: 200, height: 200 },
      desktop: { width: 180, height: 180 },
    },
    position: {
      mobile: { top: "126%", left: "37%" },
      tablet: { top: "120%", left: "37%" },
      desktop: { top: "120%", left: "44%" },
    },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    category: "wardrobe-detox",
    zIndex: 4,
    // Crop slight edges to remove black border
    crop: { top: 3, right: 3, bottom: 3, left: 3 },
  },
  
   
];

interface PeopleSectionProps {
  onBadgeClick: (service: string) => void;
}

type Badge = {
  text: string;
  dimensions: ResponsiveDimensions;
  position: ResponsivePosition;
  category: string;
  zIndex?: number;
};

type SectionImage = {
  src: string;
  alt: string;
  dimensions: ResponsiveDimensions;
  position: ResponsivePosition;
  animation?: { x: number; y: number; opacity: number; rotate: number };
  category: string;
  zIndex?: number;
  // Optional crop (in percentages) to trim unwanted borders
  crop?: { top: number; right: number; bottom: number; left: number };
};

function SectionImageItem({
  img,
  index,
}: {
  img: SectionImage;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">("desktop");
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Update breakpoint based on window width
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const updateBreakpoint = () => {
      if (window.innerWidth < 640) setBreakpoint("mobile");
      else if (window.innerWidth < 1024) setBreakpoint("tablet");
      else setBreakpoint("desktop");
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const wiggleStrength = 0.15;
    x.set(deltaX * wiggleStrength);
    y.set(deltaY * wiggleStrength);
    rotateX.set(-(deltaY / rect.height) * 8);
    rotateY.set((deltaX / rect.width) * 8);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="absolute cursor-pointer"
      style={{
        top: img.position[breakpoint].top,
        left: img.position[breakpoint].left,
        transform: "translate(-50%, -50%)",
        x: springX,
        y: springY,
        rotateX: springRotateX,
        rotateY: springRotateY,
        zIndex: img.zIndex ?? 20,
      }}
      initial={{
        x: img.animation?.x ?? 0,
        y: img.animation?.y ?? 0,
        opacity: img.animation?.opacity ?? 1,
        rotate: img.animation?.rotate ?? 0,
      }}
      whileInView={{
        x: 0,
        y: 0,
        opacity: 1,
        rotate: img.animation?.rotate ?? 0,
      }}
      transition={{
        filter: { 
          type: "tween",
          duration: 0.35,
          ease: [0.22, 1, 0.36, 1],
        },
        opacity: { 
          type: "tween",
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.06 }}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={img.dimensions[breakpoint].width}
        height={img.dimensions[breakpoint].height}
        className="object-contain pointer-events-none"
        priority={index < 2}
        draggable={false}
        style={img.crop ? {
          clipPath: `inset(${img.crop.top}% ${img.crop.right}% ${img.crop.bottom}% ${img.crop.left}%) `,
          transform: 'scale(1.06)',
          transformOrigin: 'center',
        } : undefined}
      />
    </motion.div>
  );
}

export default function Footer() {
  return (
    <motion.section
      className="relative w-full bg-landing overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Top image canvas (compact) */}
      <div className="relative w-full h-[260px] md:h-[300px] flex items-center justify-center">
        {imagePositions.map((img, index) => (
          <SectionImageItem
            key={index}
            img={img}
            index={index}
          />
        ))}
        {/* Contact links placed on the canvas, vertically centered at edges */}
        <div className="pointer-events-auto">
          <a
            href="/contact"
            className="absolute left-6 md:left-12 top-auto bottom-3 md:bottom-auto md:top-1/2 translate-y-0 md:-translate-y-1/2 text-[18px] md:text-[20px] text-primary underline decoration-primary decoration-2 underline-offset-4 hover:text-primary/80"
          >
            Contact Us
          </a>
          <a
            href="mailto:info@wearitwrong.com"
            className="absolute right-6 md:right-12 top-auto bottom-3 md:bottom-auto md:top-1/2 translate-y-0 md:-translate-y-1/2 text-[18px] md:text-[20px] text-primary underline decoration-primary decoration-2 underline-offset-4 hover:text-primary/80"
          >
            Mail
          </a>
        </div>
      </div>

      {/* Lower beige band (match figma ~189px) */}
      <div className="w-full h-[189px] bg-background-secondary border-t border-border flex items-center justify-between px-6 md:px-10">
        <motion.div
          initial={{ y: 12, opacity: 0, rotate: -2 }}
          whileInView={{ y: 0, opacity: 1, rotate: 0 }}
          whileHover={{ scale: 1.04 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 140, damping: 18 }}
        >
          <Image
            src="/assets/images/testimonial/2.png"
            alt="Wear It"
            width={260}
            height={130}
            className="h-[95px] md:h-[120px] w-auto object-contain select-none"
            sizes="(min-width: 768px) 300px, 200px"
            priority
          />
        </motion.div>
        <motion.div
          initial={{ y: 12, opacity: 0, rotate: 2 }}
          whileInView={{ y: 0, opacity: 1, rotate: 0 }}
          whileHover={{ scale: 1.04 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 140, damping: 18, delay: 0.05 }}
        >
          <Image
            src="/assets/images/testimonial/1.png"
            alt="Wrong"
            width={260}
            height={130}
            className="h-[95px] md:h-[120px] w-auto object-contain select-none"
            sizes="(min-width: 768px) 300px, 200px"
            priority
          />
        </motion.div>
      </div>
    </motion.section>
  );
}