"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import SubHeading from "@/components/ConceptBadge";

const imagePositions = [
  
  //Merchandising images
  {
    src: "/assets/images/brand/concept-development/2.png",
    alt: "cafe -> mon bar a couture",
    width: 440,
    height: 400,
    position: { top: '10%', left: '43%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "merchandising"
  },
   {
    src: "/assets/images/brand/concept-development/6.png",
    alt: "cafe-2",
    width: 370,
    height: 370,
    position: { top: '17%', left: '28%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "merchandising"
  },
  {
    src: "/assets/images/brand/concept-development/7.png",
    alt: "chairs ",
    width: 250,
    height: 250,
    position: { top: '49%', left: '30%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "merchandising"
  },
  {
    src: "/assets/images/brand/main/image69.png",
    alt: "M symbol",
    width: 50,
    height: 50,
    position: { top: '36.5%', left: '48%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "merchandising"
  },
  {
    src: "/assets/images/brand/main/image70.png",
    alt: "V symbol",
    width: 50,
    height: 50,
    position: { top: '34%', left: '36%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "merchandising"
  },
  //concept-development image 
  {
    src: "/assets/images/brand/concept-development/9.png",
    alt: "cafe-23vins Hotel",
    width: 300,
    height: 300,
    position: { top: '14%', left: '1.5%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "concept"
  },
  {
    src: "/assets/images/brand/concept-development/8.png",
    alt: "cafe-23vins Hotel-2",
    width: 300,
    height: 300,
    position: { top: '52%', left: '6%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "concept"
  },
   {
    src: "/assets/images/brand/main/image62.png",
    alt: "my-girl",
    width: 110,
    height: 110,
    position: { top: '54%', left: '7.5%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "concept"
  },
   {
    src: "/assets/images/space/main/makeover1.png",
    alt: "cat",
    width: 60,
    height: 50,
    position: { top: '61%', left: '8%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "concept"
  },
  {
    src: "/assets/images/brand/main/image64.png",
    alt: "women with dog ",
    width: 170,
    height: 150,
    position: { top: '67%', left: '12%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "concept"
  },
  //brand-shoot images
  {
    src: "/assets/images/brand/concept-development/1.png",
    alt: "apartment ",
    width: 500,
    height: 500,
    position: { top: '35%', left: '65%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "brandShoot"
  },
  
  {
    src: "/assets/images/brand/main/image65.png",
    alt: "ladies group ",
    width: 300,
    height: 300,
    position: { top: '27%', left: '75%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "brandShoot"
  },
   {
    src: "/assets/images/brand/main/brand-shoots2.png",
    alt: "camera ",
    width: 230,
    height: 230,
    position: { top: '19%', left: '76%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: -110 },
    delay: 0.4,
    category: "brandShoot"
  },
  
];

// Badge positions matching Image 2
const badgePositions = [
  {
    text: "VISUAL MERCHANDISING",
    position: { top: '28%', left: '37%' },
    delay: 0.6,
    category: "merchandising"
  },
  {
    text: "CONCEPT DEVELOPMENT",
    position: { top: '67%', left: '30%' },
    delay: 0.8,
    category: "concept"
  },
  {
    text: "BRAND SHOOTS",
    position: { top: '74%', left: '82%' },
    delay: 1.0,
    category: "brandShoot"
  }
];

export default function BrandSection() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
   <motion.section
         className="relative w-full h-screen flex items-center justify-center bg-landing overflow-hidden"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.6 }}
       >
         {/* Dynamically render all images from configuration */}
        {imagePositions.map((img, index) => {
          const isHovered = hoveredCategory === img.category;
          const isOtherHovered = hoveredCategory !== null && hoveredCategory !== img.category;
          
          return (
     <motion.div
       key={index}
       className="absolute z-20 transition-all duration-300"
       style={{
         top: img.position.top,
         left: img.position.left,
         transform: "translate(-50%, -50%)",
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
       animate={{
         scale: isHovered ? 1.3 : isOtherHovered ? 0.85 : 1,
         filter: isOtherHovered ? "blur(6px)" : "blur(0px)",
         opacity: isOtherHovered ? 0.4 : 1,
       }}
       viewport={{ once: true }}
       transition={{ 
         scale: { duration: 0.3, ease: "easeOut" },
         filter: { duration: 0.25, ease: "easeOut" },
         opacity: { duration: 0.25, ease: "easeOut" }
       }}
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
   );
        })}

   {/* Badge Components */}
   {badgePositions.map((badge, index) => {
     const isBadgeHovered = hoveredCategory === badge.category;
     const isOtherBadgeHovered = hoveredCategory !== null && hoveredCategory !== badge.category;
     
     return (
     <motion.div
       key={`badge-${index}`}
       className="absolute z-30 cursor-pointer"
       style={{
         top: badge.position.top,
         left: badge.position.left,
         transform: "translate(-50%, -50%)",
       }}
       initial={{
         opacity: 0,
         scale: 0.8,
       }}
       whileInView={{
         opacity: 1,
         scale: 1,
       }}
       animate={{
         scale: isBadgeHovered ? 1.15 : isOtherBadgeHovered ? 0.95 : 1,
         filter: isOtherBadgeHovered ? "blur(3px)" : "blur(0px)",
         opacity: isOtherBadgeHovered ? 0.6 : 1,
       }}
       onHoverStart={() => setHoveredCategory(badge.category)}
       onHoverEnd={() => setHoveredCategory(null)}
       viewport={{ once: true }}
       transition={{ 
         scale: { duration: 0.25, ease: "easeOut" },
         filter: { duration: 0.2, ease: "easeOut" },
         opacity: { duration: 0.2, ease: "easeOut" }
       }}
     >
       <SubHeading text={badge.text} />
     </motion.div>
   );
   })}
   
       </motion.section>
  );
}