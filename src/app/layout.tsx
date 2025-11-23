import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import Navbar from "@/components/ui/navbar";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Wear It Wrong",
  description:
    "Wear It Wrong is a creative styling studio that helps people, brands, and spaces find their expression and look good doing it.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col">
        <AuthProvider>
          <Navbar/>
          <main className="flex-1">{children}</main>
        </AuthProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
