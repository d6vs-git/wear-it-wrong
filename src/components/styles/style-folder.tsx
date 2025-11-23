"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const getFolderAnimations = (folderPath: string) => {
  const folderName = folderPath.split("/").pop() || "";

  let count = 12;
  if (folderName === "people") count = 9;
  if (folderName === "spaces") count = 9;
  if (folderName === "brands") count = 12;
  // Create scattered pattern - images spread upward and outward
  return Array.from({ length: count }, (_, i) => {
    // Arrange in rows that fan out upward
    const rowSize = 4;
    const row = Math.floor(i / rowSize);
    const col = i % rowSize;
    const itemsInRow = Math.min(rowSize, count - row * rowSize);

    // Spread images upward and horizontally
    const xSpacing = 80;
    const yBase = -150; // Start higher up
    const ySpacing = -60; // Stack upward with more space

    const xOffset =
      (col - (itemsInRow - 1) / 2) * xSpacing + (Math.random() - 0.5) * 30;
    const yOffset = yBase + row * ySpacing + (Math.random() - 0.5) * 25;

    return {
      id: i + 1,
      filename: `${i + 1}.png`,
      hover: {
        x: xOffset,
        y: yOffset,
        rotate: (Math.random() - 0.5) * 25,
        scale: 1.0 + Math.random() * 0.3,
      },
    };
  });
};

interface StyleFolderProps {
  title: string;
  folderPath: string;
  onHoverChange?: (isHovered: boolean) => void;
}

export default function StyleFolder({
  title,
  folderPath,
  onHoverChange,
}: StyleFolderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const folderName = folderPath.split("/").pop() || "";
  const animationData = getFolderAnimations(folderPath);

  const handleHoverStart = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  const handleClick = () => {
    router.push(`/${folderPath}`);
  };

  // On mobile, always show images
  const shouldShowImages = isMobile || isHovered;

  return (
    <div className="flex flex-col items-center gap-4 md:gap-6">
      {/* Folder Container - Responsive size */}
      <div
        className="relative w-48 h-40 md:w-64 md:h-52 cursor-pointer"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        onClick={handleClick}
      >
        {/* Images Layer - Scattered upward pattern */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible z-30">
          {animationData.map((imageData, index) => (
            <motion.div
              key={imageData.id}
              className="absolute"
              initial={{
                x: 0,
                y: 0,
                rotate: 0,
                opacity: 0,
                scale: 0.3,
              }}
              animate={
                shouldShowImages
                  ? {
                      x: imageData.hover.x * (isMobile ? 0.6 : 1), 
                      y: imageData.hover.y * (isMobile ? 0.6 : 1),
                      rotate: imageData.hover.rotate,
                      opacity: 1,
                      scale: imageData.hover.scale * (isMobile ? 0.7 : 1),
                    }
                  : {
                      x: 0,
                      y: 0,
                      rotate: 0,
                      opacity: 0,
                      scale: 0.3,
                    }
              }
              transition={{
                duration: 0.5,
                delay: shouldShowImages ? index * 0.035 : 0,
                ease: [0.34, 1.4, 0.64, 1],
              }}
            >
              <div className="relative w-20 h-24 md:w-28 md:h-32">
                <Image
                  src={`/assets/images/styles/${folderName}/${imageData.filename}`}
                  alt={`${title} ${imageData.id}`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  unoptimized
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Folder image */}
        <div className="absolute inset-0 z-10">
          <Image
            src="/assets/images/styles/folder.png"
            alt={`${title} folder`}
            fill
            className="object-contain"
            priority
            unoptimized
          />
        </div>
      </div>

      {/* Folder title - Responsive text */}
      <motion.p
        className="font-badtyp text-xl md:text-2xl font-bold text-center text-primary tracking-wide"
        animate={{
          scale: isHovered ? 1.08 : 1,
          y: isHovered ? -5 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {title}
      </motion.p>
    </div>
  );
}
