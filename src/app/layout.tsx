import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import Navbar from "@/components/ui/navbar";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import FooterRender from "@/utils/footerRender";
import Footer from "@/components/ui/footer";

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
      <body className="bg-background text-foreground overflow-x-hidden flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar/>
          <main className="flex-1">{children}</main>
        </AuthProvider>
        <Toaster position="top-center" />
        <Suspense fallback={null}>
          <FooterRender />
        </Suspense>
      </body>
      
    </html>
  );
}
