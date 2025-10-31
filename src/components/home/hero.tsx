"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomeHero() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <button
          type="button"
          aria-label="Go to folders"
          onClick={() => router.push("/folders")}
          className="inline-block transition-transform duration-200 hover:scale-105 focus:scale-105 focus:outline-none"
        >
          <Image
            src="/assets/logo.png"
            alt="Wear It Wrong Logo"
            width={500}
            height={400}
            priority
            className="w-auto h-auto max-w-2xl"
          />
        </button>
      </div>
    </section>
  );
}
