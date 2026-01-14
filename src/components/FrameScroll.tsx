"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const header = headerRef.current;
    const canvasWrap = canvasWrapRef.current;

    // Null checks
    if (!canvas || !header || !canvasWrap) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Canvas setup
    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, rect.width, rect.height);
    };

    setCanvasSize();

    // Load frames
    const frameCount = 250;
    const currentFrame = (index: number) =>
      `/frames/frame_${String(index + 1).padStart(4, "0")}.jpg`;

    const images: HTMLImageElement[] = [];
    // eslint-disable-next-line prefer-const
    let videoFrames = { frame: 0 };
    let imagesToLoad = frameCount;

    const onLoad = () => {
      imagesToLoad--;
      if (imagesToLoad <= 0) {
        renderFrame();
        setupScrollTrigger();
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = currentFrame(i);
      images.push(img);
    }

    // Render function
    const renderFrame = () => {
      const rect = canvas.getBoundingClientRect();
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      const img = images[videoFrames.frame];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const imageAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

      if (imageAspect > canvasAspect) {
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imageAspect;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imageAspect;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      }

      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    };

    // ScrollTrigger setup
    const setupScrollTrigger = () => {
      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: `+=${canvas.getBoundingClientRect().height * 7}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const animationProgress = Math.min(progress / 0.9, 1);
          videoFrames.frame = Math.round(animationProgress * (frameCount - 1));
          renderFrame();

          if (progress <= 0.25) {
            const zProgress = progress / 0.25;
            const translateZ = zProgress * -500;

            let opacity = 1;
            if (progress >= 0.2) {
              const fadeProgress = Math.min((progress - 0.2) / 0.05, 1);
              opacity = 1 - fadeProgress;
            }

            gsap.set(header, {
              transform: `translate(-50%, -50%) translateZ(${translateZ}px)`,
              opacity,
            });
          } else {
            gsap.set(header, { opacity: 0 });
          }
        },
      });

      gsap.to(canvasWrap, {
        scale: 0.8,
        borderRadius: "1.5rem",
        ease: "ease",
        scrollTrigger: {
          trigger: ".hero",
          start: "50% top",
          end: "90% top",
          scrub: true,
        },
      });
    };

    window.addEventListener("resize", () => {
      setCanvasSize();
      renderFrame();
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <>
      <section className="hero relative w-screen h-screen overflow-hidden">
        <div
          ref={canvasWrapRef}
          className="canvas-wrap absolute inset-0 overflow-hidden will-change-transform will-change-border-radius"
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          ></canvas>
        </div>
        <div className="hero-content absolute top-1/4 left-1/2 transform -translate-x-1/2 perspective-[1000px] p-2">
          <div
            ref={headerRef}
            className="header absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen flex flex-col items-center gap-6 text-center text-black will-change-transform will-change-opacity"
          >
            <h1 className="w-1/2 font-host-grotesk text-[5rem] font-normal leading-tight">
              Welcome to A World of Animation
            </h1>
            <p className="opacity-80 uppercase text-sm font-medium">
              Scroll down to explore
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroCanvas;
