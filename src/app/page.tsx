import HomeHero from "../components/home/hero";
import HomeAbout from "../components/home/about";
import HomeTestimonials from "../components/home/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <HomeHero />
      <HomeAbout />
      <HomeTestimonials />
    </main>
  );
}
