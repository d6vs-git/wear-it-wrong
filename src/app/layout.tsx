import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wear It Wrong - Personal Styling Studio",
  description: "Wear It Wrong - Professional personal styling and wardrobe transformation services",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
