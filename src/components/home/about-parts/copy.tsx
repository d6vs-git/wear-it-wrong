type EmProps = { children: React.ReactNode };
export function Em({ children }: EmProps) {
  return (
    <span style={{ textDecoration: "underline dotted", textUnderlineOffset: "3px" }}>{children}</span>
  );
}

export function AboutCopy() {
  return (
    <div className="px-4 sm:px-8">
      <div className="space-y-6 text-[#8b4535] leading-relaxed text-lg sm:text-xl font-atbserif">
        <p>
          <strong>
            Wear It Wrong is a creative styling studio that helps people, brands, and spaces find their expression and look good doing it.
          </strong>
        </p>
        <p>
          Founded by stylist <Em>Gouri Dhawan</Em>, the studio works across personal, commercial, and interior styling; from building wardrobes that make sense to designing brand shoots and <Em>reimagining</Em> spaces.
        </p>
        <p>
          The idea is simple: style isn't about perfection or trends. It's about creating things that feel right; for who you are, what you do, and how you live.
        </p>
        <p>
          Whether it's your clothes, your store, or your home, the goal is always the same: to make it feel intentional, effortless, and unmistakably you.
        </p>
      </div>
    </div>
  );
}
