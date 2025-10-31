import Link from "next/link";
import { AboutTitle } from "./about-parts/title";
import { AboutCopy } from "./about-parts/copy";

export default function HomeAbout() {
  return (
    <section id="about" className="bg-landing text-black min-h-screen flex items-center py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-10 w-full">
        <AboutTitle />
        <AboutCopy />
        <div className="pt-6 px-4 sm:px-8">
          {/* <Link href="/about" className="font-atbserif text-base md:text-lg text-black underline underline-offset-4">
            Read full About →
          </Link> */}
        </div>
      </div>
    </section>
  );
}
