export default function HeroSection() {
  return (
    <div className="w-full h-full flex flex-col justify-between py-6 md:py-12 relative z-10 pointer-events-none md:px-8 selection:bg-white selection:text-black">
      {/* Main Text */}
      <div className="flex flex-col flex-1 justify-center w-full pointer-events-auto mt-12 mb-12">
        <h1 
          className="text-[#f1efdf] font-normal uppercase leading-[0.8] tracking-tighter m-0 p-0"
          style={{ fontSize: "clamp(5rem, 18vw, 30rem)" }}
        >
          Luuk
        </h1>
        <h1 
          className="text-[#f1efdf] font-normal uppercase leading-[0.8] tracking-tighter m-0 p-0"
          style={{ fontSize: "clamp(5rem, 18vw, 30rem)" }}
        >
          Steijaert
        </h1>
      </div>

      {/* Bottom Footer */}
      <div className="w-full flex flex-col mt-auto pointer-events-auto">
        <div className="w-full h-px bg-zinc-700/50 mb-4"></div>
        <div className="flex justify-end items-start w-full text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">
          
          <div className="text-right flex flex-col gap-1 items-end">
            
            <div className="mt-1 flex items-center gap-2">
              <span className="animate-bounce inline-block text-[#f1efdf]">↓</span> Scroll to tune in
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
