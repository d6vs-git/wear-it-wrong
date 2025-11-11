import { motion } from "framer-motion";

interface BadgeProps {
  text: string;
  isHovered?: boolean;
  dimensions?: { width: number; height: number };
  paddingX?: number;
  paddingY?: number;
  fontSize?: number;
}

export default function Badge({
  text,
  isHovered = false,
  dimensions,
  paddingX = 24,
  paddingY = 10,
  fontSize = 14,
}: BadgeProps) {
  return (
    <motion.div
      className="relative inline-block px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-6 rounded-full overflow-hidden bg-[#A8C5E6]"
      style={
        dimensions
          ? {
              // width: dimensions.width,
              // height: dimensions.height,
              // display: "flex",
              // alignItems: "center",
              // justifyContent: "center",
              // paddingLeft: `${paddingX}px`,
              // paddingRight: `${paddingX}px`,
              // paddingTop: `${paddingY}px`,
              // paddingBottom: `${paddingY}px`,
            }
          : undefined
      }
      initial={{ scale: 1, y: 0 }}
      animate={{ scale: [1, 1.02, 1], y: [0, -1, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Sheen effect */}
      <motion.span
        className="pointer-events-none absolute inset-y-0 left-[-40%] w-1/3 rotate-12 bg-linear-to-r from-transparent via-white/30 to-transparent"
        initial={false}
        animate={isHovered ? { x: "220%" } : { x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <p
        className="relative text-[10px] sm:text-sm md:text-md lg:text-xl text-black font-badtyp font-bold uppercase tracking-wider whitespace-nowrap"
        style={{ fontSize: `${fontSize}px` }}
      >
        {text}
      </p>
    </motion.div>
  );
}
