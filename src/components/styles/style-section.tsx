"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import StyleFolder from "./style-folder";
import SearchBar from "@/components/ui/search-bar";

export default function StyleSection() {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2 });
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);

  useEffect(() => {
    if (inView) controls.start("visible");
    else controls.start("hidden");
  }, [inView, controls]);

  const folders = [
    { title: "Brands", path: "styles/brands", count: 12 },
    { title: "People", path: "styles/people", count: 9 },
    { title: "Space", path: "styles/spaces", count: 9 },
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
      className="w-full px-4 py-12 md:py-4 flex flex-col items-center justify-start md:justify-center relative overflow-visible min-h-screen md:min-h-0"
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Blur overlay when hovering */}
      <motion.div
        className="absolute inset-0 backdrop-blur-sm bg-background/30 pointer-events-none z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: hoveredFolder ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <div className="w-full max-w-7xl h-[60vh] mx-auto flex flex-col items-center justify-between relative z-20 space-y-32 sm:space-y-36 md:space-y-20 lg:space-y-24">
        {/* Search Bar */}
        <motion.div
          className="flex justify-center items-center w-full max-w-[90%] sm:max-w-[85%] md:max-w-[600px] pt-8 md:pt-0"
          animate={{
            opacity: hoveredFolder ? 0.3 : 1,
            scale: hoveredFolder ? 0.95 : 1,
            y: hoveredFolder ? -10 : 0,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <SearchBar
            variant="page"
            className="w-full"
            placeholder="What do I style?"
          />
        </motion.div>

        {/* Folders Grid */}
        <motion.div
          className="flex justify-center w-full overflow-visible pb-12 md:pb-0"
          variants={foldersContainerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-32 sm:gap-36 md:gap-10 lg:gap-16 w-full max-w-md md:max-w-full px-2 md:px-4">
            {folders.map((folder) => (
              <motion.div
                key={folder.path}
                className="flex justify-center relative w-full"
                animate={{
                  opacity:
                    hoveredFolder && hoveredFolder !== folder.path ? 0.2 : 1,
                  scale:
                    hoveredFolder && hoveredFolder !== folder.path ? 0.92 : 1,
                  filter:
                    hoveredFolder && hoveredFolder !== folder.path
                      ? "blur(5px)"
                      : "blur(0px)",
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  zIndex: hoveredFolder === folder.path ? 50 : 1,
                }}
              >
                <StyleFolder
                  title={folder.title}
                  folderPath={folder.path}
                  onHoverChange={(isHovered) =>
                    setHoveredFolder(isHovered ? folder.path : null)
                  }
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}