"use client";

import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import StyleFolder from "./style-folder";

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
      className="bg-background text-foreground min-h-screen px-4 flex flex-col items-center justify-center relative overflow-hidden"
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

      <div className="w-full max-w-6xl mx-auto flex flex-col relative z-20">
        {/* Search Bar */}
        <motion.div
          className="flex justify-center items-center pb-8 relative mb-16"
          animate={{
            opacity: hoveredFolder ? 0.3 : 1,
            scale: hoveredFolder ? 0.95 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src="/assets/images/styles/search-bar.png"
            alt="Search Bar"
            width={600}
            height={40}
          />
        </motion.div>

        {/* Folders Grid */}
        <motion.div
          className="flex justify-center w-full pt-8 mt-12"
          variants={foldersContainerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-32 w-full max-w-6xl">
            {folders.map((folder, index) => (
              <motion.div
                key={folder.path}
                className="flex justify-center relative"
                animate={{
                  opacity:
                    hoveredFolder && hoveredFolder !== folder.path ? 0.2 : 1,
                  scale:
                    hoveredFolder && hoveredFolder !== folder.path ? 0.9 : 1,
                  filter:
                    hoveredFolder && hoveredFolder !== folder.path
                      ? "blur(4px)"
                      : "blur(0px)",
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  zIndex: hoveredFolder === folder.path ? 50 : 1,
                }}
              >
                <StyleFolder
                  title={folder.title}
                  folderPath={folder.path}
                  delay={index * 0.1}
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
//-----animated typewriter effect---
// "use client";

// import Image from "next/image";
// import { motion, useAnimation, useInView } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import StyleFolder from "./style-folder";

// export default function StyleSection() {
//   const controls = useAnimation();
//   const ref = useRef<HTMLDivElement | null>(null);
//   const inView = useInView(ref, { amount: 0.2 });
//   const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);
//   const [typedText, setTypedText] = useState("");

//   const textToType = "What do I style ?";

//   // Trigger animation when section is in view
//   useEffect(() => {
//     if (inView) controls.start("visible");
//     else controls.start("hidden");
//   }, [inView, controls]);

//   // Typing animation when in view
//   useEffect(() => {
//     if (!inView) return;
//     let i = 0;
//     const interval = setInterval(() => {
//       setTypedText(textToType.slice(0, i));
//       i++;
//       if (i > textToType.length) clearInterval(interval);
//     }, 100);
//     return () => clearInterval(interval);
//   }, [inView]);

//   const folders = [
//     { title: "Brands", path: "styles/brands", count: 12 },
//     { title: "People", path: "styles/people", count: 9 },
//     { title: "Space", path: "styles/spaces", count: 9 },
//   ];

//   // Section entrance animation
//   const sectionVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   // Folders container animation
//   const foldersContainerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.15,
//         delayChildren: 0.4,
//       },
//     },
//   };

//   return (
//     <motion.section
//       ref={ref}
//       className="bg-background text-foreground min-h-screen px-4 flex flex-col items-center justify-center relative overflow-hidden"
//       variants={sectionVariants}
//       initial="hidden"
//       animate={controls}
//     >
//       {/* Blur overlay when hovering */}
//       <motion.div
//         className="absolute inset-0 backdrop-blur-sm bg-background/30 pointer-events-none z-10"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: hoveredFolder ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//       />

//       <div className="w-full max-w-6xl mx-auto flex flex-col relative z-20">
//         {/* Search Bar with typing animation */}
//         <motion.div
//           className="flex justify-center items-center pb-8 relative mb-16"
//           animate={{
//             opacity: hoveredFolder ? 0.3 : 1,
//             scale: hoveredFolder ? 0.95 : 1,
//           }}
//           transition={{ duration: 0.3 }}
//         >
//           <Image
//             src="/assets/images/styles/search-bar.png"
//             alt="Search Bar"
//             width={600}
//             height={40}
//           />

//           {/* Typing text overlay */}
//           <div className="absolute left-[25%] top-1/2 -translate-y-1/2 text-black font-medium text-lg whitespace-nowrap flex">
//             {typedText}
//             <span className="animate-blink">|</span>
//           </div>
//         </motion.div>

//         {/* Folders Grid */}
//         <motion.div
//           className="flex justify-center w-full pt-8 mt-12"
//           variants={foldersContainerVariants}
//         >
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-32 w-full max-w-6xl">
//             {folders.map((folder, index) => (
//               <motion.div
//                 key={folder.path}
//                 className="flex justify-center relative"
//                 animate={{
//                   opacity:
//                     hoveredFolder && hoveredFolder !== folder.path ? 0.2 : 1,
//                   scale:
//                     hoveredFolder && hoveredFolder !== folder.path ? 0.9 : 1,
//                   filter:
//                     hoveredFolder && hoveredFolder !== folder.path
//                       ? "blur(4px)"
//                       : "blur(0px)",
//                 }}
//                 transition={{ duration: 0.4, ease: "easeOut" }}
//                 style={{
//                   zIndex: hoveredFolder === folder.path ? 50 : 1,
//                 }}
//               >
//                 <StyleFolder
//                   title={folder.title}
//                   folderPath={folder.path}
//                   delay={index * 0.1}
//                   onHoverChange={(isHovered) =>
//                     setHoveredFolder(isHovered ? folder.path : null)
//                   }
//                 />
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </motion.section>
//   );
// }
