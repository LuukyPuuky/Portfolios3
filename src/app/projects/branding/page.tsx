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
            <Image src="/BrandguideBoris.png" width={1000} height={1000} alt="Brand Guide Boris" className="w-full h-auto rounded overflow-hidden" />
            <Image src="/Kleuren.png" width={1000} height={1000} alt="Branding Colors" className="w-full h-auto rounded overflow-hidden" />
            <Image src="/MissieBrandguide.png" width={1000} height={1000} alt="Brand Guide Mission" className="w-full h-auto rounded overflow-hidden" />
            <Image src="/Mockups.png" width={1000} height={1000} alt="Branding Mockups" className="w-full h-auto rounded overflow-hidden" />
          </InfiniteScroller>
        </section>

        {/* Right Section - Text Info */}
        <section className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen flex flex-col justify-between p-6 md:p-12 relative z-10 selection:bg-white selection:text-black">
          {/* Top */}
          <div className="flex justify-between items-start w-full gap-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none wrap-break-word max-w-[80%]">
              Branding
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
                <p className="font-bold text-sm md:text-base leading-snug  max-w-sm">
                  Creating a Brandguide for Boris Schmidt. The goal was to create a brandguide that fit his personality and his work. 
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/50">
                  The Assignment
                </h3>
                <p className="font-bold text-sm md:text-base leading-snug max-w-sm text-white/80">
                  Develop a strong visual identity and a complete brand guide that accurately reflects the essence of Boris and his creative vision.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/50">
                  What I&apos;ve Learned
                </h3>
                <p className="font-bold text-sm md:text-base leading-snug max-w-sm text-white/80">
                  I learned how to translate a personality into a fitting brand with consistent colors, typography, and practical visual applications (mockups).
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
                  <li>Concept</li>
                  <li>Art Direction</li>
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
              href="https://www.figma.com/proto/EK9EOAI5VEAANG395V9M2w/Project-1--Branding?page-id=268%3A2&node-id=444-584&starting-point-node-id=444%3A584&t=DCsMkKgfuuESkufG-1"
              className="text-xl md:text-2xl font-medium tracking-tight hover:opacity-50 transition-opacity"
              target="_blank"
            >
              Figma 
            </AnimatedLink>
            <AnimatedLink
              href="/projects/owow"
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
