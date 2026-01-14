/* eslint-disable */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

const HeroCanvas = () => {
  const canvasRef = useRef(null);
  const headerRef = useRef(null);
  const canvasWrapRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const canvas = canvasRef.current;
    const header = headerRef.current;
    const canvasWrap = canvasWrapRef.current;
    const context = canvas.getContext("2d");

    const setCanvasSize = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, rect.width, rect.height);
    };

    setCanvasSize();

    const frameCount = 250;
    const currentFrame = (index) =>
      `/frames/frame_${String(index + 1).padStart(4, "0")}.jpg`;

    let images = [];
    let videoFrames = { frame: 0 };
    let imagesToLoad = frameCount;

    const onLoad = () => {
      imagesToLoad--;
      if (!imagesToLoad) {
        render();
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

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      context.clearRect(0, 0, canvasWidth, canvasHeight);

      const img = images[videoFrames.frame];
      if (img && img.complete && img.naturalWidth > 0) {
        const imageAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, drawX, drawY;

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
      }
    };

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
          const targetFrame = Math.round(animationProgress * (frameCount - 1));
          videoFrames.frame = targetFrame;
          render();

          if (progress <= 0.25) {
            const zProgress = progress / 0.25;
            const translateZ = zProgress * -500;

            let opacity = 1;
            if (progress >= 0.2) {
              const fadeProgress = Math.min((progress - 0.2) / (0.25 - 0.2), 1);
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
      render();
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

      <section className="outro flex justify-center items-center text-center text-black bg-white w-screen h-screen">
        <h2>placeholder text for space</h2>
      </section>
    </>
  );
};

export default HeroCanvas;
