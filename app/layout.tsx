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
    icon: [
      { url: '/assets/favicon.ico' },
      { url: '/assets/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/assets/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/assets/apple-touch-icon.png' },
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ]
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
