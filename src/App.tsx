import { motion, useScroll, useSpring } from "framer-motion";
import ScrollLine from "./components/ScrollLine";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Achievements from "./components/Achievements";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <>
      <ScrollLine />
      <motion.div className="progress" style={{ scaleX }} />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Achievements />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}
