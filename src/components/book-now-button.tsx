"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

interface BookNowProps {
  label?: string;
  sessionType: string; // Required: the service type being booked
  className?: string;
  ariaLabel?: string;
}

export const BookNowButton = ({
  label = "BOOK NOW",
  sessionType,
  className = "",
  ariaLabel,
}: BookNowProps) => {
  const { status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    // Check if user is logged in
    if (status === "unauthenticated") {
      toast.error("Please sign in to book a session", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#fee",
          color: "#c00",
          fontWeight: "bold",
        },
      });
      return;
    }

    if (status === "loading") {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sessionType }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          data.message || "Booking successful! Check your email for confirmation.",
          {
            duration: 5000,
            position: "top-center",
            style: {
              background: "#d4edda",
              color: "#155724",
              fontWeight: "bold",
              padding: "16px",
              borderRadius: "8px",
            },
            icon: "✅",
          }
        );
      } else {
        toast.error(data.error || "Failed to create booking. Please try again.", {
          duration: 5000,
          position: "top-center",
          style: {
            background: "#f8d7da",
            color: "#721c24",
            fontWeight: "bold",
            padding: "16px",
            borderRadius: "8px",
          },
        });
      }
    } catch (error) {
      console.error("Error booking session:", error);
      toast.error("An error occurred. Please try again.", {
        duration: 5000,
        position: "top-center",
        style: {
          background: "#f8d7da",
          color: "#721c24",
          fontWeight: "bold",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const base = `relative z-50 inline-flex items-center justify-center px-4 sm:px-5 md:px-6 py-2 sm:py-3 text-[#10207A] font-dogmaoutline text-base sm:text-lg md:text-xl lg:text-2xl transition-colors duration-150 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading || status === "loading"}
      aria-label={ariaLabel ?? label}
      className={base}
    >
      {isLoading ? "BOOKING..." : label}
    </button>
  );
};