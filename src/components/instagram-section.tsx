"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PositionedBadge from "./ui/positioned-badge";



// Image positions configuration
const imagePositions = [
  // LEFT SIDE - Walking models
  {
    src: "/assets/people/main/personal-shopper1.png",
    alt: "Walking Models Left",
    width: 280,
    height: 320,
    position: { top: '150%', left: '30%' },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4
  },
  
  // CENTER BOTTOM - Standing model with dog
  {
    src: "/assets/people/main/personal-shopper2.png",
    alt: "Model with Dog",
    width: 320,
    height: 420,
    position: { top: '70%', left: '50%' },
    animation: { x: 0, y: 30, opacity: 0, rotate: 0 },
    delay: 0.5
  },
  
  // TOP CENTER - Brand shoots collage above Instagram text
  // {
  //   src: "/assets/brand/brandshoots/3.png",
  //   alt: "Brand Shoot 3",
  //   width: 140,
  //   height: 160,
  //   position: { top: '-300px', left: '68%' },
  //   animation: { x: 0, y: -20, opacity: 0, rotate: 0 },
  //   delay: 0.6
  // },
  {
    src: "/assets/brand/brandshoots/10.png",
    alt: "Brand Shoot 10",
    width: 70,
    height: 65,
    position: { top: '-300px', left: '90%' },
    animation: { x: 0, y: -20, opacity: 0, rotate: 0 },
    delay: 0.8
  },
  {
    src: "/assets/brand/main/brand-shoots2.png",
    alt: "Brand Shoots 2",
    width: 200,
    height: 210,
    position: { top: '-340px', left: '88%' },
    animation: { x: 0, y: -20, opacity: 0, rotate: 0 },
    delay: 0.65
  },
  {
    src: "/assets/brand/main/concept-development.png",
    alt: "Concept Development",
    width: 300,
    height: 300,
    position: { top: '-400px', left: '75%' },
    animation: { x: 0, y: -20, opacity: 0, rotate: 0 },
    delay: 0.7
  },
  {
    src: "/assets/brand/concept-development/1.png",
    alt: "Concept Dev 1",
    width: 300,
    height: 300,
    position: { top: '-400px', left: '63%' },
    animation: { x: 0, y: -20, opacity: 0, rotate: 0 },
    delay: 0.75
  },
  {
    src: "/assets/brand/concept-development/2.png",
    alt: "Concept Dev 2",
    width: 300,
    height: 300,
    position: { top: '-400px', left: '51%' },
    animation: { x: 0, y: -20, opacity: 0, rotate: 0 },
    delay: 0.8
  },
  
 
  {
    src: "/assets/brand/concept-development/5.jpg",
    alt: "Concept Dev 5",
    width: 95,
    height: 115,
    position: { top: '-300px', left: '77%' },
    animation: { x: 0, y: -20, opacity: 0, rotate: 0 },
    delay: 0.9
  },
  {
    src: "/assets/brand/concept-development/6.png",
    alt: "Concept Dev 6",
    width: 200,
    height: 110,
    position: { top: '-410px', left: '42%' },
    animation: { x: 0, y: -20, opacity: 0, rotate: 0 },
    delay: 0.95
  },
  {
    src: "/assets/brand/concept-development/7.png",
    alt: "Concept Dev 7",
    width: 85,
    height: 105,
    position: { top: '-300px', left: '79%' },
    animation: { x: 0, y: -20, opacity: 0, rotate: 0 },
    delay: 1.0
  },
  {
    src: "/assets/brand/concept-development/8.png",
    alt: "Concept Dev 8",
    width: 130,
    height: 105,
    position: { top: '-250px', left: '38%' },
    animation: { x: 0, y: -20, opacity: 0, rotate: 0 },
    delay: 1.0
  },
  {
    src: "/assets/brand/concept-development/9.png",
    alt: "Concept Dev 9",
    width: 150,
    height: 105,
    position: { top: '-410px', left: '38%' },
    animation: { x: 0, y: -20, opacity: 0, rotate: 0 },
    delay: 1.0
  },
  
  // TOP LEFT - Collage cluster with space-edit images, wardrobe-detox, etc.
  {
    src: "/assets/people/main/space-edit1.png",
    alt: "Space Edit 1",
    width: 130,
    height: 130,
    position: { top: '-300%', left: '5%' },
    animation: { x: -20, y: -10, opacity: 0, rotate: -15 },
    delay: 0.7
  },
  {
    src: "/assets/people/main/space-edit2.png",
    alt: "Space Edit 2",
    width: 115,
    height: 115,
    position: { top: '-300%', left: '14%' },
    animation: { x: -20, y: -10, opacity: 0, rotate: 12 },
    delay: 0.75
  },
  {
    src: "/assets/people/main/space-edit3.png",
    alt: "Space Edit 3",
    width: 105,
    height: 105,
    position: { top: '-390%', left: '5%' },
    animation: { x: -20, y: -10, opacity: 0, rotate: -8 },
    delay: 0.8
  },
  {
    src: "/assets/people/main/space-edit4.png",
    alt: "Space Edit 4",
    width: 95,
    height: 95,
    position: { top: '-150%', left: '7%' },
    animation: { x: -20, y: -10, opacity: 0, rotate: 18 },
    delay: 0.85
  },
  {
    src: "/assets/people/main/image.png",
    alt: "Main Image",
    width: 350,
    height: 200,
    position: { top: '-200%', left: '14%' },
    animation: { x: -20, y: 0, opacity: 0, rotate: 6 },
    delay: 0.9
  },
  {
    src: "/assets/people/wardrobe-detox/1.png",
    alt: "Wardrobe Detox 1",
    width: 90,
    height: 110,
    position: { top: '130%', left: '16%' },
    animation: { x: -20, y: 0, opacity: 0, rotate: -10 },
    delay: 0.95
  },
  {
    src: "/assets/people/wardrobe-detox/2.png",
    alt: "Wardrobe Detox 2",
    width: 100,
    height: 110,
    position: { top: '130%', left: '20%' },
    animation: { x: -20, y: 0, opacity: 0, rotate: 14 },
    delay: 1.0
  },
  {
    src: "/assets/people/wardrobe-detox/3.png",
    alt: "Wardrobe Detox 3",
    width: 80,
    height: 100,
    position: { top: '120%', left: '15%' },
    animation: { x: -20, y: 0, opacity: 0, rotate: -6 },
    delay: 1.05
  },
];

export default function InstagramSection() {
  return (
    <motion.section
      className="relative min-h-screen bg-landing text-foreground flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Centered Instagram Text */}
        <motion.h1
          className="font-libre-caslon-text text-[#9A3F3F] leading-none text-6xl md:text-7xl lg:text-8xl z-10"
          initial={{ y: 8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Not just fashion
        </motion.h1>

        {/* Dynamically render all images from configuration */}
        {imagePositions.map((img, index) => (
          <motion.div
            key={index}
            className="absolute z-20"
            style={{ 
              top: img.position.top, 
              left: img.position.left,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ 
              x: img.animation.x, 
              y: img.animation.y, 
              opacity: img.animation.opacity, 
              rotate: img.animation.rotate 
            }}
            whileInView={{ 
              x: 0, 
              y: 0, 
              opacity: 1, 
              rotate: img.animation.rotate 
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
              priority={index < 4}
            />
          </motion.div>
        ))}

       
        
      </div>
    </motion.section>
  );
}
