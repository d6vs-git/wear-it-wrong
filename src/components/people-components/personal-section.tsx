"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heading } from "../heading";
import { Book } from "lucide-react";
import { BookNowButton } from "../book-now-button";

const imagePositions = [
  {
    src: "/assets/images/people/personal-shopping/bg-1.png",
    alt: "Personal Shopper 1",
    width: 450,
    height: 450,
    position: { top: "20%", left: "30%" },
    animation: { x: -20, y: -10, opacity: 0, rotate: 0 },
    delay: 0.7,
  },
  {
    src: "/assets/images/people/personal-shopping/bg-2.png",
    alt: "Personal Shopper 1",
    width: 450,
    height: 450,
    position: { top: "20%", left: "50%" },
    animation: { x: -20, y: -10, opacity: 0, rotate: 0 },
    delay: 0.7,
  },
  {
    src: "/assets/images/people/personal-shopping/bg-1.png",
    alt: "Personal Shopper 1",
    width: 450,
    height: 450,
    position: { top: "20%", left: "70%" },
    animation: { x: -20, y: -10, opacity: 0, rotate: 0 },
    delay: 0.7,
  },
  {
    src: "/assets/images/people/personal-shopping/carpet1.jpg",
    alt: "Personal Shopper 1",
    width: 600,
    height: 600,
    position: { top: "62%", left: "30%" },
    animation: { x: -20, y: -10, opacity: 0, rotate: 0 },
    delay: 0.7,
  },
  {
    src: "/assets/images/people/personal-shopping/carpet1.jpg",
    alt: "Personal Shopper 1",
    width: 600,
    height: 600,
    position: { top: "62%", left: "50%" },
    animation: { x: -20, y: -10, opacity: 0, rotate: 0 },
    delay: 0.7,
  },
  {
    src: "/assets/images/people/personal-shopping/carpet1.jpg",
    alt: "Personal Shopper 1",
    width: 600,
    height: 600,
    position: { top: "62%", left: "70%" },
    animation: { x: -20, y: -10, opacity: 0, rotate: 0 },
    delay: 0.7,
  },
  {
    src: "/assets/images/people/personal-shopping/mat.png",
    alt: "Personal Shopper 1",
    width: 340,
    height: 340,
    position: { top: "68%", left: "57%" },
    animation: { x: -20, y: -10, opacity: 0, rotate: -3 },
    delay: 0.7,
  },
  {
    src: "/assets/images/people/personal-shopping/1.png",
    alt: "Personal Shopper 1",
    width: 600,
    height: 600,
    position: { top: "32%", left: "43%" },
    animation: { x: -20, y: -10, opacity: 0, rotate: 0 },
    delay: 0.7,
  },
  {
    src: "/assets/images/people/personal-shopping/3.png",
    alt: "Personal Shopper 1",
    width: 300,
    height: 300,
    position: { top: "28%", left: "68%" },
    animation: { x: -20, y: -10, opacity: 0, rotate: 0 },
    delay: 0.7,
  },
  {
    src: "/assets/images/people/personal-shopping/2.png",
    alt: "Personal Shopper 1",
    width: 300,
    height: 300,
    position: { top: "68%", left: "70%" },
    animation: { x: -20, y: -10, opacity: 0, rotate: -3 },
    delay: 0.7,
  },
  {
    src: "/assets/images/people/personal-shopping/4.png",
    alt: "Personal Shopper 1",
    width: 320,
    height: 320,
    position: { top: "52%", left: "25%" },
    animation: { x: -20, y: -10, opacity: 0, rotate: -3 },
    delay: 0.7,
  },
  {
    src: "/assets/images/people/personal-shopping/5.png",
    alt: "Personal Shopper 1",
    width: 130,
    height: 130,
    position: { top: "82%", left: "65%" },
    animation: { x: -20, y: -10, opacity: 0, rotate: -3 },
    delay: 0.7,
  },
];

export default function PersonalSection() {
  return (
    <motion.section
      className="relative w-full min-h-screen bg-[#f9f8ef] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Main Container with Flexbox */}
      <div className="relative w-full h-screen flex flex-col">
        
        {/* Header Section */}
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-6 sm:pt-8 md:pt-10 lg:pt-12 flex justify-between items-center z-30">
          <Heading text="PERSONAL SHOPPING" />
          <BookNowButton />
        </div>

        {/* Content Section - Flexbox Layout with No Gap */}
        <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 sm:py-6 md:py-8">
          
          {/* Text Content - Left Side */}
          <div className="w-1/2">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-black leading-relaxed">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold block mb-3 sm:mb-4">₹4,500</span>
              
              You start by filling out a quick form so I can get to know your style, routine, and what you're shopping for. Based on that, I create a moodboard and we meet to go through it; talk about what you like, where you usually shop, and which direction to take.
              <br /><br />
              Then comes the fun part, a two-hour shopping session (in-person or online). I plan the stores, brands, and pieces beforehand, so everything we look at already makes sense for you. During the session, I help you pick what works best: fits, colours, price points, all of it.
              <br /><br />
              After we shop, you'll receive a personalized presentation with your moodboard, the pieces we bought, outfit ideas for different occasions, and links to anything else I think would complete your wardrobe.
              <br /><br />
              It's an effortless, guided shopping experience. you still choose, but I make it all come together beautifully.
            </p>
          </div>

          {/* Image Area - Right Side */}
          <div className="flex-1 relative w-full h-full min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
            {/* Images with Absolute Positioning */}
            {imagePositions.map((img, index) => (
              <motion.div
                key={index}
                className="absolute z-20"
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
                viewport={{ once: true }}
                transition={{ delay: img.delay, duration: 0.6 }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="object-contain w-full h-auto"
                  priority={index < 2}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}