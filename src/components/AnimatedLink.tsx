"use client";

import React, { useRef, useLayoutEffect, ReactNode } from "react";
import { gsap } from "gsap";

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  disabled?: boolean;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  children,
  className = "",
  onClick,
  disabled = false,
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const link = linkRef.current;
    if (!link || disabled) return;

    const topText = link.querySelector(".link-text-top");
    const bottomText = link.querySelector(".link-text-bottom");

    if (!topText || !bottomText) return;

    const topLetters = topText.querySelectorAll("div");
    const bottomLetters = bottomText.querySelectorAll("div");

    gsap.set(bottomLetters, { y: "100%" });

    const tl = gsap.timeline({ paused: true });
    tl.to(topLetters, {
      y: "-100%",
      stagger: 0.03,
      duration: 0.4,
      ease: "power2.inOut",
    });
    tl.to(
      bottomLetters,
      {
        y: "0%",
        stagger: 0.03,
        duration: 0.2,
        ease: "power2.inOut",
      },
      "-=0.4"
    );

    const onMouseEnter = () => tl.play();
    const onMouseLeave = () => tl.reverse();

    link.addEventListener("mouseenter", onMouseEnter);
    link.addEventListener("mouseleave", onMouseLeave);

    return () => {
      link.removeEventListener("mouseenter", onMouseEnter);
      link.removeEventListener("mouseleave", onMouseLeave);
      tl.kill();
    };
  }, [disabled]);

  const textContent = typeof children === "string" ? children : "";

  const splitText = (text: string) =>
    text.split("").map((char, index) => (
      <div
        key={index}
        className="inline-block"
        style={{ whiteSpace: char === " " ? "pre" : "normal" }}
      >
        {char}
      </div>
    ));

  return (
    <a
      href={href}
      ref={linkRef}
      className={`relative inline-block overflow-hidden text-lg ${className} ${
        disabled
          ? "text-zinc-500 cursor-not-allowed"
          : "text-zinc-200 hover:text-white"
      }`}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        if (onClick) onClick(e);
      }}
    >
      <span className="link-text-top inline-block">
        {splitText(textContent)}
      </span>
      <span className="link-text-bottom absolute left-0 top-0 inline-block">
        {splitText(textContent)}
      </span>
    </a>
  );
};

export default AnimatedLink;
