"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import SubHeading from "@/components/ConceptBadge";

const imagePositions = [
  
    //space-edit
{
    src: "/assets/images/people/main/wardrobe-detox.png",
    alt: "jacket on hanger ",
    width: 200,
    height: 200,
    position: { top: '15%', left: '20%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "wardrobe-detox"
},
{
    src: "/assets/images/people/main/image49.png",
    alt: "nob ",
    width: 80,
    height: 80,
    position: { top: '15%', left: '8%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: -30 },
    delay: 0.4,
    category: "wardrobe-detox"
},
{
    src: "/assets/images/people/main/image47.png",
    alt: "music player cd ",
    width: 180,
    height: 200,
    position: { top: '65%', left: '4%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "package-offers"
},
 {
    src: "/assets/images/people/main/image42.png",
    alt: "paper ",
    width: 300,
    height: 300,
    position: { top: '58%', left: '18%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "style-drop"
},
{
    src: "/assets/images/people/main/image44.png",
    alt: "paper -2",
    width: 180,
    height: 220,
    position: { top: '64%', left: '22%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "style-drop"
},
{
    src: "/assets/images/people/main/image41.jpg",
    alt: "web-view",
    width: 260,
    height: 260,
    position: { top: '59%', left: '40%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "style-drop"
},
{
    src: "/assets/images/people/main/image55.png",
    alt: "blocks",
    width: 110,
    height: 220,
    position: { top: '70%', left: '33%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "style-drop"
},
{
    src: "/assets/images/people/main/image53.png",
    alt: "bags",
    width: 300,
    height: 300,
    position: { top: '-3%', left: '37%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "wardrobe-detox"
},
{
    src: "/assets/images/people/main/personal-shopper1.png",
    alt: "2-ppl-walk",
    width: 260,
    height: 300,
    position: { top: '51%', left: '54%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "occasion-styling"
},
{
    src: "/assets/images/people/main/image21.png",
    alt: "girl-with bag",
    width: 180,
    height: 300,
    position: { top: '36%', left: '66%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "occasion-styling"
},
{
    src: "/assets/images/people/main/personal-shopper2.png",
    alt: "girl-with dog",
    width: 220,
    height: 300,
    position: { top: '48%', left: '79%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "personal-shopper"
},
{
    src: "/assets/images/people/main/image.png",
    alt: "beauty-products",
    width: 430,
    height: 300,
    position: { top: '6%', left: '72%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
    category: "personal-shopper"
},
{
    src: "/assets/images/people/main/image72.jpg",
    alt: "photo-frame",
    width: 110,
    height: 110,
    position: { top: '32%', left: '52%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: -30 },
    delay: 0.4,
    category: "occasion-styling"
},
];

// Badge positions matching Image 2
const badgePositions = [
  {
    text: "WARDROBE DETOX",
    position: { top: '19%', left: '10%' },
    delay: 0.6,
    category: "wardrobe-detox"
  },
  {
    text: "PACKAGE AND OFFERS",
    position: { top: '53%', left: '4%' },
    delay: 0.8,
    category: "package-offers"
  },
  {
    text: "OCCASION STYLING",
    position: { top: '47%', left: '49%' },
    delay: 1.0,
    category: "occasion-styling"
  },
  {
    text: "STYLE DROP",
    position: { top: '89%', left: '19%' },
    delay: 1.0,
    category: "style-drop"
  },
  {
    text: "PERSONAL SHOPPER",
    position: { top: '90%', left: '72%' },
    delay: 1.0,
    category: "personal-shopper"
  }
  
];

interface PeopleSectionProps {
  onBadgeClick: (service: string) => void;
}

export default function PeopleSection({ onBadgeClick }: PeopleSectionProps) {
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
     
     // Map category to service name for navigation
     const serviceMap: Record<string, string> = {
       "wardrobe-detox": "wardrobe-detox",
       "package-offers": "package-offers",
       "occasion-styling": "occasion-styling",
       "style-drop": "style-drop",
       "personal-shopper": "personal-shopping"
     };
     
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
       onClick={() => onBadgeClick(serviceMap[badge.category])}
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