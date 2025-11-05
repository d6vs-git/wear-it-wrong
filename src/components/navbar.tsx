// "use client";

// import { useEffect, useState } from "react";
// import { Search, Heart, ShoppingCart } from "lucide-react";
// import Link from "next/link";

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const offset = window.scrollY;
//       setIsScrolled(offset > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         isScrolled
//           ? "bg-background/95 backdrop-blur-sm shadow-sm"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo - Left side */}
//           <Link href="/" className="text-2xl font-bold text-foreground">
//             WearItWrong
//           </Link>

//           {/* Icons - Right side */}
//           <div className="flex items-center space-x-6">
//             {/* Search Icon */}
//             <button className="nav-icon group">
//               <Search className="w-6 h-6 transition-all duration-200 group-hover:scale-110 group-hover:opacity-80" />
//             </button>

//             {/* Wishlist Icon */}
//             <button className="nav-icon group">
//               <Heart className="w-6 h-6 transition-all duration-200 group-hover:scale-110 group-hover:opacity-80" />
//             </button>

//             {/* Cart Icon */}
//             <button className="nav-icon group relative">
//               <ShoppingCart className="w-6 h-6 transition-all duration-200 group-hover:scale-110 group-hover:opacity-80" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
"use client";

import { Search, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left spacer for mobile - keeps logo centered */}
          <div className="flex-1 flex md:hidden" />

          {/* Center - Brand Name */}
          <Link href="/" className="flex-shrink-0">
            <motion.h1
              className="font-badtyp text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors duration-300"
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

            {/* Wishlist Icon */}
            <motion.button
              className="relative p-2 rounded-full hover:bg-muted transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
              {/* Optional: Wishlist count badge */}
              {/* <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                3
              </span> */}
            </motion.button>

            {/* Cart Icon */}
            <motion.button
              className="relative p-2 rounded-full hover:bg-muted transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
              {/* Optional: Cart count badge */}
              {/* <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                2
              </span> */}
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
          <div className="relative">
            <input
              type="text"
              placeholder="Search for styles, brands, or services..."
              className="w-full px-4 py-3 pl-12 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground"
              autoFocus={isSearchOpen}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </motion.div>
    </nav>
  );
}
