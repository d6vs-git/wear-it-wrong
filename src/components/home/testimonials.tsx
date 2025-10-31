"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const imagePositions = [
  {
    src: "/assets/images/testimonial/image240.png",
    alt: "love icons for testimonial",
    width: 400,
    height: 400,
    position: { top: "14%", left: "11%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
  },
   {
    src: "/assets/images/testimonial/image254.png",
    alt: "box for testimonial",
    width: 250,
    height: 200,
    position: { top: "15%", left: "20%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
  },
  {
    src: "/assets/images/testimonial/image240.png",
    alt: "love icons for testimonial",
    width: 400,
    height: 400,
    position: { top: "40%", left: "60%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
  },
   {
    src: "/assets/images/testimonial/image254.png",
    alt: "box for testimonial",
    width: 250,
    height: 200,
    position: { top: "40%", left: "69%" },
    animation: { x: -30, y: 0, opacity: 0, rotate: 0 },
    delay: 0.4,
  },
];

export default function HomeTestimonials() {
  const [active, setActive] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-landing overflow-hidden">
      {imagePositions.map((img, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ top: img.position.top, left: img.position.left, transform: "translate(-50%, -50%)" }}
          initial={{ x: img.animation.x, y: img.animation.y, opacity: img.animation.opacity, rotate: 0 }}
          whileInView={{ x: 0, y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image src={img.src} alt={img.alt} width={img.width} height={img.height} className="object-contain" priority={index < 2} />
        </motion.div>
      ))}
    </section>
  );
}