"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Helper function to generate animation data with compact stacking
const getFolderAnimations = (folderPath: string) => {
  const folderName = folderPath.split("/").pop() || "";

  let count = 12;
  if (folderName === "people") count = 9;
  if (folderName === "spaces") count = 9;
  if (folderName === "brands") count = 12;
  // Create tight stacking pattern - images emerge from center/top of folder
  return Array.from({ length: count }, (_, i) => {
    // Arrange in rows, centered
    const rowSize = 4; // 4 images per row
    const row = Math.floor(i / rowSize);
    const col = i % rowSize;
    const itemsInRow = Math.min(rowSize, count - row * rowSize);

    // Calculate position in a compact grid above folder, centered
    const xSpacing = 45; // Horizontal spacing between images
    const ySpacing = 15; // Vertical spacing between rows

    // Center each row by adjusting offset based on items in that row
    const xOffset = (col - (itemsInRow - 1) / 2) * xSpacing;
    const yOffset = -100 - row * ySpacing; // Stack upward from folder

    return {
      id: i + 1,
      filename: `${i + 1}.png`,
      hover: {
        x: xOffset + (Math.random() - 0.5) * 12, // Small random offset
        y: yOffset + (Math.random() - 0.5) * 8,
        rotate: (Math.random() - 0.5) * 18,
        scale: 0.96 + Math.random() * 0.3,
      },
    };
  });
};

interface StyleFolderProps {
  title: string;
  folderPath: string;
  onHoverChange?: (isHovered: boolean) => void;
  delay?: number;
}

export default function StyleFolder({
  title,
  folderPath,
  onHoverChange,
}: StyleFolderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const folderName = folderPath.split("/").pop() || "";
  const animationData = getFolderAnimations(folderPath);

  const handleHoverStart = () => {
    setIsHovered(true);
    console.log(`StyleFolder hover start: ${folderPath}`);
    onHoverChange?.(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    console.log(`StyleFolder hover end: ${folderPath}`);
    onHoverChange?.(false);
  };

  const handleClick = () => {
    router.push(`/${folderPath}`);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Folder Container - Smaller size */}
      <div
        className="relative w-64 h-48 cursor-pointer"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
        onClick={handleClick}
      >
        {/* Images Layer - Compact stacking above folder */}
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
                scale: 0.5,
              }}
              animate={
                isHovered
                  ? {
                      x: imageData.hover.x,
                      y: imageData.hover.y,
                      rotate: imageData.hover.rotate,
                      opacity: 1,
                      scale: imageData.hover.scale,
                    }
                  : {
                      x: 0,
                      y: 0,
                      rotate: 0,
                      opacity: 0,
                      scale: 0.5,
                    }
              }
              transition={{
                duration: 0.4,
                delay: isHovered ? index * 0.025 : 0,
                ease: [0.34, 1.2, 0.64, 1],
              }}
            >
              <div className="relative w-20 h-24">
                <Image
                  src={`/assets/images/styles/${folderName}/${imageData.filename}`}
                  alt={`${title} ${imageData.id}`}
                  fill
                  className="object-contain drop-shadow-xl"
                  unoptimized
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Folder Image - Behind images */}
        <div className="absolute inset-0 z-10 pointer-events-none">
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

      {/* Title - Smaller text */}
      <motion.p
        className="font-open-sans text-base font-semibold text-center text-primary"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {title}
      </motion.p>
    </div>
  );
}
