export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5ede3] flex items-center justify-center px-8 py-20">
      <div className="max-w-3xl w-full">
        {/* Title - Above the Beyond Script */}
        <h1
          className="font-abovebeyond text-6xl sm:text-7xl md:text-8xl text-[#a4463a] text-center mb-20 leading-none tracking-tight"
        >
          About WearItWrong
        </h1>

        {/* Content - Clean layout using ATB Serif for body text */}
        <div className="px-4 sm:px-8">
          <div className="space-y-6 text-[#8b4535] leading-relaxed text-lg sm:text-xl font-atbserif">
            <p>
              <strong>
                Wear It Wrong is a creative styling studio that helps people, brands, and spaces find their expression and look good doing it.
              </strong>
            </p>
            <p>
              Founded by stylist <span style={{ textDecoration: 'underline dotted', textUnderlineOffset: '3px' }}>Gouri Dhawan</span>, the studio works across personal, commercial, and interior styling; from building wardrobes that make sense to designing brand shoots and <span style={{ textDecoration: 'underline dotted', textUnderlineOffset: '3px' }}>reimagining</span> spaces.
            </p>
            <p>
              The idea is simple: style isn't about perfection or trends. It's about creating things that feel right; for who you are, what you do, and how you live.
            </p>
            <p>
              Whether it's your clothes, your store, or your home, the goal is always the same: to make it feel intentional, effortless, and unmistakably you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}