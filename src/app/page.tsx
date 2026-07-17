import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Startup from "@/components/Startup";
import PharmaTech from "@/components/PharmaTech";
import ResumeViewer from "@/components/ResumeViewer";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

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
        <Startup />
        <PharmaTech />
        <ResumeViewer />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
