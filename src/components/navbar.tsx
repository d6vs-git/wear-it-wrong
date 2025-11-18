"use client";

import { Search, Menu, X, LogOut, ArrowLeft } from "lucide-react";
import Link from "next/link";
import RiMenu3LineIcon from "remixicon-react/Menu3LineIcon";
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

  const navLinks = [
    { label: "About Us", href: "/about" },
    { label: "All Services", href: "/unified-services" },
    { label: "Testimonials", href: "/testimonials" },
  ];

  if (status === "loading") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16 md:h-20 w-full">

          {/* Left — Back Button */}
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

          {/* Center — Logo */}
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

          {/* Right — Search + Auth + Menu */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 md:gap-4 shrink-0 w-1/3">

            {/* Search */}
            <motion.button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="relative p-2 rounded-full hover:bg-muted transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Search className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
            </motion.button>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {status === "authenticated" ? (
                <>
                  {/* Profile */}
                  <div className="flex items-center justify-center rounded-full border-2 border-border bg-background p-1 ">
                    {avatar ? (
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
                    className="
                      px-4 py-2 rounded-full border-2 border-border 
                      hover:border-red-500 hover:bg-red-50 
                      transition-all duration-200 
                      text-sm font-medium tracking-wide
                    "
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                  </motion.button>
                </>
              ) : (
                <motion.button
                  onClick={() => signIn("google")}
                  className="
                    bg-primary text-primary-foreground px-4 py-2 rounded-lg 
                    font-semibold hover:bg-primary/90 transition-all duration-200 
                    font-badtyp text-sm md:text-base whitespace-nowrap tracking-wide
                  "
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="p-2 rounded-md hover:bg-muted transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
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

      {/* ⭐ Redesigned Mobile Dropdown Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden border-t border-border/20 backdrop-blur-xl shadow-2xl"
        style={{ pointerEvents: isMobileMenuOpen ? "auto" : "none" }}
      >
        <div className="w-full h-screen flex flex-col items-center justify-start pt-10">

          {/* ⭐ Nav Links */}
          <div className="w-full flex flex-col items-center space-y-4">
            {navLinks.map((link, index) => (
              <div key={link.href} className="w-full">
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full"
                >
                  <motion.div
                    className="
                      relative w-full text-center 
                      px-10 py-5 text-xl md:text-2xl font-badtyp 
                      cursor-pointer text-foreground/90 
                      hover:text-foreground transition-all duration-500
                      group overflow-hidden
                    "
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="
                      absolute left-1/2 -translate-x-1/2 bottom-0 
                      h-[2px] w-0 bg-primary 
                      group-hover:w-3/4 
                      transition-all duration-500 ease-out
                    "></div>

                    <span className="relative z-10 group-hover:tracking-wide transition-all">
                      {link.label}
                    </span>
                  </motion.div>
                </Link>

                {/* Divider */}
                {index < navLinks.length - 1 && (
                  <div className="w-full flex justify-center">
                    <div className="w-3/4 border-b border-border/25"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ⭐ Auth Section (Mobile Only) */}
          <div className="w-full mt-10 pt-5 border-t border-border/20 flex flex-col items-center">
            {status === "authenticated" ? (
              <>
                <div className="flex flex-col items-center gap-3">
                  {avatar && (
                    <img
                      src={avatar}
                      alt={name}
                      className="h-16 w-16 rounded-full object-cover shadow-lg border border-border/40"
                    />
                  )}
                  <span className="text-lg font-medium text-foreground/90 font-badtyp">
                    {name}
                  </span>
                </div>

                {/* Beautiful Sign Out Button */}
                <motion.button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="
                    lg:hidden
                    mt-6 px-10 py-4  
                    bg-primary font-badtyp
                    text-primary-foreground rounded-lg  font-semibold 
                    shadow-md hover:shadow-xl 
                    hover:brightness-110
                    transition-all duration-300 tracking-wider text-sm
                  "
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  Sign Out
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={() => {
                  signIn("google");
                  setIsMobileMenuOpen(false);
                }}
                className="
                  md:hidden
                  mt-6 w-3/4 text-center 
                  bg-primary text-primary-foreground 
                  px-10 py-4 rounded-lg 
                  font-semibold text-lg shadow-lg 
                  hover:bg-primary/90 hover:shadow-xl 
                  transition-all duration-300 font-badtyp
                  tracking-wider
                "
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                Get Started
              </motion.button>
            )}
          </div>

        </div>
      </motion.div>
    </nav>
  );
}
