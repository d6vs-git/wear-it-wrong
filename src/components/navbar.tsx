"use client";

import { Search, Menu, X, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import SearchBar from "@/components/ui/search-bar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession();
  const avatar = session?.user?.image;
  const name = session?.user?.name ?? "User";

  // Prevent flicker during hydration
  if (status === "loading") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 md:h-20 w-full">
          {/* Left - Back Button */}
          <div className="flex items-center shrink-0 w-1/3">
            <motion.button
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </motion.button>
          </div>

          {/* Center - Logo */}
          <div className="flex items-center justify-center shrink-0 w-1/3">
            <Link href="/" className="flex items-center">
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/assets/logo/logo-navbar.png"
                  alt="Wear It Wrong Logo"
                  width={150}
                  height={75}
                  className="w-32 sm:w-40 md:w-48 lg:w-52 h-auto max-w-full"
                  priority
                />
              </motion.div>
            </Link>
          </div>

          {/* Right - Icons */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-4 shrink-0 w-1/3">
            {/* Search Icon */}
            <motion.button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="relative p-2 rounded-full hover:bg-muted transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Search"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </motion.button>

            {/* Auth Section - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {status === "authenticated" ? (
                <>
                  {/* Profile Icon */}
                  <div className="flex items-center justify-center rounded-full border-2 border-border bg-background p-1">
                    {avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatar}
                        alt={name}
                        className="h-8 w-8 md:h-9 md:w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
                        {name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Logout Button */}
                  <motion.button
                    onClick={() => signOut()}
                    className="px-4 py-2 rounded-full border-2 border-border hover:border-red-500 hover:bg-red-50 transition-all duration-200 text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={() => signIn("google")}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 font-badtyp text-sm md:text-base whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search Dropdown */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isSearchOpen ? "auto" : 0,
          opacity: isSearchOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden border-t border-border bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar variant="navbar" autoFocus={isSearchOpen} />
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden border-t border-border bg-background"
      >
        <div className="px-4 py-4 space-y-3">
          {status === "authenticated" ? (
            <>
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                {avatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatar}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <span className="text-sm font-medium">{name}</span>
              </div>

              <button
                onClick={() => {
                  signOut();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-muted transition-colors text-red-600"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                signIn("google");
                setIsMobileMenuOpen(false);
              }}
              className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 font-badtyp"
            >
              Get Started
            </button>
          )}
        </div>
      </motion.div>
    </nav>
  );
}
