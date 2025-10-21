'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import StyleFolder from './style-folder';

export default function StyleSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const folders = [
    { title: 'Brands', path: 'brands', count: 12 },
    { title: 'People', path: 'people', count: 9 },
    { title: 'Space', path: 'spaces', count: 9 },
  ];

  // Section entrance animation
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  // Search bar animation
  const searchBarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  // Folders container animation
  const foldersContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  return (
    <motion.section
      className="min-h-screen bg-background text-foreground py-20 px-4 flex flex-col items-center justify-center"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Search Bar with Image */}
        <motion.div
          variants={searchBarVariants}
          className="flex justify-center mb-32 w-full"
        >
          <motion.div
            className="relative w-full max-w-2xl"
            initial={{ boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)' }}
            animate={
              isFocused
                ? { boxShadow: '0px 12px 32px rgba(154, 63, 63, 0.15)' }
                : { boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }
            }
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-16 md:h-20">
              <Image
                src="/assets/styles/search-bar.png"
                alt="Search bar background"
                fill
                className="object-cover"
                priority
              />
              <input
                type="text"
                placeholder="What do I style?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="absolute inset-0 w-full h-full bg-transparent text-foreground placeholder-muted-foreground px-6 md:px-8 font-open-sans text-base md:text-lg outline-none"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Folders Grid - Centered */}
        <motion.div
          className="flex justify-center w-full"
          variants={foldersContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-32 w-full max-w-6xl">
            {folders.map((folder, index) => (
              <div key={folder.path} className="flex justify-center">
                <StyleFolder
                  title={folder.title}
                  folderPath={folder.path}
                  imageCount={folder.count}
                  delay={index * 0.1}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
