"use client";

import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const ANIMATION_CONFIG = {
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
};

interface ImageLogo {
  src: string;
  srcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
  href?: string;
  ariaLabel?: string;
}

interface NodeLogo {
  node: React.ReactNode;
  title?: string;
  href?: string;
  ariaLabel?: string;
}

type Logo = ImageLogo | NodeLogo;

interface LogoLoopProps {
  logos: Logo[];
  speed?: number;
  direction?: "left" | "right";
  width?: string | number;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const useResizeObserver = (
  callback: () => void,
  elements: React.RefObject<HTMLElement>[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: any[]
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

const useImageLoader = (
  seqRef: React.RefObject<HTMLElement>,
  onLoad: () => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: any[]
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        handleImageLoad();
      } else {
        img.addEventListener("load", handleImageLoad, { once: true });
        img.addEventListener("error", handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
        img.removeEventListener("error", handleImageLoad);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
};

export const LogoLoop = memo<LogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = "left",
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    fadeOut = false,
    fadeOutColor = "white",
    scaleOnHover = false,
    ariaLabel = "Partner logos",
    className,
  }) => {
    const containerRef = useRef<HTMLDivElement>(
      null
    ) as React.RefObject<HTMLDivElement>;
    const trackRef = useRef<HTMLDivElement>(
      null
    ) as React.RefObject<HTMLDivElement>;
    const seqRef = useRef<HTMLUListElement>(
      null
    ) as React.RefObject<HTMLUListElement>;
    const animationRef = useRef<gsap.core.Tween | null>(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const updateDimensions = useCallback(() => {
      const containerWidth = containerRef.current?.clientWidth ?? 0;
      const sequenceWidth =
        seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

      if (sequenceWidth > 0) {
        setSeqWidth(Math.ceil(sequenceWidth));
        const copiesNeeded =
          Math.ceil(containerWidth / sequenceWidth) +
          ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
      }
    }, []);

    useResizeObserver(
      updateDimensions,
      [containerRef, seqRef],
      [logos, gap, logoHeight]
    );
    useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);

    // GSAP Animation
    useEffect(() => {
      const track = trackRef.current;
      if (!track || seqWidth <= 0) return;

      // Kill existing animation
      if (animationRef.current) {
        animationRef.current.kill();
      }

      // Calculate animation duration based on speed
      const duration = seqWidth / Math.abs(speed);
      const directionMultiplier = direction === "left" ? -1 : 1;

      // Create seamless loop animation
      animationRef.current = gsap.to(track, {
        x: directionMultiplier * seqWidth,
        duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x: string) => parseFloat(x) % seqWidth),
        },
      });

      return () => {
        if (animationRef.current) {
          animationRef.current.kill();
          animationRef.current = null;
        }
      };
    }, [speed, direction, seqWidth]);

    // Handle pause on hover
    useEffect(() => {
      if (!animationRef.current || !pauseOnHover) return;

      if (isHovered) {
        gsap.to(animationRef.current, { timeScale: 0, duration: 0.3 });
      } else {
        gsap.to(animationRef.current, { timeScale: 1, duration: 0.3 });
      }
    }, [isHovered, pauseOnHover]);

    const handleMouseEnter = useCallback(() => {
      if (pauseOnHover) setIsHovered(true);
    }, [pauseOnHover]);

    const handleMouseLeave = useCallback(() => {
      if (pauseOnHover) setIsHovered(false);
    }, [pauseOnHover]);

    const renderLogoItem = useCallback(
      (item: Logo, key: string) => {
        const isNodeItem = "node" in item;

        const content = isNodeItem ? (
          <span
            className="flex items-center justify-center"
            aria-hidden={!!item.href && !item.ariaLabel}
          >
            {item.node}
          </span>
        ) : (
          <Image
            src={item.src}
            width={item.width ?? logoHeight}
            height={item.height ?? logoHeight}
            alt={item.alt ?? ""}
            title={item.title}
            loading="lazy"
            draggable={false}
            className="max-h-full w-auto object-contain"
          />
        );

        const itemAriaLabel = isNodeItem
          ? item.ariaLabel ?? item.title
          : item.alt ?? item.title;

        const itemContent = item.href ? (
          <a
            className={`flex items-center justify-center transition-transform duration-200 ${
              scaleOnHover ? "hover:scale-110" : ""
            }`}
            href={item.href}
            aria-label={itemAriaLabel || "logo link"}
            target="_blank"
            rel="noreferrer noopener"
          >
            {content}
          </a>
        ) : (
          <div
            className={`flex items-center justify-center ${
              scaleOnHover
                ? "hover:scale-110 transition-transform duration-200"
                : ""
            }`}
          >
            {content}
          </div>
        );

        return (
          <li
            className="flex items-center justify-center shrink-0"
            key={key}
            role="listitem"
            style={{ height: `${logoHeight}px` }}
          >
            {itemContent}
          </li>
        );
      },
      [logoHeight, scaleOnHover]
    );

    const logoLists = useMemo(
      () =>
        Array.from({ length: copyCount }, (_, copyIndex) => (
          <ul
            className="flex items-center shrink-0"
            style={{ gap: `${gap}px` }}
            key={`copy-${copyIndex}`}
            role="list"
            aria-hidden={copyIndex > 0}
            ref={copyIndex === 0 ? seqRef : undefined}
          >
            {(logos ?? []).map((item, itemIndex) =>
              renderLogoItem(item, `${copyIndex}-${itemIndex}`)
            )}
          </ul>
        )),
      [copyCount, logos, renderLogoItem, gap]
    );

    const fadeGradient = fadeOut
      ? `linear-gradient(to right, ${fadeOutColor} 0%, transparent 10%, transparent 90%, ${fadeOutColor} 100%)`
      : undefined;

    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden ${className || ""}`}
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {fadeOut && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{ background: fadeGradient }}
          />
        )}
        <div
          className="flex items-center will-change-transform"
          ref={trackRef}
          style={{ gap: `${gap}px` }}
        >
          {logoLists}
        </div>
      </div>
    );
  }
);

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;
