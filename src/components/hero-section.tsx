"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const navItems = ["Home", "Looks", "The Studio", "Journal"];

// Enhanced navbar item variants
const getNavItemVariants = (index: number) => ({
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.12,
      duration: 0.7,
    },
  },
});

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
      {/* Navbar */}
      <motion.nav
        className="flex justify-between items-center px-8 py-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left nav items */}
        <div className="flex gap-8">
          {navItems.slice(0, 2).map((item, i) => (
            <motion.button
              key={item}
              variants={getNavItemVariants(i)}
              whileHover={{ y: -2, color: "var(--primary)" }}
              whileTap={{ scale: 0.98 }}
              className="font-open-sans text-base font-normal text-foreground hover:text-primary transition-colors duration-300 cursor-pointer relative group"
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Center - Book Now */}
        <motion.button
          variants={getNavItemVariants(2)}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 20px rgba(154, 63, 63, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-1/2 transform -translate-x-1/2 font-porter-sans-block text-xl font-bold text-primary hover:text-foreground transition-colors duration-300 cursor-pointer px-6 py-2"
        >
          BOOK NOW
        </motion.button>

        {/* Right nav items */}
        <div className="flex gap-8">
          {navItems.slice(2).map((item, i) => (
            <motion.button
              key={item}
              variants={getNavItemVariants(i + 3)}
              whileHover={{ y: -2, color: "var(--primary)" }}
              whileTap={{ scale: 0.98 }}
              className="font-open-sans text-base font-normal text-foreground hover:text-primary transition-colors duration-300 cursor-pointer relative group"
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
      </motion.nav>

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
          <motion.p className="font-open-sans text-sm md:text-base text-muted-foreground">
            Scroll to explore
          </motion.p>
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
