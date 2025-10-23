'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getFolderAnimations } from '@/lib/folder-animations';

interface StyleFolderProps {
  title: string;
  folderPath: string;
  imageCount: number;
  delay: number;
}

export default function StyleFolder({
  title,
  folderPath,
  imageCount,
  delay,
}: StyleFolderProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get animation data from JSON
  const animationData = getFolderAnimations(folderPath);

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.6,
      },
    },
  };

  // Folder animation
  const folderVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  };

  // Individual image animation using JSON data
  const getImageVariants = (index: number) => {
    const imageData = animationData[index];
    if (!imageData) {
      // Fallback if data not found
      return {
        initial: { x: 0, y: 0, rotate: 0, opacity: 0.6, scale: 0.95, zIndex: 1 },
        hover: { x: 0, y: 0, rotate: 0, opacity: 1, scale: 1, zIndex: 10 },
      };
    }

    return {
      initial: {
        ...imageData.initial,
        zIndex: 1,
      },
      hover: {
        ...imageData.hover,
        zIndex: 10,
        transition: {
          delay: index * 0.1,
          duration: 0.5,
        },
      },
    };
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="flex flex-col items-center gap-8"
    >
      {/* Folder Container */}
      <div className="relative w-80 h-56">
        {/* Images Container - scattered inside initially, burst out on hover */}
        <div className="absolute inset-0 overflow-visible flex items-center justify-center">
          {animationData.map((imageData, index) => (
            <motion.div
              key={imageData.id}
              variants={getImageVariants(index)}
              initial="initial"
              animate={isHovered ? 'hover' : 'initial'}
              className="absolute"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <div className="relative w-20 h-28 rounded-lg overflow-hidden ">
                <Image
                  src={`/assets/styles/${folderPath}/${imageData.filename}`}
                  alt={`${title} ${imageData.id}`}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Folder Background - on top */}
        <motion.div
          variants={folderVariants}
          initial="initial"
          whileHover="hover"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="absolute inset-0 cursor-pointer z-20"
        >
          <Image
            src="/assets/styles/folder.png"
            alt={`${title} folder`}
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
      </div>

      {/* Title */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
        className="font-open-sans text-lg font-bold text-foreground text-center"
      >
        {title}
      </motion.p>
    </motion.div>
  );
}
