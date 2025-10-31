"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import { Heading } from "../heading";
import { BookNowButton } from "../book-now-button";
import { useState, useRef, MouseEvent } from "react";

// Smooth spring configuration for buttery animations
const springConfig = {
  stiffness: 150,
  damping: 20,
  mass: 0.5,
};

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
    src: "/assets/images/space/brand-spaces/1.png",
    alt: "chair-left",
    width: 200,
    height: 200,
    position: { top: "10%", left: "4%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/2.png",
    alt: "chair-right ",
    width: 200,
    height: 200,
    position: { top: "10%", left: "26%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.png",
    alt: "table",
    width: 160,
    height: 160,
    position: { top: "22%", left: "18%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/4.png",
    alt: "lamp",
    width: 100,
    height: 100,
    position: { top: "12%", left: "21%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/5.png",
    alt: "seat-sofa",
    width: 500,
    height: 500,
    position: { top: "10%", left: "40%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.png",
    alt: "table",
    width: 160,
    height: 160,
    position: { top: "61%", left: "87%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/4.png",
    alt: "lamp",
    width: 100,
    height: 100,
    position: { top: "51%", left: "90%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.png",
    alt: "table",
    width: 160,
    height: 160,
    position: { top: "82%", left: "72%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/4.png",
    alt: "lamp",
    width: 100,
    height: 100,
    position: { top: "72%", left: "75%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/2.png",
    alt: "chair-right ",
    width: 240,
    height: 240,
    position: { top: "72%", left: "89%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/1.png",
    alt: "chair-left",
    width: 200,
    height: 200,
    position: { top: "60%", left: "-6%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/2.png",
    alt: "chair-right ",
    width: 200,
    height: 200,
    position: { top: "60%", left: "16%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.png",
    alt: "table",
    width: 160,
    height: 160,
    position: { top: "72%", left: "8%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/4.png",
    alt: "lamp",
    width: 100,
    height: 100,
    position: { top: "62%", left: "11%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.png",
    alt: "table",
    width: 160,
    height: 160,
    position: { top: "57%", left: "42%" },
    zIndex: 0,
  },
  {
    src: "/assets/images/space/brand-spaces/4.png",
    alt: "lamp",
    width: 100,
    height: 100,
    position: { top: "47%", left: "45%" },
    zIndex: 5,
  },
  {
    src: "/assets/images/space/brand-spaces/3.png",
    alt: "table",
    width: 160,
    height: 160,
    position: { top: "79%", left: "38%" },
    zIndex: 9,
  },
  {
    src: "/assets/images/space/brand-spaces/4.png",
    alt: "lamp",
    width: 100,
    height: 100,
    position: { top: "69%", left: "41%" },
    zIndex: 11,
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
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

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
        top: img.position.top,
        left: img.position.left,
        transform: "translate(-50%, -50%)",
        width: `${img.width}px`,
        height: `${img.height}px`,
        zIndex: img.zIndex ?? index,
        x: springX,
        y: springY,
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.08 }}
      transition={{
        opacity: { duration: 0.4 },
        scale: {
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.8,
        },
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
        draggable={false}
      />
    </motion.div>
  );
};

export default function BrandSpaces() {
  const [isTextHovered, setIsTextHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const imageAreaRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-screen overflow-hidden">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12">
        <div className="flex justify-between items-center gap-3">
          <Heading text="BRAND SPACES" />
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
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.8,
            }}
          >
            <p className="text-sm sm:text-base md:text-lg text-black leading-relaxed">
              Your space is often the first time someone experiences your brand,
              so it should tell your story without saying a word.
              <br />
              I help brands design and style their physical spaces; whether
              it&apos;s a store, studio, or pop-up, so it looks good, feels
              cohesive, and makes sense for how people actually move through it.
              We start by understanding your identity and what you want the
              space to communicate. From there, I help plan the layout,
              materials, color story, and decor details that bring that feeling
              to life.
              <br />
              It&apos;s not just about making things pretty but about creating a
              space that feels intentional, on-brand, and easy to maintain.
              <br />
              Whether you&apos;re setting up from scratch or reworking an
              existing space, the goal is simple: to make your space feel like
              your brand — lived-in, real, and instantly recognizable.
            </p>
          </motion.div>

          <motion.div
            ref={imageAreaRef}
            className="w-full lg:w-2/3 relative aspect-video"
            onMouseEnter={() => setIsImageHovered(true)}
            onMouseLeave={() => setIsImageHovered(false)}
            animate={{
              scale: isTextHovered ? 0.92 : isImageHovered ? 1.08 : 1,
              filter: isTextHovered ? "blur(2px)" : "blur(0px)",
            }}
            transition={{
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.8,
              },
              filter: {
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            style={{ overflow: "visible" }}
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