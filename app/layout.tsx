import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Temper",
  description: "빠른 주변 카페 탐색",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "flex items-center justify-center bg-background font-sans antialiased",
        fontSans.variable
      )}>
        <div className="w-full max-w-md">
          {children}
        </div>
      </body>
    </html>
  );
}
