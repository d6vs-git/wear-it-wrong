"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const imagePositions = [
  // CONCEPT DEVELOPMENT IMAGE
  {
    src: "/assets/brand/concept-development/2.png",
    alt: "2. Concept Development",
    width: 360,
    height: 360,
    position: { top: '78%', left: '2%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4
  },
//BRAND SHOOT IMAGES

   {
    src: "/assets/brand/brandshoots/1.png",
    alt: "1. Brand Shoot",
    width: 70,
    height: 70,
    position: { top: '74%', left: '80%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4
  },
   {
    src: "/assets/brand/brandshoots/8.png",
    alt: "8. Brand Shoot",
    width: 140,
    height: 140,
    position: { top: '74%', left: '93%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4
  }, {
    src: "/assets/brand/brandshoots/3.png",
    alt: "3. Brand Shoot",
    width: 79,
    height: 78,
    position: { top: '78%', left: '87%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4
  },
  //CAMERA IMAGE TOP RIGHT
   {
    src: "/assets/brand/main/brand-shoot2-coImage.png",
    alt: "4. Brand Shoot",
    width: 120,
    height: 120,
    position: { top: '4.9%', left: '88.5%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4
  },
  {
    src: "/assets/brand/main/brand-shoots2.png",
    alt: "4. Brand Shoot",
    width: 300,
    height: 300,
    position: { top: '0.5%', left: '87%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: -2 },
    delay: 0.4
  },
  //top left corner 
  {
    src: "/assets/brand/visual-merch/2.jpg",
    alt: "visual Merch",
    width: 160,
    height: 160,
    position: { top: '-2%', left: '3%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4
  },
];

export default function BrandSection() {
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
