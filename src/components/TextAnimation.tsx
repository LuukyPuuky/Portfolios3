"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

interface TextAnimationProps {
  text: string;
}

const TextAnimation = ({ text }: TextAnimationProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = textRef.current;
    if (!node) return;

    // Split text into characters
    const split = new SplitText(node, { type: "chars" });

    // Hover animations
    const handleMouseEnter = () => {
      gsap.to(split.chars, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(split.chars, { y: 0, opacity: 1, duration: 0.2 });
    };

    node.addEventListener("mouseenter", handleMouseEnter);
    node.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      node.removeEventListener("mouseenter", handleMouseEnter);
      node.removeEventListener("mouseleave", handleMouseLeave);
      split.revert();
    };
  }, []);

  return (
    <div
      ref={textRef}
      className="text cursor-pointer flex justify-center items-center h-screen"
    >
      {text}
    </div>
  );
};

export default TextAnimation;
