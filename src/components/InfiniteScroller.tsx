"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";

interface InfiniteScrollerProps {
  children: React.ReactNode;
  speed?: number; // default speed for auto-scroll
}

export default function InfiniteScroller({ children, speed = 0.5 }: InfiniteScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const xMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursor = useRef<gsap.QuickToFunc | null>(null);

  useLayoutEffect(() => {
    if (cursorRef.current) {
      xMoveCursor.current = gsap.quickTo(cursorRef.current, "left", {
        duration: 0.5,
        ease: "power3",
      });
      yMoveCursor.current = gsap.quickTo(cursorRef.current, "top", {
        duration: 0.5,
        ease: "power3",
      });
    }

    let animationFrameId: number;
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const set1 = content.children[0] as HTMLElement;
    let setHeight = 0;

    const updateHeight = () => {
      const gap = parseFloat(window.getComputedStyle(content).gap) || 0;
      setHeight = set1.getBoundingClientRect().height + gap;
    };

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.observe(set1);
    updateHeight();

    const update = () => {
      if (setHeight > 0) {
        // Apply friction to the scroll velocity
        velocityRef.current *= 0.9;
        
        // When velocity drops below a tiny threshold, clamp to 0 
        // to prevent endless micro-movements processing
        if (Math.abs(velocityRef.current) < 0.01) {
          velocityRef.current = 0;
        }

        const movement = speed + velocityRef.current;
        offsetRef.current -= movement;

        // Wrap logic
        // If scrolled down enough, wrap the top element to the bottom seamlessly
        if (offsetRef.current <= -setHeight) {
          offsetRef.current += setHeight;
        }
        // If scrolled up enough, wrap the bottom sequence to the top
        if (offsetRef.current > 0) {
          offsetRef.current -= setHeight;
        }

        content.style.transform = `translateY(${offsetRef.current}px)`;
      }
      
      animationFrameId = requestAnimationFrame(update);
    };
    
    // Start animation loop
    animationFrameId = requestAnimationFrame(update);

    // Event listeners for manually speeding up/interacting with the scroll
    const onWheel = (e: WheelEvent) => {
      velocityRef.current += e.deltaY * 0.05;
    };
    
    let lastY = 0;
    const onTouchStart = (e: TouchEvent) => {
      lastY = e.touches[0].clientY;
      velocityRef.current = 0; 
    };
    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = lastY - currentY; // positive when swiping up
      velocityRef.current += deltaY * 0.15;
      lastY = currentY;
    };

    container.addEventListener("wheel", onWheel, { passive: true });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
    };
  }, [speed]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full overflow-hidden relative touch-none cursor-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={(e) => {
        if (xMoveCursor.current && yMoveCursor.current) {
          xMoveCursor.current(e.clientX);
          yMoveCursor.current(e.clientY);
        }
      }}
    >
      <div ref={contentRef} className="w-full flex-col flex gap-12 will-change-transform">
        <div className="flex flex-col gap-12 shrink-0">{children}</div>
        <div className="flex flex-col gap-12 shrink-0" aria-hidden="true">{children}</div>
      </div>

      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white text-xs font-bold uppercase tracking-widest pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out ${isHovering ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      >
        Scroll
      </div>
    </div>
  );
}
