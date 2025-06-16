'use client';

import { useState, useEffect } from 'react';
import { PortfolioLoader } from "@/components/PortfolioLoader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stack } from "@/components/Stack";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for initial page load and assets
    const handleLoad = () => {
      // Add a minimum loading time for better UX
      setTimeout(() => setIsLoading(false), 2500);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Show loader while loading
  if (isLoading) {
    return <PortfolioLoader onComplete={() => setIsLoading(false)} />;
  }

  // Show main content after loading
  return (
    <main>
      <Navbar />
      <Hero />
      <Stack />
      <About />
      <Projects />
      <Chatbot />
    </main>
  );
}