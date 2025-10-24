"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const imagePositions = [
  // LEFT SIDE - Walking models
  {
    src: "/assets/people/main/personal-shopper1.png",
    alt: "Walking Models Left",
    width: 200,
    height: 150,
    position: { top: "76%", left: "73%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
  },

  // CENTER BOTTOM - Standing model with dog
  {
    src: "/assets/people/main/personal-shopper2.png",
    alt: "Model with Dog",
    width: 300,
    height: 200,
    position: { top: "70%", left: "90%" },
    animation: { x: 0, y: 30, opacity: 0, rotate: 0 },
    delay: 0.5,
  },

  //OCASIONAL STYLING 
  {
    src: "/assets/people/main/space-edit1.png",
    alt: "Space Edit 1",
    width: 130,
    height: 130,
    position: { top: '76%', left: '3%' },
    animation: { x: -20, y: -10, opacity: 0, rotate: -3 },
    delay: 0.7
  },
  {
    src: "/assets/people/main/space-edit2.png",
    alt: "Space Edit 2",
    width: 115,
    height: 115,
    position: { top: '78%', left: '14%' },
    animation: { x: -20, y: -10, opacity: 0, rotate: -3 },
    delay: 0.75
  },
  {
    src: "/assets/people/main/space-edit3.png",
    alt: "Space Edit 3",
    width: 105,
    height: 105,
    position: { top: '70%', left: '4%' },
    animation: { x: -20, y: -10, opacity: 0, rotate: -3 },
    delay: 0.8
  },
  {
  src: "/assets/people/main/space-edit4.png",
  alt: "Space Edit 4",
  width: 70,
  height: 70,
  position: { top: "89%", left: "7%" },
  animation: { x: -20, y: -10, opacity: 0, rotate: -3 }, // rotated slightly left
  delay: 0.85,
},

//Wardrobe Detox
{
  src: "/assets/people/main/wardrobe-detox.png",
  alt: "Wardrobe Detox",
  width: 70,
  height: 70,
  position: { top: "8%", left: "7%" },
  animation: { x: -20, y: -10, opacity: 0, rotate: -3 }, // rotated slightly left
  delay: 0.85,
},
 

//Styling 
{
  src: "/assets/people/main/image.png",
  alt: "Wardrobe Detox",
  width: 500,
  height: 500,
  position: { top: "-10%", right: "-8%" }, // use right instead of left
  align: "right", // <-- custom flag to handle transform differently
  animation: { x: -20, y: -10, opacity: 0, rotate: -3 },
  delay: 0.85,
}

];

export default function PeopleSection() {
  return (
    <motion.section
      className="relative w-full h-screen flex items-center justify-center bg-landing overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Dynamically render all images from configuration */}
     {imagePositions.map((img, index) => (
  <motion.div
    key={index}
    className="absolute z-20"
    style={{
      top: img.position.top,
      left: img.position.left,
      right: img.position.right, // supports right-based positioning
      transform: img.align === "right" 
        ? "translateY(-50%)" // only move vertically centered
        : "translate(-50%, -50%)",
    }}
    initial={{
      x: img.animation.x,
      y: img.animation.y,
      opacity: img.animation.opacity,
      rotate: img.animation.rotate,
    }}
    whileInView={{
      x: 0,
      y: 0,
      opacity: 1,
      rotate: img.animation.rotate,
    }}
    viewport={{ once: true }}
    transition={{ delay: img.delay, duration: 0.6 }}
  >
    <Image
      src={img.src}
      alt={img.alt}
      width={img.width}
      height={img.height}
      className="object-contain"
      priority={index < 2}
    />
  </motion.div>
))}

    </motion.section>
  );
}
