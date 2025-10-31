"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Heading } from "../heading";
import { BookNowButton } from "../book-now-button";
import { useState, useRef } from "react";

type ImageConfig = {
  src: string;
  alt: string;
  width: number;
  height: number;
  position: { top: string; left: string };
  zIndex?: number;
};

const images: ImageConfig[] = [
  {
    src: "/assets/images/brand/concept-development/1.png",
    alt: "Building",
    width: 450,
    height: 450,
    position: { top: "15%", left: "46%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/brand/concept-development/2.png",
    alt: "cafe -> mon bar a couture",
    width: 400,
    height: 400,
    position: { top: "3%", left: "6%" },
    zIndex: 3,
  },
  {
    src: "/assets/images/brand/concept-development/3.png",
    alt: "dress roller stand",
    width: 200,
    height: 200,
    position: { top: "24%", left: "40%" },
    zIndex: 6,
  },
  {
    src: "/assets/images/brand/concept-development/6.png",
    alt: "Cafe-2",
    width: 300,
    height: 300,
    position: { top: "18%", left: "2%" },
    zIndex: 1,
  },
  {
    src: "/assets/images/brand/concept-development/7.png",
    alt: "chairs",
    width: 300,
    height: 300,
    position: { top: "47%", left: "-1%" },
    zIndex: 1,
  },
  {
    src: "/assets/images/brand/concept-development/8.png",
    alt: "Cafe-3",
    width: 300,
    height: 300,
    position: { top: "29%", left: "24%" },
    zIndex: 1,
  },
  {
    src: "/assets/images/brand/concept-development/10.png",
    alt: "My-girl",
    width: 100,
    height: 100,
    position: { top: "68%", left: "1%" },
    zIndex: 1,
  },
  {
    src: "/assets/images/brand/concept-development/11.png",
    alt: "Cat",
    width: 130,
    height: 130,
    position: { top: "73%", left: "1%" },
    zIndex: 1,
  },
  {
    src: "/assets/images/brand/concept-development/12.png",
    alt: "Girl-with-dog",
    width: 200,
    height: 200,
    position: { top: "68%", left: "14%" },
    zIndex: 1,
  },
  {
    src: "/assets/images/brand/concept-development/13.png",
    alt: "Camera",
    width: 180,
    height: 180,
    position: { top: "40%", left: "64%" },
    zIndex: 10,
  },
  {
    src: "/assets/images/brand/concept-development/14.png",
    alt: "ladies",
    width: 230,
    height: 230,
    position: { top: "57%", left: "60%" },
    zIndex: 9,
  },
  {
    src: "/assets/images/brand/concept-development/15.png",
    alt: "girl with cigarette",
    width: 240,
    height: 240,
    position: { top: "50%", left: "36%" },
    zIndex: 10,
  },
  {
    src: "/assets/images/brand/concept-development/16.png",
    alt: "Carpet 1",
    width: 200,
    height: 200,
    position: { top: "58%", left: "80%" },
    zIndex: 10,
  },
  {
    src: "/assets/images/brand/concept-development/17.png",
    alt: "Silver carpet",
    width: 400,
    height: 400,
    position: { top: "13%", left: "20%" },
    zIndex: 1,
  },
];

type ImageItemProps = {
  img: ImageConfig;
  index: number;
};

const ImageItem = ({ img, index }: ImageItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
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

  const baseStyle = {
    top: img.position.top,
    left: img.position.left,
    transform: "translate(-50%, -50%)",
    width: `${img.width}px`,
    height: `${img.height}px`,
    zIndex: img.zIndex ?? index,
  };

  return (
    <motion.div
      ref={ref}
      className="absolute cursor-pointer will-change-transform"
      style={{ ...baseStyle, x: springX, y: springY }}
      whileHover={{ scale: 1.08 }}
      transition={{ 
        scale: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={img.src}
        alt={img.alt}
        width={img.width}
        height={img.height}
        className="object-contain w-full h-full pointer-events-none"
        priority={index < 2}
      />
    </motion.div>
  );
};

export default function ConceptDevelopment() {
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);

  return (
    <div className="w-screen overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        <div className="flex justify-between items-center gap-3">
          <Heading text="CONCEPT DEVELOPMENT" />
          <BookNowButton />
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mt-8 mb-12">
        <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-4">
          <motion.div
            className="w-full lg:w-1/3 shrink-0"
            onMouseEnter={() => setIsTextHovered(true)}
            onMouseLeave={() => setIsTextHovered(false)}
            animate={{
              scale: isImageHovered ? 0.92 : isTextHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <p className="text-sm sm:text-base md:text-lg text-black leading-relaxed">
              Each brand has its own unique vision that defines its
              identity, and I help bring that vision to life.
              <br />
              Whether you&apos;re embarking on a new project, establishing a
              pop-up, or redefining your brand&apos;s visual narrative, I
              transform your identity into a concrete expression.
              <br />
              We delve into your vision, explore what your brand
              represents, what it should avoid, and the emotions it should
              evoke.
              <br />
              From this foundation, I develop a comprehensive concept deck
              that encompasses mood, tone, styling direction, and visual
              language, serving as your roadmap for photo shoots, campaigns,
              or store layouts — whatever you&apos;re creating.
              <br />
              <br />
              The reason it succeeds: when your visuals and energy match,
              your brand stands out instead of fading into the background.
            </p>
          </motion.div>

          <motion.div
            className="w-full lg:w-2/3 relative aspect-video"
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
            animate={{
              scale: isTextHovered ? 0.92 : isImageHovered ? 1.08 : 1,
              filter: isTextHovered ? "blur(2px)" : "blur(0px)",
            }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "visible", padding: "80px" }}
          >
            {images.map((img, idx) => (
              <ImageItem key={idx} img={img} index={idx} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}