"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { getFolderAnimations } from "@/lib/folder-animations";

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
  const animationData = getFolderAnimations(folderPath);

  const handleHoverStart = () => {
    setIsHovered(true);
    onHoverChange?.(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    onHoverChange?.(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Folder Container */}
      <div 
        className="relative w-80 h-56"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        {/* Images - hidden by default, pop dramatically upward on hover */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible">
          {animationData.map((imageData, index) => (
            <motion.div
              key={imageData.id}
              className="absolute"
              initial={{
                x: 0,
                y: 20,
                rotate: 0,
                opacity: 0,
                scale: 0.7,
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
                      y: 20,
                      rotate: 0,
                      opacity: 0,
                      scale: 0.7,
                    }
              }
              transition={{
                duration: 0.5,
                delay: isHovered ? index * 0.035 : 0,
                ease: [0.34, 1.56, 0.64, 1],
              }}
            >
              <div className="relative w-20 h-28">
                <Image
                  src={`/assets/images/styles/${folderPath}/${imageData.filename}`}
                  alt={`${title} ${imageData.id}`}
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Folder - Static, no animations */}
        <div className="absolute inset-0 cursor-pointer z-10 pointer-events-none">
          <Image
            src="/assets/images/styles/folder.png"
            alt={`${title} folder`}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Title */}
      <motion.p
        className="font-open-sans text-xl font-semibold text-center text-primary"
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