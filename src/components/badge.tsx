'use client';

import { motion } from 'framer-motion';

interface BadgeProps {
  label: string;
  className?: string;
  delay?: number;
  bgColor?: string;
}

export default function Badge({
  label,
  className = '',
  delay = 0,
  bgColor = '#9FC8E3',
}: BadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
      className={`inline-flex items-center justify-center px-6 py-2 rounded-full font-open-sans text-sm font-semibold text-foreground ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {label}
    </motion.div>
  );
}
