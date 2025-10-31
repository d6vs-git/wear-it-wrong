import { motion } from "framer-motion";

interface BadgeProps {
  text: string;
  isHovered?: boolean;
}

export default function Badge({ text, isHovered = false }: BadgeProps) {
  return (
    <motion.div
      className="relative inline-block px-6 py-2.5 bg-[#A8C5E6] rounded-full overflow-hidden"
      initial={{ scale: 1, y: 0 }}
      animate={{ scale: [1, 1.02, 1], y: [0, -1, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* sheen effect */}
      <motion.span
        className="pointer-events-none absolute inset-y-0 left-[-40%] w-1/3 rotate-12 bg-linear-to-r from-transparent via-white/30 to-transparent"
        initial={false}
        animate={isHovered ? { x: "220%" } : { x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <p className="relative text-xl font-badtyp font-bold text-black uppercase tracking-wider whitespace-nowrap">
        {text}
      </p>
    </motion.div>
  );
}