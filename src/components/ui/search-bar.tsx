"use client";

import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useTypewriter } from "@/hooks/useTypewriter";
import toast from "react-hot-toast";

interface SearchBarProps {
  variant?: "navbar" | "page";
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchBar({
  variant = "navbar",
  onSearch,
  className = "",
  autoFocus = false,
}: SearchBarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const words =
    variant === "navbar"
      ? ["brands", "people", "spaces"]
      : ["What do I style?"];

  const { displayText } = useTypewriter({
    prefix: variant === "navbar" ? "Search for " : "",
    words,
    typingSpeed: 100,
    deletingSpeed: 50,
    delayBetweenWords: 2000,
  });

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        if (onSearch) {
          onSearch(searchQuery);
        } else {
          // Check if query matches brands, people, or spaces (case-insensitive)
          const query = searchQuery.toLowerCase();

          if (query.includes("brand")) {
            router.push(`/styles/brands?q=${encodeURIComponent(searchQuery)}`);
          } else if (query.includes("people")) {
            router.push(`/styles/people?q=${encodeURIComponent(searchQuery)}`);
          } else if (query.includes("space")) {
            router.push(`/styles/spaces?q=${encodeURIComponent(searchQuery)}`);
          } else {
            // Invalid query - redirect to styles with toast
            toast.success(
              "Explore our curated collections: Brands, People & Spaces!"
            );
            router.push("/styles");
          }
          // Clear search after submitting
          setSearchQuery("");
        }
      }
    },
    [searchQuery, router, onSearch]
  );

  const variants = {
    navbar: "w-full px-4 py-3 pl-12 bg-input border border-border rounded-lg",
    page: "w-full h-10 px-4 py-2 pl-4 pr-12 bg-white border border-[#ccc] rounded-sm focus-within:shadow-sm",
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative w-full">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={displayText}
          className={`${variants[variant]} focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground transition-all duration-200`}
          autoFocus={autoFocus}
        />
      </div>
      <motion.button
        type="submit"
        whileHover={variant === "navbar" ? { scale: 1.05 } : {}}
        whileTap={variant === "navbar" ? { scale: 0.95 } : {}}
        className={`absolute ${
          variant === "navbar"
            ? "left-4 text-muted-foreground hover:text-foreground"
            : "right-0 w-10 h-full bg-[#666] hover:bg-[#555] flex items-center justify-center"
        } top-1/2 -translate-y-1/2 transition-colors duration-200`}
      >
        <Search
          className={variant === "navbar" ? "w-5 h-5" : "w-5 h-5 text-white"}
        />
      </motion.button>
    </form>
  );
}
