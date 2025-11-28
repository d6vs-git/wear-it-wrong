interface HeadingProps {
  /** Text to display inside the heading */
  text: string;
  /** Additional className to merge with the responsive defaults */
  className?: string;
}

export const Heading = ({ text, className = '' }: HeadingProps) => {
  return (
    <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tight font-bold font-badtyp text-primary whitespace-nowrap ${className}`}>
      {text}
    </h1>
  );
};