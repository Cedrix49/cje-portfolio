import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stack } from "@/components/Stack";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import  Chatbot  from "@/components/Chatbot";

export default function Home() {
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
