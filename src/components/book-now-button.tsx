interface BookNowProps {
  label?: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  ariaLabel?: string;
}

export const BookNowButton = ({ label = 'BOOK NOW', onClick, href, className = '', ariaLabel }: BookNowProps) => {
  const base = `inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-3 text-[#10207A] font-dogmaoutline text-base sm:text-lg md:text-xl lg:text-2xl transition-colors duration-150 hover:cursor-pointer ${className}`;

  if (href) {
    return (
      <a href={href} aria-label={ariaLabel ?? label} className={base}>
        {label}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel ?? label} className={base}>
      {label}
    </button>
  );
};