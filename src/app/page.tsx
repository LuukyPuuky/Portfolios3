import Navigation from "@/components/navBar";

import FluidBackground from "@/components/Fluidbackground";
import localFont from "next/font/local";

const avantt = localFont({
  src: "./fonts/Avantt-Bold.otf",
  weight: "700",
});
export default function Home() {
  return (
    <>
      <div
        className={`h-screen flex items-center justify-center p-6 ${avantt.className}`}
      >
        <Navigation />
        <FluidBackground />
      </div>
      <div className="h-screen bg-black"></div>
      <div className="h-screen bg-linear-to-br from-[#0ae448] to-[#0085d0]  w-full  flex items-center justify-center "></div>
    </>
  );
}
