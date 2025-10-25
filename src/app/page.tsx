"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import OccasionStyling from "@/components/people-components/occasion-styling";
import PersonalShopping from "@/components/people-components/personal-shopping";
import StyleDrop from "@/components/people-components/style-drop";
import WardrobeDetox from "@/components/people-components/wardrobe-detox";

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

export default function Home() {
  const router = useRouter();

  return (
    // <motion.section
    //   className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden"
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   transition={{ duration: 0.8 }}
    // >
     
    //   {/* Hero Content */}
    //   <div className="flex-1 flex flex-col justify-center items-center px-4">
    //     {/* Logo with hover effect - clickable */}
    //     <motion.div
    //       variants={logoVariants}
    //       initial="hidden"
    //       animate="visible"
    //       whileHover="hover"
    //       className="mb-12 cursor-pointer"
    //       onClick={() => router.push("/folders")}
    //     >
    //       <Image
    //         src="/assets/logo.png"
    //         alt="Wear It Wrong Logo"
    //         width={500}
    //         height={400}
    //         priority
    //         className="w-auto h-auto max-w-2xl drop-shadow-lg"
    //       />
    //     </motion.div>
    //   </div>

    //   {/* Background gradient glow effect */}
    //   <motion.div
    //     className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl -z-10"
    //     animate={{
    //       scale: [1, 1.2, 1],
    //     }}
    //     transition={{
    //       duration: 8,
    //       repeat: Infinity,
    //       ease: "easeInOut",
    //     }}
    //   />
    // </motion.section>
    <WardrobeDetox />
  );
}
