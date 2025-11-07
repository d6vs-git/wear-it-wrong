import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import { Toaster } from "react-hot-toast";
import ConditionalNavbar from "@/components/ConditionalNavbar";

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
    <html lang="en" className="overflow-x-hidden">
      <body className="overflow-x-hidden h-screen">
        <AuthProvider>
          <div className="h-screen flex flex-col overflow-hidden">
            <ConditionalNavbar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 5000,
              style: {
                fontSize: "16px",
                maxWidth: "500px",
              },
              success: {
                style: {
                  background: "#d4edda",
                  color: "#155724",
                  fontWeight: "600",
                  border: "2px solid #c3e6cb",
                },
                iconTheme: {
                  primary: "#28a745",
                  secondary: "#fff",
                },
              },
              error: {
                style: {
                  background: "#f8d7da",
                  color: "#721c24",
                  fontWeight: "600",
                  border: "2px solid #f5c6cb",
                },
                iconTheme: {
                  primary: "#dc3545",
                  secondary: "#fff",
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
