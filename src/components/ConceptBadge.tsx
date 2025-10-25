import React from 'react';

interface SubHeadingProps {
  text: string;
  className?: string;
}

export default function SubHeading({ text, className = '' }: SubHeadingProps) {
  return (
    <div
      className={`inline-block px-2 py-1 bg-[#A8C5E6] rounded-full ${className}`}
    >
      <p className="text-xl font-badtyp font-bold text-black uppercase tracking-wider whitespace-nowrap">
        {text}
      </p>
    </div>
  );
}

// Usage examples:
// <ConceptBadge text="CONCEPT DEVELOPMENT" />
// <ConceptBadge text="BRAND STRATEGY" />
// <ConceptBadge text="CREATIVE DIRECTION" className="mt-4" />