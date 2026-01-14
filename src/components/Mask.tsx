"use client";

import { useEffect, useRef } from "react";

type MaskState = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export default function VideoMask() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hudRef = useRef<HTMLDivElement | null>(null);
  const masksRef = useRef<HTMLDivElement[]>([]);
  const state = useRef<Map<HTMLDivElement, MaskState>>(new Map());

  useEffect(() => {
    const container = containerRef.current!;
    const video = videoRef.current!;
    const hud = hudRef.current!;
    const masks = masksRef.current;

    let isHoveringMask = false;
    let zIndexCounter = 10;
    let hasInitialized = false;

    // ---------------- HUD ----------------
    const onMouseMove = (e: MouseEvent) => {
      if (!isHoveringMask) {
        hud.innerHTML = `X: ${e.clientX}px<br/>Y: ${e.clientY}px`;
      }
      hud.style.transform = `translate3d(${e.clientX + 2}px, ${
        e.clientY + 2
      }px, 0)`;
    };
    document.addEventListener("mousemove", onMouseMove);

    // ---------------- Helpers ----------------
    const updateCoords = (mask: HTMLDivElement) => {
      const s = state.current.get(mask)!;
      mask.querySelector(".coords")!.textContent = `X: ${Math.round(
        s.x
      )}px Y: ${Math.round(s.y)}px`;
    };

    const drawClipped = (ctx: CanvasRenderingContext2D, rect: MaskState) => {
      if (!video.videoWidth || !video.videoHeight) return;

      const videoAspect = video.videoWidth / video.videoHeight;
      const containerRect = container.getBoundingClientRect();
      const containerAspect = containerRect.width / containerRect.height;

      let dw, dh, dx, dy;

      if (videoAspect > containerAspect) {
        dh = containerRect.height;
        dw = dh * videoAspect;
        dx = (containerRect.width - dw) / 2;
        dy = 0;
      } else {
        dw = containerRect.width;
        dh = dw / videoAspect;
        dx = 0;
        dy = (containerRect.height - dh) / 2;
      }

      const scaleX = video.videoWidth / dw;
      const scaleY = video.videoHeight / dh;

      ctx.drawImage(
        video,
        (rect.x - dx) * scaleX,
        (rect.y - dy) * scaleY,
        rect.w * scaleX,
        rect.h * scaleY,
        0,
        0,
        rect.w,
        rect.h
      );
    };

    const initMasks = () => {
      const rect = container.getBoundingClientRect();

      masks.forEach((mask) => {
        const s: MaskState = {
          x: Math.random() * (rect.width - mask.offsetWidth),
          y: Math.random() * (rect.height - mask.offsetHeight),
          w: mask.offsetWidth,
          h: mask.offsetHeight,
        };
        state.current.set(mask, s);
        mask.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;

        mask.addEventListener("mouseenter", () => {
          isHoveringMask = true;
          hud.textContent = "GRAB";
        });

        mask.addEventListener("mouseleave", () => {
          isHoveringMask = false;
        });
      });
    };

    const initCanvas = () => {
      masks.forEach((mask) => {
        const s = state.current.get(mask)!;
        const canvas = mask.querySelector("canvas")!;
        canvas.width = s.w;
        canvas.height = s.h;
      });
    };

    const draw = () => {
      masks.forEach((mask) => {
        const s = state.current.get(mask)!;
        const canvas = mask.querySelector("canvas")!;
        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawClipped(ctx, s);
        updateCoords(mask);
      });
      requestAnimationFrame(draw);
    };

    // ---------------- Drag ----------------
    masks.forEach((mask) => {
      let dragging = false;
      let ox = 0,
        oy = 0;

      mask.addEventListener("mousedown", (e) => {
        dragging = true;
        mask.style.zIndex = `${++zIndexCounter}`;
        const s = state.current.get(mask)!;
        ox = e.clientX - s.x;
        oy = e.clientY - s.y;
        mask.style.cursor = "grabbing";
      });

      mask.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        const s = state.current.get(mask)!;
        const rect = container.getBoundingClientRect();
        s.x = Math.min(
          Math.max(e.clientX - rect.left - ox, 0),
          rect.width - s.w
        );
        s.y = Math.min(
          Math.max(e.clientY - rect.top - oy, 0),
          rect.height - s.h
        );
        mask.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      });

      document.addEventListener("mouseup", () => {
        dragging = false;
        mask.style.cursor = "grab";
      });
    });

    // ---------------- Init ----------------
    const init = () => {
      if (hasInitialized) return;
      hasInitialized = true;
      console.log("VideoMask initialized");
      initMasks();
      initCanvas();
      draw();
    };

    video.addEventListener("playing", init);
    if (video.readyState >= 2 || !video.paused) init();
    else video.play().catch(() => {});

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      <div
        ref={hudRef}
        className="pointer-events-none absolute z-50 font-mono text-xs text-white transition"
      />

      <video
        ref={videoRef}
        src="/videomask.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-0 pointer-events-none"
      />

      {[
        "w-[35vw] h-[20vw]",
        "w-[35vw] h-[20vw]",
        "w-[35vw] h-[20vw]",
        "w-[20vw] h-[10vw]",
        "w-[22vw] h-[12vw]",
        "w-[60vw] h-[35vw]",
      ].map((size, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) masksRef.current[i] = el;
          }}
          className={`absolute border border-zinc-600 cursor-grab ${size}`}
        >
          <canvas className="block w-full h-full" />
          <div className="coords absolute -top-5 left-0 bg-zinc-700/70 px-2 py-0.5 font-mono text-xs text-white">
            X: 0px Y: 0px
          </div>
        </div>
      ))}
    </div>
  );
}
