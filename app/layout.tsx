import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwiftCart",
  description: "Demo Project - Ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} scrollbar-hidden scroll-smooth!`}>
          <Navbar />
          <Separator className="hidden sm:block" decorative />
          <main className="scrollbar-hidden">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
