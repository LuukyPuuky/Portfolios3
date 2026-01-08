'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Marquee() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.marquee').forEach((el, index) => {
        const track = el.querySelector('.track');
        if (!track) return;

        const [x, xEnd] = index % 2 === 0 ? [-500, -1500] : [-500, 0];

        gsap.fromTo(track, { x }, {
          x: xEnd,
          scrollTrigger: {
            trigger: el,
            scrub: 1,
            start: 'top bottom',
            end: 'bottom top',
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const lines = ['Boop', 'Beep', 'Baap', 'Biip', 'Buup'];

  const Marquees = () =>
    lines.map((word, i) => (
      <div
        key={i}
        className="marquee relative h-[calc(170px+4rem)] w-screen overflow-hidden border-b border-zinc-700 text-[clamp(4.5rem,3.64rem+4.29vw,9rem)] font-bold text-zinc-500"
      >
        <div className="track absolute whitespace-nowrap py-8 will-change-transform">
          {word}.{word}.{word}.
          <span className="text-gradient animate-gradient font-black">
            {word}.
          </span>
          {word}.{word}.{word}.{word}.{word}.{word}.{word}.
        </div>
      </div>
    ));

  return (
    <div
      ref={rootRef}
      className="relative min-h-[400vh] bg-zinc-950 pt-[20vh] font-sans"
    >
      <div className="relative flex items-center justify-center">
        <div className="relative">

          <div className="absolute bottom-full left-0 right-0 h-[80vh] w-screen overflow-hidden">
            <div className="h-full translate-y-full">
              <Marquees />
            </div>
          </div>

          <div className="h-[80vh] w-screen overflow-hidden">
            <Marquees />
          </div>

          <div className="absolute top-full left-0 right-0 h-[80vh] w-screen overflow-hidden">
            <Marquees />
          </div>

        </div>
      </div>
    </div>
  );
}


