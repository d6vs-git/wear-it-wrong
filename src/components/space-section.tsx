"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const imagePositions = [
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
//TOP LEFT IMAGE cat on a sofa 
{
  src: "/assets/space/main/makeover2.png",
  alt: "SPACE MAKEOVER 2",
  width: 240,
  height: 240,
  position: { top: '-1%', left: '1%' },
  animation: { x: -30, y: 0, opacity: 0, rotate: 180 },
  delay: 0.4
},
{
  src: "/assets/space/main/makeover1.png",
  alt: "SPACE MAKEOVER 1",
  width: 50,
  height: 50,
  position: { top: '4%', left: '7%' },
  animation: { x: -30, y: 0, opacity: 0, rotate: 180 },
  delay: 0.4
},

//bottom right corner 
{
  src: "/assets/space/brand-spaces/8.png",
  alt: "brand space",
  width: 300,
  height: 300,
  position: { top: '60%', left: '76%' },
  animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
  delay: 0.4
},
{
  src: "/assets/space/brand-spaces/6.png",
  alt: "brand space",
  width: 90,
  height: 90,
  position: { top: '83%', left: '73%' },
  animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
  delay: 0.4
},
{
  src: "/assets/space/brand-spaces/6.png",
  alt: "brand space",
  width: 90,
  height: 90,
  position: { top: '83%', left: '91%' },
  animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
  delay: 0.4
},

//top right corner
{
  src: "/assets/space/brand-spaces/2.png",
  alt: "brand space",
  width: 180,
  height: 180,
  position: { top: '-2.5%', left: '91%' },
  animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
  delay: 0.4
},

{
  src: "/assets/styles/spaces/8.png",
  alt: "car",
  width: 45,
  height: 45,
  position: { top: '3%', left: '94%' },
  animation: { x: -30, y: 0, opacity: 0, rotate: -87 },
  delay: 0.4
},
{
  src: "/assets/space/makeover/1.png",
  alt: "car",
  width: 250,
  height: 250,
  position: { top: '-1%', left: '86%' },
  animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
  delay: 0.4
},

];
export default function SpaceSection() {
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
