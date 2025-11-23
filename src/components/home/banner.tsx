"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface BannerProps {
  onClose: () => void;
}

export default function Banner({ onClose }: BannerProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.section
        className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 z-100"
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative bg-black border-2 border-white/30 rounded-2xl w-full max-w-md sm:max-w-lg p-6 sm:p-8 md:p-10 shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Logo */}
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="font-badtyp text-white text-2xl sm:text-3xl md:text-4xl tracking-wider">
              WEAR IT WRONG
            </h2>
          </motion.div>

          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              className="text-center space-y-2 sm:space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-white text-lg sm:text-xl font-atbserif tracking-wide">
                SIGN UP TO
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed tracking-wide px-2">
                Avail 10% discount on your first order when you sign up!
              </p>
            </motion.div>

            {/* Sign In Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-white hover:bg-white/95 text-black font-medium py-5 sm:py-6 flex items-center justify-center gap-2 sm:gap-3 rounded-lg transition-all hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 sm:h-5 sm:w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <FaGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Sign in with Google
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}