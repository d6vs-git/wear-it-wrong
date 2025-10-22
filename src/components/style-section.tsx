'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import StyleFolder from './style-folder';

export default function StyleSection() {
  const [isFocused, setIsFocused] = useState(false);

  // In-view controls to re-trigger animations whenever the section enters viewport
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2 });

  useEffect(() => {
    if (inView) controls.start('visible');
    else controls.start('hidden');
  }, [inView, controls]);

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
      ref={ref}
      className="min-h-screen bg-background text-foreground py-20 px-4 flex flex-col items-center justify-center"
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Framed container to match reference */}
      <div className="w-full  bg-background max-w-6xl mx-auto p-8 md:p-12">
        {/* Dummy Search Bar (static text) */}
        <motion.div
          variants={searchBarVariants}
          className="flex justify-center mb-24 w-full"
        >
          <motion.div
            className="relative w-full max-w-2xl"
            initial={{ boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)' }}
            animate={
              isFocused
                ? { boxShadow: '0px 12px 32px rgba(0, 0, 0, 0.12)' }
                : { boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.08)' }
            }
            transition={{ duration: 0.3 }}
          >
            <div
              className="relative h-14 md:h-16 rounded-md border border-border bg-card px-5 md:px-6 flex items-center gap-3"
              onMouseEnter={() => setIsFocused(true)}
              onMouseLeave={() => setIsFocused(false)}
            >
              <Search className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <span className="font-open-sans text-base md:text-lg text-foreground select-none">
                What do I style?
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Folders Grid - Centered */}
        <motion.div
          className="flex justify-center w-full"
          variants={foldersContainerVariants}
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
