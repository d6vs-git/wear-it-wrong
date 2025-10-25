"use client";

import Image from "next/image";
import { motion } from "framer-motion";




// Enhanced logo animation with bounce
const logoVariants = {
  hidden: { opacity: 0, scale: 0.7, rotateZ: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 0,
    transition: {
      duration: 1,
      delay: 0.4,
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

// Container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export default function HeroSection() {
  return (
    <motion.section
      className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
     
      {/* Hero Content */}
      <div className="flex-1 flex flex-col justify-center items-center px-4">
        {/* Logo with hover effect */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="mb-12 cursor-pointer"
        >
          <Image
            src="/assets/logo.png"
            alt="Wear It Wrong Logo"
            width={500}
            height={400}
            priority
            className="w-auto h-auto max-w-2xl drop-shadow-lg"
          />
        </motion.div>
      </div>

      {/* Scroll Indicator with enhanced animation */}
      <motion.div
        className="flex justify-center items-center pb-8 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="flex flex-col items-center gap-2"
        >
          
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-muted-foreground"
          >
            <motion.path
              d="M12 5v14M5 12l7 7 7-7"
              animate={{ y: [0, 3, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.svg>
        </motion.div>
      </motion.div>

      {/* Background gradient glow effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.section>
  );
}
