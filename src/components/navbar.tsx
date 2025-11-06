// "use client";

// import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import Image from "next/image";
// import SearchBar from "@/components/ui/search-bar";

// export default function Navbar() {
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const navLinks = [
//     { name: "Home", href: "/" },
//     { name: "Shop", href: "/shop" },
//     { name: "About", href: "/about" },
//     { name: "Contact", href: "/contact" },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 md:h-20">
//           {/* Logo */}
//           <Link href="/" className="flex items-center">
//             <motion.div
//               className="flex items-center"
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Image
//                 src="/assets/logo/logo-navbar.png"
//                 alt="Logo"
//                 width={140}
//                 height={60}
//                 className="w-24 sm:w-28 md:w-36 h-auto"
//                 priority
//               />
//             </motion.div>
//           </Link>

//           {/* Desktop NavLinks */}
//           <div className="hidden md:flex items-center ml-[10vw] space-x-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 href={link.href}
//                 className="text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
//               >
//                 {link.name}
//               </Link>
//             ))}
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
//             {/* Search */}
//             <motion.button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="relative p-2 rounded-full hover:bg-muted transition-colors duration-200"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               aria-label="Search"
//             >
//               <Search className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
//             </motion.button>

//             {/* Wishlist */}
//             <motion.button
//               className="relative p-2 rounded-full hover:bg-muted transition-colors duration-200"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               aria-label="Wishlist"
//             >
//               <Heart className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
//             </motion.button>

//             {/* Cart */}
//             <motion.button
//               className="relative p-2 rounded-full hover:bg-muted transition-colors duration-200"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.95 }}
//               aria-label="Shopping Cart"
//             >
//               <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
//             </motion.button>

//             {/* Get Started Button (desktop) */}
//             <Link
//               href="/get-started"
//               className="hidden md:inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
//             >
//               Get Started
//             </Link>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2 rounded-md hover:bg-muted transition-colors duration-200"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               aria-label="Toggle menu"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="w-6 h-6" />
//               ) : (
//                 <Menu className="w-6 h-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Search Dropdown */}
//       <motion.div
//         initial={{ height: 0, opacity: 0 }}
//         animate={{
//           height: isSearchOpen ? "auto" : 0,
//           opacity: isSearchOpen ? 1 : 0,
//         }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//         className="overflow-hidden border-t border-border bg-background"
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <SearchBar variant="navbar" autoFocus={isSearchOpen} />
//         </div>
//       </motion.div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileMenuOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="md:hidden bg-background border-t border-border overflow-hidden"
//           >
//             <div className="px-4 py-4 space-y-3">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.name}
//                   href={link.href}
//                   className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   {link.name}
//                 </Link>
//               ))}

//               <Link
//                 href="/get-started"
//                 className="block bg-primary text-primary-foreground text-center py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
//                 onClick={() => setIsMobileMenuOpen(false)}
//               >
//                 Get Started
//               </Link>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// }
"use client";

import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SearchBar from "@/components/ui/search-bar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();
  const avatar = session?.user?.image;
  const name = session?.user?.name ?? "User";

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // 🧩 Prevent flicker during hydration
  if (status === "loading") return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src="/assets/logo/logo-black.png" // Path to your image (public folder or remote)
                alt="Profile picture"
                width={100}
                height={100}
              />
            </motion.h1>
          </Link>

          {/* Right - Icons */}
          <div className="flex-1 flex items-center justify-end gap-3 sm:gap-4 md:gap-6">
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

            {/* Wishlist */}

            {/* ✅ Auth Section */}
            <div className="relative hidden md:block">
              {status === "authenticated" ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-2 py-1 shadow-sm hover:shadow"
                  >
                    {avatar && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatar}
                        alt={name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm font-medium">{name}</span>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-lg border border-black/10 bg-white shadow-md p-2">
                      <div className="px-2 py-2 text-sm space-y-2">
                        <a
                          href="/bookings"
                          className="block rounded px-2 py-1 hover:bg-gray-100"
                        >
                          My Meetings
                        </a>
                        <button
                          onClick={() => signOut()}
                          className="w-full text-left rounded px-2 py-1 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
                >
                  Get Started
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
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

      {/* ✅ Mobile Menu (independent of auth flicker) */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-sm font-medium text-foreground hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Auth in mobile menu */}
              {status === "authenticated" ? (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut();
                  }}
                  className="block w-full bg-primary text-primary-foreground text-center py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
                >
                  Sign out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signIn("google");
                  }}
                  className="block w-full bg-primary text-primary-foreground text-center py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
                >
                  Get Started
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
