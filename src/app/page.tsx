import Navigation from "@/components/navBar";

import FluidBackground from "@/components/Fluidbackground";
import Skills from "@/components/Skills";
import VerticalScrollSection from "@/components/VerticalScrollSection";
import localFont from "next/font/local";
import AboutMe from "@/components/AboutMe";
import ThreeScene from "@/components/TorusScene";

const avantt = localFont({
  src: "./fonts/Avantt-Bold.otf",
  weight: "700",
});
export default function Home() {
  return (
    <>
      <section
        id="home"
        className={`h-screen flex items-center justify-center p-6 bg-transparent ${avantt.className}`}
      >
        <section>
          <FluidBackground />
        </section>
        <Navigation />
      </section>
      <section
        id="about"
        className="relative w-screen h-screen bg-linear-to-bl from-black to-primary overflow-hidden flex flex-col md:flex-row"
      >
        <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
          <ThreeScene />
        </div>
        <div className="w-full md:w-1/2 h-1/2 md:h-full overflow-y-auto flex items-center">
          <AboutMe />
        </div>
      </section>

      <section id="skills">
        <Skills />
      </section>
      <VerticalScrollSection />
    </>
  );
}
