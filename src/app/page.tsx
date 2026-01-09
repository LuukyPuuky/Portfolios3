import Navigation from "@/components/navBar";

import FluidBackground from "@/components/Fluidbackground";
import Skills from "@/components/Skills";

import localFont from "next/font/local";
import AboutMe from "@/components/AboutMe";
import ThreeScene from "@/components/TorusScene";
import WorkSection from "@/components/WorkSection";
import ContactForm from "@/components/contact";
import Footer from "@/components/footer";

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
        className="relative w-screen min-h-screen md:h-screen bg-linear-to-bl from-black to-primary overflow-hidden flex flex-col md:flex-row"
      >
        <div className="relative w-full md:w-1/2 h-[50vh] md:h-full">
          <ThreeScene />
        </div>
        <div className="relative z-10 w-full md:w-1/2 h-auto md:h-full flex items-center">
          <AboutMe />
        </div>
      </section>
      <section
        className="relative w-screen h-screen bg-linear-to-bl from-black to-primary overflow-hidden  md:flex-row"
        id="work"
      >
        <div
          className={` mt-20 flex items-center justify-center  bg-transparent text-4xl text-white ${avantt.className}`}
        >
          My Work
        </div>
        <WorkSection />
      </section>
      <section id="skills">
        <Skills />
      </section>

      <section
        id="contact"
        className="w-screen h-screen bg-neutral-900 overflow-hidden  md:flex-row"
      >
        <ContactForm />
      </section>
      <div className="bg-neutral-900">
        <Footer />
      </div>
    </>
  );
}
