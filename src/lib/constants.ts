// information of the protfolio , so that it can be used across the application and meta data 

//information about the site

//site conifiguration

//infomation about the site


// social media handles and other constants

//policies and all

export const SITE_CONFIG = {
  // Basic site information
  siteName: "Your Name | Portfolio",
  siteDescription:
    "A passionate Frontend Developer specializing in React, Next.js, and modern web technologies.",
  siteUrl: "https://yourportfolio.com", // replace with your real domain

  // Personal details
  name: "Your Name",
  jobTitle: "Frontend Developer",
  bio: "Frontend engineer focused on performance, accessibility, and DX. I build fast, delightful web experiences with React, Next.js, and TypeScript.",
  email: "your.email@example.com",

  // Social links
  socialLinks: {
    github: "https://github.com/yourusername",
    linkedin: "https://www.linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    instagram: "",
    youtube: "",
  },

  // SEO defaults
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Performance",
    "Accessibility",
    "Portfolio",
  ],
  ogImage: "/og-image.png", // relative path to a default OG image
} as const;

export type SocialLinks = typeof SITE_CONFIG.socialLinks;