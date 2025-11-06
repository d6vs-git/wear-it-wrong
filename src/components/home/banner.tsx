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

  // Handle clicking outside of the modal to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google", {
        callbackUrl: "/", // Redirect to homepage after sign in
      });
      // Note: onClose will be called automatically after successful sign in
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.section
        className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        style={{ zIndex: 100 }}
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
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.4,
          }}
        >
          {/* Close button */}
          <motion.button
            onClick={onClose}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
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
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h2 className="font-badtyp text-white text-2xl sm:text-3xl md:text-4xl tracking-wider">
              WEAR IT WRONG
            </h2>
          </motion.div>

          {/* Main content */}
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              className="text-center space-y-2 sm:space-y-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="text-white text-lg sm:text-xl font-atbserif tracking-wide">
                SIGN UP TO
              </h3>
              <p className="text-white/80 text-xs sm:text-sm leading-relaxed tracking-wide px-2">
                Avail 10% discount on your first order when you sign up!
              </p>
            </motion.div>

            {/* Sign in with Google button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full bg-white hover:bg-white/95 text-black font-medium py-5 sm:py-6 flex items-center justify-center gap-2 sm:gap-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
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
