"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="w-full bg-[#EEDCC7] border-t border-black mt-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          
          {/* Logo + Social */}
          <div className="flex flex-col gap-3">
            <div className="border border-black p-4 flex items-center justify-center h-20">
              <span className="text-lg font-bold">logo</span>
            </div>
            <div className="border border-black p-3 flex items-center justify-center gap-3">
              <div className="w-5 h-5 bg-black rounded-full" />
              <div className="w-5 h-5 bg-black rounded-full" />
            </div>
          </div>

          {/* About */}
          <div className="border border-black p-4 flex flex-col gap-1.5 text-sm">
            <button onClick={() => router.push("/about")} className="text-left hover:underline">about</button>
            <button onClick={() => router.push("/services")} className="text-left hover:underline">all services</button>
            <button onClick={() => router.push("/testimonials")} className="text-left hover:underline">testimonials</button>
            <button onClick={() => router.push("/privacy")} className="text-left hover:underline">privacy policy</button>
            <button onClick={() => router.push("/terms")} className="text-left hover:underline">terms & conditions</button>
          </div>

          {/* Brands */}
          <div className="border border-black p-4 flex flex-col gap-1.5 text-sm">
            <button onClick={() => router.push("/brands")} className="text-left hover:underline">brands</button>
            <button onClick={() => router.push("/brands/concept-dev")} className="text-left hover:underline">– concept dev</button>
            <button onClick={() => router.push("/brands/vis-merch")} className="text-left hover:underline">– vis merch</button>
            <button onClick={() => router.push("/brands/shoots")} className="text-left hover:underline">– brand shoots</button>
          </div>

          {/* People */}
          <div className="border border-black p-4 flex items-center justify-center text-sm">
            <button onClick={() => router.push("/people")} className="hover:underline">people</button>
          </div>

          {/* Spaces */}
          <div className="border border-black p-4 flex items-center justify-center text-sm">
            <button onClick={() => router.push("/spaces")} className="hover:underline">spaces</button>
          </div>

        </div>
      </div>
    </footer>
  );
}