import Navigation from "@/components/navBar";

import FluidBackground from "@/components/Fluidbackground";
import Skills from "@/components/Skills";
import VerticalScrollSection from "@/components/VerticalScrollSection";
import localFont from "next/font/local";

const avantt = localFont({
  src: "./fonts/Avantt-Bold.otf",
  weight: "700",
});
export default function Home() {
  return (
    <>
      <section
        className={`h-screen flex items-center justify-center p-6 bg-transparent ${avantt.className}`}
      >
        <section id="home">
          <FluidBackground />
        </section>
        <Navigation />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <VerticalScrollSection />
    </>
  );
}
