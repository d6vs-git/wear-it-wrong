"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import SubHeading from "@/components/ConceptBadge";

const imagePositions = [
  
    //space-edit
{
    src: "/assets/images/people/main/space-edit2.png",
    alt: "heyy-text ",
    width: 150,
    height: 170,
    position: { top: '5%', left: '18%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "space-edit"
  },
   {
    src: "/assets/images/people/main/space-edit1.png",
    alt: "Hanger",
    width: 230,
    height: 170,
    position: { top: '10%', left: '4%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "space-edit"
  },
   {
    src: "/assets/images/people/main/space-edit3.png",
    alt: "Disco-ball",
    width: 130,
    height: 170,
    position: { top: '22%', left: '12.6%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "space-edit"
  },
  {
    src: "/assets/images/people/main/image78.png",
    alt: "favourite-person",
    width: 110,
    height: 170,
    position: { top: '4%', left: '6%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "space-edit"
  },
  
  {
    src: "/assets/images/space/main/image54.jpg",
    alt: "portrait frame",
    width: 300,
    height: 300,
    position: { top: '55%', left: '5%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "brand-space"
  },
  {
    src: "/assets/images/space/main/image90.png",
    alt: "photo frame",
    width: 150,
    height: 170,
    position: { top: '27%', left: '33%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 20 },
    delay: 0.4,
    category: "brand-space"
  },
  {
    src: "/assets/images/space/main/image77.png",
    alt: "recorder",
    width: 90,
    height: 170,
    position: { top: '42%', left: '23%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "brand-space"
  },
    {
    src: "/assets/images/space/main/image88.png",
    alt: "pot plant",
    width: 130,
    height: 170,
    position: { top: '27%', left: '28%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "brand-space"
  },
  {
    src: "/assets/images/space/main/image87.png",
    alt: "necklace",
    width: 100,
    height: 170,
    position: { top: '48%', left: '38%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: -15 },
    delay: 0.4,
    category: "brand-space"
  },
  {
    src: "/assets/images/space/main/image71.jpg",
    alt: "music-player",
    width: 100,
    height: 170,
    position: { top: '43%', left: '46%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "makeover-projects"
  },
   {
    src: "/assets/images/space/main/image76.png",
    alt: "car",
    width: 240,
    height: 200,
    position: { top: '20%', left: '50%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "brand-space"
  },
  
  {
    src: "/assets/images/space/main/image79.png",
    alt: "cupboard",
    width: 220,
    height: 200,
    position: { top: '6%', left: '75%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "makeover-projects"
  },
   {
    src: "/assets/images/space/main/image81.png",
    alt: "flower-pots",
    width: 140,
    height: 200,
    position: { top: '28%', left: '68%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "makeover-projects"
  },
   {
    src: "/assets/images/space/main/image81.png",
    alt: "flower-pots-2",
    width: 140,
    height: 200,
    position: { top: '28%', left: '89%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "makeover-projects"
  },
  {
    src: "/assets/images/space/main/image80.png",
    alt: "chair-1",
    width: 120,
    height: 120,
    position: { top: '49%', left: '78%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "makeover-projects"
  },
   {
    src: "/assets/images/space/main/image82.png",
    alt: "chair-3",
    width: 180,
    height: 70,
    position: { top: '50%', left: '87%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "makeover-projects"
  },
  {
    src: "/assets/images/space/main/image84.png",
    alt: "table",
    width: 240,
    height: 200,
    position: { top: '66%', left: '74%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "makeover-projects"
  },
  {
    src: "/assets/images/space/main/image85.png",
    alt: "flower vase",
    width: 70,
    height: 70,
    position: { top: '56%', left: '79.5%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "makeover-projects"
  },
  {
    src: "/assets/images/space/main/image83.png",
    alt: "chair-2",
    width: 180,
    height: 70,
    position: { top: '50%', left: '65%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "makeover-projects"
  },
 
];

// Badge positions matching Image 2
const badgePositions = [
  {
    text: "SPACE EDIT",
    position: { top: '36%', left: '15%' },
    delay: 0.6,
    category: "space-edit"
  },
  {
    text: "BRAND SPACES",
    position: { top: '67%', left: '30%' },
    delay: 0.8,
    category: "brand-space"
  },
  {
    text: "MAKEOVER PROJECTS",
    position: { top: '74%', left: '82%' },
    delay: 1.0,
    category: "makeover-projects"
  }
];

export default function SpaceSection() {
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