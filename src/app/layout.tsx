import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./mobile-optimizations.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Flame Kitchen | Premium Street Gourmet",
  description: "Where fire meets flavor. Experience luxury street food crafted with passion, served with perfection. Award-winning gourmet burgers, pizza, sushi, and more.",
  keywords: ["restaurant", "gourmet", "street food", "luxury dining", "burgers", "pizza", "sushi"],
  authors: [{ name: "Flame Kitchen" }],
  openGraph: {
    title: "Flame Kitchen | Premium Street Gourmet",
    description: "Where fire meets flavor. Experience luxury street food crafted with passion.",
    type: "website",
    locale: "en_US",
    siteName: "Flame Kitchen",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flame Kitchen | Premium Street Gourmet",
    description: "Where fire meets flavor. Experience luxury street food crafted with passion.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
