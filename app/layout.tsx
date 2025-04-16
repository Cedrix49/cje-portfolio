import type { Metadata } from "next";
import { Inter, Space_Grotesk, Outfit } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
});

const extenda = localFont({
  src: './fonts/Extenda-80-Peta-trial.woff2',
  variable: '--font-extenda',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My personal portfolio website",
  icons: {
    icon: '/assets/logo.png',
    shortcut: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} ${extenda.variable}`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
