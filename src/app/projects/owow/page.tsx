import React from "react";
import AnimatedLink from "@/components/AnimatedLink";
import InfiniteScroller from "@/components/InfiniteScroller";

const Page = () => {
  return (
    <>

      <main className="flex flex-col-reverse md:flex-row min-h-screen bg-linear-to-bl from-black to-primary text-white overflow-hidden">
        
        {/* Left Section - Infinite Scrolling Placeholders */}
        <section className="w-full md:w-1/2 h-[50vh] md:h-screen md:border-r border-white/10 relative p-6 md:p-12 selection:bg-white selection:text-black">
          <InfiniteScroller speed={0.5}>
            <div className="w-full aspect-[4/3] bg-white/5 rounded flex items-center justify-center text-sm font-bold uppercase tracking-widest text-white/30">
              Image Placeholder
            </div>
            <div className="w-full aspect-square bg-white/5 rounded flex items-center justify-center text-sm font-bold uppercase tracking-widest text-white/30">
              Image Placeholder
            </div>
            <div className="w-full aspect-video bg-white/5 rounded flex items-center justify-center text-sm font-bold uppercase tracking-widest text-white/30">
              Image Placeholder
            </div>
            <div className="w-full aspect-[4/5] bg-white/5 rounded flex items-center justify-center text-sm font-bold uppercase tracking-widest text-white/30">
              Image Placeholder
            </div>
          </InfiniteScroller>
        </section>

        {/* Right Section - Text Info */}
        <section className="w-full md:w-1/2 min-h-[50vh] md:min-h-screen flex flex-col justify-between p-6 md:p-12 relative z-10 selection:bg-white selection:text-black">
          {/* Top */}
          <div className="flex justify-between items-start w-full gap-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none break-words max-w-[80%]">
              Project OWOW
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
            <div className="flex-1 space-y-4">
              <h3 className="text-xs font-semibold tracking-widest uppercase mb-6 text-white/50">
                Info
              </h3>
              <p className="font-bold text-sm md:text-base leading-snug uppercase max-w-sm">
                Project OWOW is a web development initiative focused on building scalable, performant web applications.
              </p>
            </div>

            {/* Details column */}
            <div className="flex-1 space-y-12">
              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/50">
                  Role
                </h3>
                <ul className="space-y-1 font-bold text-sm md:text-base uppercase">
                  <li>Frontend Dev</li>
                  <li>System Architecture</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/50">
                  Awards
                </h3>
                <p className="font-bold text-sm md:text-base uppercase">N/A</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-semibold tracking-widest uppercase mb-4 text-white/50">
                  Dev
                </h3>
                <p className="font-bold text-sm md:text-base uppercase underline underline-offset-4 decoration-2">
                  Luuk Steijaert
                </p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex justify-between items-end mt-16">
            <div className="text-xl md:text-2xl font-medium tracking-tight">
              
            </div>
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
