import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Startup from "@/components/Startup";
import PharmaTech from "@/components/PharmaTech";
import Contact from "@/components/Contact";
import { SHOW_QEDENCE } from "@/lib/visibility";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        {/* Qedence section stays in the code; hidden while SHOW_QEDENCE is false */}
        {SHOW_QEDENCE && <Startup />}
        <PharmaTech />
        <Contact />
      </main>
    </>
  );
}
