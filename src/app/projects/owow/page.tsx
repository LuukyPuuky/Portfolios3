import React from "react";
import AnimatedLink from "@/components/AnimatedLink";
import InfiniteScroller from "@/components/InfiniteScroller";
import Image from "next/image";

const Page = () => {
  return (
    <>

      <main className="flex flex-col-reverse md:flex-row min-h-screen bg-linear-to-bl from-black to-primary text-white overflow-hidden">
        
        {/* Left Section - Infinite Scrolling Placeholders */}
        <section className="w-full md:w-1/2 h-[50vh] md:h-screen md:border-r border-white/10 relative p-6 md:p-12 selection:bg-white selection:text-black">
                  <InfiniteScroller speed={0.5}>
                    <Image src="/owowCreate.png" alt="Owow Create" width={10000} height={1000} className="w-full h-auto rounded overflow-hidden" />
                    <Image src="/owowDashboardpng.png" alt="Owow Dashboard" width={1000} height={1000} className="w-full h-auto rounded overflow-hidden" />
                    <Image src="/owowUpload.png" alt="Owow Upload" width={1000} height={1000} className="w-full h-auto rounded overflow-hidden" />
                    <Image src="/project-owow.png" alt="Owow Billboard" width={1000} height={1000} className="w-full h-auto rounded overflow-hidden" />
                  </InfiniteScroller>
                </section>

        {/* Right Section - Text Info */}
        <section className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen flex flex-col justify-between p-6 md:p-12 relative z-10 selection:bg-white selection:text-black">
          {/* Top */}
          <div className="flex justify-between items-start w-full gap-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none wrap-break-word max-w-[80%]">
              Owow Billboard
            </h1>
            <AnimatedLink
              href="/"
              className="text-lg md:text-xl font-medium tracking-tight hover:opacity-50 transition-opacity"
            >
              Close
            </AnimatedLink>
          </div>

          {/* Middle */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 mt-20 mb-auto">
            {/* INFO column */}
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-6 text-white/50">
                  Info
                </h3>
                <p className="font-semibold text-sm md:text-base leading-snug  max-w-sm">
                 A dashboard for controlling an Owow flipdot billboard display. This project allows you to create, upload, and manage animated content for a 112x16 pixel LED display using pixel-art animations, GIF uploads, and custom animations.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/50">
                  The Assignment
                </h3>
                <p className="font-bold text-sm md:text-base leading-snug max-w-sm text-white/80">
                  Create something to display on the Owow Billboard. My team and I made a web application to control the billboard. The goal was to build an interface for creating and uploading content for the display.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/50">
                  What I&apos;ve Learned
                </h3>
                <p className="font-bold text-sm md:text-base leading-snug max-w-sm text-white/80">
                 I gained experience to work with a client that had their own hardware. It also improved my skills in bridging software applications with external hardware.
                </p>
              </div>

              
            </div>

            {/* Details column */}
            <div className="flex-1 space-y-12">
              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/50">
                  Work
                </h3>
                <ul className="space-y-1 font-bold text-sm md:text-base uppercase">
                  <li>Web Development</li>
                  <li>Design</li>
                </ul>
              </div>

             <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/50">
                  Project Context
                </h3>
                <p className="font-bold text-sm md:text-base leading-snug max-w-sm text-white/80">
                  School project / Concept for client
                </p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex justify-between items-end mt-16">
               <AnimatedLink
              href="https://github.com/LuukyPuuky/OwowProject"
              className="text-xl md:text-2xl font-medium tracking-tight hover:opacity-50 transition-opacity"
              target="_blank"
            >
              Github 
            </AnimatedLink>
            <AnimatedLink
              href="/projects/branding"
              className="text-xl md:text-2xl font-medium tracking-tight hover:opacity-50 transition-opacity"
            >
              Next
            </AnimatedLink>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
