"use client";
import Link from "next/link";

const Footer = () => {
  const footerLinks = [
    { title: "About Us", href: "/about-us/#" },
    { title: "Contact Us", href: "/contact-us/#" },
    { title: "FAQ", href: "/faq/#" },
    { title: "Help Centre", href: "/help-centre/#" },
    { title: "Privacy Policy", href: "/privacy-policy/#" },
    { title: "Collaborate with Us", href: "/collaborate/#" },
    { title: "Terms and Conditions", href: "/terms" },
    { title: "Gift Card", href: "/gift-card" },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <h3 className="text-lg font-semibold text-foreground">
              Newsletter
            </h3>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-input text-foreground rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity duration-200"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 WEAR-IT-WRONG. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
