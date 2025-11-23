"use client";

import { Search, X, LogOut, ArrowLeft } from "lucide-react";
import RiMenu3LineIcon from "remixicon-react/Menu3LineIcon";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import SearchBar from "@/components/ui/search-bar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "All Services", href: "/unified-services" },
  { label: "Testimonials", href: "/testimonials" },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = status === "authenticated";
  const isHomePage = pathname === "/";
  const avatar = session?.user?.image;
  const name = session?.user?.name ?? "User";
  const initial = name.charAt(0).toUpperCase();

  if (status === "loading") return null;

  const handleSignOut = () => {
    signOut();
    setIsMobileMenuOpen(false);
  };

  const handleSignIn = () => {
    signIn("google");
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left Side - Back Button or Logo */}
          <div className="flex items-center shrink-0 w-1/3">
            {!isHomePage ? (
              <motion.button
                onClick={() => router.back()}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
              </motion.button>
            ) : (
              <Link href="/" className="flex items-center h-full">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Image
                    src="/assets/logo/logo-navbar.png"
                    alt="Wear It Wrong Logo"
                    width={150}
                    height={75}
                    className="w-32 sm:w-40 md:w-48 lg:w-52 h-auto"
                    priority
                  />
                </motion.div>
              </Link>
            )}
          </div>

          {/* Center - Logo (only on non-homepage) */}
          {!isHomePage && (
            <div className="flex items-center justify-center shrink-0 w-1/3">
              <Link href="/" className="flex items-center h-full">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Image
                    src="/assets/logo/logo-navbar.png"
                    alt="Wear It Wrong Logo"
                    width={150}
                    height={75}
                    className="w-32 sm:w-40 md:w-48 lg:w-52 h-auto"
                    priority
                  />
                </motion.div>
              </Link>
            </div>
          )}

          {/* Right Icons */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-4 shrink-0 w-1/3">
            {/* Search */}
            <motion.button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Search"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </motion.button>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <div className="rounded-full border-2 border-border bg-background p-1">
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt={name}
                        width={36}
                        height={36}
                        className="h-9 w-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
                        {initial}
                      </div>
                    )}
                  </div>
                  <motion.button
                    onClick={() => signOut()}
                    className="p-2 rounded-full border-2 border-border hover:border-red-500 hover:bg-red-50 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Sign out"
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={() => signIn("google")}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors font-badtyp tracking-wide"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              )}
            </div>

            {/* Menu Toggle */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <RiMenu3LineIcon className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Search Dropdown */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-border bg-background"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <SearchBar variant="navbar" autoFocus />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden border-t border-border/20 backdrop-blur-xl shadow-2xl"
          >
            <div className="h-screen flex flex-col items-center pt-10">
              {/* Nav Links */}
              <div className="w-full flex flex-col items-center space-y-4">
                {NAV_LINKS.map((link, index) => (
                  <div key={link.href} className="w-full">
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full"
                    >
                      <motion.div
                        className="relative w-full text-center px-10 py-5 text-xl md:text-2xl font-badtyp cursor-pointer text-foreground/90 hover:text-foreground transition-colors group"
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-0 bg-primary group-hover:w-3/4 transition-all duration-500" />
                        <span className="relative z-10 group-hover:tracking-wide transition-all">
                          {link.label}
                        </span>
                      </motion.div>
                    </Link>
                    {index < NAV_LINKS.length - 1 && (
                      <div className="w-full flex justify-center">
                        <div className="w-3/4 border-b border-border/25" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Auth */}
              <div className="w-full mt-10 pt-5 border-t border-border/20 flex flex-col items-center">
                {isAuthenticated ? (
                  <>
                    <div className="flex flex-col items-center gap-3">
                      {avatar && (
                        <Image
                          src={avatar}
                          alt={name}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded-full object-cover shadow-lg border border-border/40"
                        />
                      )}
                      <span className="text-lg font-semibold font-badtyp text-foreground/90 tracking-wide">
                        {name}
                      </span>
                    </div>
                    <motion.button
                      onClick={handleSignOut}
                      className="lg:hidden mt-6 px-10 py-4 bg-primary font-badtyp text-primary-foreground rounded-lg font-semibold shadow-md hover:shadow-xl hover:brightness-110 transition-all tracking-wider"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Out
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    onClick={handleSignIn}
                    className="md:hidden mt-6 w-3/4 bg-primary text-primary-foreground px-10 py-4 rounded-lg font-semibold text-lg shadow-lg hover:bg-primary/90 transition-colors font-badtyp tracking-wider"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Get Started
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}