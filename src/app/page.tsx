import Navigation from "@/components/navBar";

import FluidBackground from "@/components/Fluidbackground";
import AboutmeSection from "@/components/AboutmeSection";
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
        <Navigation />
        <FluidBackground />
      </section>
      <AboutmeSection />
    </>
  );
}
