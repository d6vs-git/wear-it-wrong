import type { Metadata } from "next";
import Testimonials from "@/components/home/testimonials";

export const metadata: Metadata = {
  title: "Testimonials | Wear It Wrong",
  description: "Real words from people who worked with Wear It Wrong.",
};

export default function TestimonialsPage() {
  return (
    <main className="bg-background text-foreground overflow-x-hidden overflow-y-hidden">
      <Testimonials />
    </main>
  );
}
