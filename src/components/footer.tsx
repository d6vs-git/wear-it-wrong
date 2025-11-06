// "use client";
// import Link from "next/link";

// const Footer = () => {
//   const footerLinks = [
//     { title: "About Us", href: "/about-us/#" },
//     { title: "Contact Us", href: "/contact-us/#" },
//     { title: "FAQ", href: "/faq/#" },
//     { title: "Help Centre", href: "/help-centre/#" },
//     { title: "Privacy Policy", href: "/privacy-policy/#" },
//     { title: "Collaborate with Us", href: "/collaborate/#" },
//     { title: "Terms and Conditions", href: "/terms" },
//     { title: "Gift Card", href: "/gift-card" },
//   ];

//   return (
//     <footer className="bg-background border-t border-border">
//       <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {/* Quick Links Section */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-foreground">
//               Quick Links
//             </h3>
//             <ul className="space-y-2">
//               {footerLinks.map((link) => (
//                 <li key={link.href}>
//                   <Link
//                     href={link.href}
//                     className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
//                   >
//                     {link.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter Section */}
//           <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
//             <h3 className="text-lg font-semibold text-foreground">
//               Newsletter
//             </h3>
//             <div className="flex flex-col space-y-2">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="px-4 py-2 bg-input text-foreground rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
//                 aria-label="Email for newsletter"
//               />
//               <button
//                 type="submit"
//                 className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-200"
//               >
//                 Subscribe
//               </button>
//             </div>
//           </form>
//         </div>

//         {/* Bottom Section */}
//         <div className="mt-12 pt-8 border-t border-border">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <p className="text-sm text-muted-foreground">
//               © 2025 WEAR-IT-WRONG. All rights reserved.
//             </p>
//             <div className="flex space-x-6">
//               <Link
//                 href="/terms"
//                 className="text-muted-foreground hover:text-foreground transition-colors duration-200"
//               >
//                 Terms
//               </Link>
//               <Link
//                 href="/privacy"
//                 className="text-muted-foreground hover:text-foreground transition-colors duration-200"
//               >
//                 Privacy
//               </Link>
//               <Link
//                 href="/cookies"
//                 className="text-muted-foreground hover:text-foreground transition-colors duration-200"
//               >
//                 Cookies
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
// ----------------------------------------------------
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

export default function Footer() {
  // Dynamic footer sections
  const informationLinks = [
    { title: "About Us", href: "/about-us" },
    { title: "Contact Us", href: "/contact-us" },
    { title: "Releases", href: "/releases" },
    { title: "Store Locator", href: "/store-locator" },
    { title: "Brands", href: "/brands" },
    { title: "Blogs", href: "/blogs" },
  ];

  const importantLinks = [
    { title: "Help Center", href: "/help-centre" },
    { title: "FAQ", href: "/faq" },
    { title: "Privacy Policy", href: "/privacy-policy" },
    { title: "Collaborate with Us", href: "/collaborate" },
    { title: "Return & Exchange", href: "/returns" },
    { title: "Terms & Conditions", href: "/terms" },
    { title: "Order & Shipping", href: "/shipping" },
  ];

  const footerLinks = [
    { title: "Gift Card", href: "/gift-card" },
    { title: "Career", href: "/career" },
  ];

  return (
    <footer className="bg-background border-t border-border mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-foreground">
          {/* INFORMATION */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary uppercase tracking-wider">
              Information
            </h3>
            <ul className="space-y-3 text-sm">
              {informationLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* IMPORTANT LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary uppercase tracking-wider">
              Important Links
            </h3>
            <ul className="space-y-3 text-sm">
              {importantLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary uppercase tracking-wider">
              Newsletter
            </h3>
            <p className="text-sm mb-4 text-muted-foreground">
              Subscribe to our newsletter to get the latest updates, offers, and
              style drops.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center bg-input border border-border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary"
            >
              <input
                type="email"
                placeholder="Email Address"
                className="flex-grow px-3 py-2 bg-transparent text-sm focus:outline-none"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors duration-200"
              >
                Subscribe
              </motion.button>
            </form>

            {/* SOCIAL MEDIA */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide mb-3 text-primary">
                Social Media
              </h4>
              <div className="flex items-center gap-4">
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="p-2 rounded-full border border-border hover:bg-muted transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5 text-foreground" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        {/* OPTIONAL EXTRA LINKS BELOW */}
        {footerLinks.length > 0 && (
          <div className="mt-10">
            <ul className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              {footerLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* COPYRIGHT */}
        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Your Brand Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
