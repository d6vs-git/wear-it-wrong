import Hero from "../components/home/hero";
import About from "../components/home/about";
import Testimonials from "../components/home/testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Hero />
      <About />
      <Testimonials />
    </main>
  );
}
