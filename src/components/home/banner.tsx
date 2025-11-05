"use client";

import { Button } from "@/components/ui/button";
import { Truck, Sparkles, Globe2, X } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

interface BannerProps {
  onClose: () => void;
}

export default function Banner({ onClose }: BannerProps) {
  // Handle clicking outside of the modal to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <section
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-black border border-white/10 rounded-lg w-full max-w-md p-8 animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="text-center mb-6">
          <h2 className="font-badtyp text-white text-3xl tracking-wider">
            WEAR IT WRONG
          </h2>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-white text-xl mb-2 font-atbserif">
              SIGN UP FOR
            </h3>
            <p className="text-white/80 text-sm tracking-wide">
              EXCLUSIVES DROPS AND OFFERS
            </p>
          </div>

          {/* Sign in with Google button */}
          <Button
            onClick={onClose}
            className="w-full bg-white hover:bg-white/90 text-black font-medium py-6 flex items-center justify-center gap-2"
          >
            <FaGoogle className="w-5 h-5" />
            Sign in with Google
          </Button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Truck className="text-white w-6 h-6" />
              </div>
              <p className="text-white/80 text-xs">Fast Shipping</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Sparkles className="text-white w-6 h-6" />
              </div>
              <p className="text-white/80 text-xs">Exclusive Drops</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Globe2 className="text-white w-6 h-6" />
              </div>
              <p className="text-white/80 text-xs">Global Curation</p>
            </div>
          </div>

          {/* Terms text */}
          <div className="text-center text-white/60 text-xs">
            <p>I accept that I have read & understood WearItWrong's</p>
            <p>
              <a href="#" className="underline hover:text-white">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline hover:text-white">
                T&Cs
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
