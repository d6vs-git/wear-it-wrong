import React from 'react';
import { motion } from 'framer-motion';

interface SubHeadingProps {
  text: string;
  className?: string;
  /** Disable the idle pulse animation if needed */
  disablePulse?: boolean;
}

export default function SubHeading({ text, className = '', disablePulse = false }: SubHeadingProps) {
  return (
    <motion.div
      className={`relative inline-block px-2 py-1 bg-[#A8C5E6] rounded-full overflow-hidden ${className}`}
      initial={{ scale: 1, y: 0 }}
      animate={disablePulse ? { scale: 1, y: 0 } : { scale: [1, 1.02, 1], y: [0, -1, 0] }}
      transition={disablePulse ? { duration: 0 } : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.08, y: -2, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
    >
      {/* sheen */}
      <motion.span
        className="pointer-events-none absolute inset-y-0 left-[-40%] w-1/3 bg-gradient-to-r from-white/40 via-white/10 to-transparent rotate-12"
        initial={false}
        whileHover={{ x: '220%' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <p className="relative text-xl font-badtyp font-bold text-black uppercase tracking-wider whitespace-nowrap">
        {text}
      </p>
    </motion.div>
  );
}

// Usage examples:
// <ConceptBadge text="CONCEPT DEVELOPMENT" />
// <ConceptBadge text="BRAND STRATEGY" />
// <ConceptBadge text="CREATIVE DIRECTION" className="mt-4" />