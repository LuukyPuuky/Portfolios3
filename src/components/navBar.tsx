"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import Image from "next/image";

export default function Navigation() {
  const menuToggleBtn = useRef<HTMLDivElement>(null);
  const menuToggleLabel = useRef<HTMLDivElement>(null);
  const hamburgerIcon = useRef<HTMLDivElement>(null);
  const menuOverlay = useRef<HTMLDivElement>(null);
  const menuOverlayContent = useRef<HTMLDivElement>(null);
  const menuMediaWrapper = useRef<HTMLDivElement>(null);
  const menuCol1 = useRef<HTMLDivElement>(null);
  const menuCol2 = useRef<HTMLDivElement>(null);
  const menuFooterCol1 = useRef<HTMLDivElement>(null);
  const menuFooterCol2 = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = () => {
    if (isAnimating) return;

    if (!isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  };

  const openMenu = () => {
    setIsAnimating(true);

    const tl = gsap.timeline();

    // Menu label animation
    if (menuToggleLabel.current) {
      tl.to(menuToggleLabel.current.querySelector("p"), {
        y: "-110%",
        duration: 1,
        ease: "power4.inOut",
      });
    }

    // Menu overlay animation
    tl.to(
      menuOverlay.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1,
        ease: "power4.inOut",
      },
      "<"
    );

    // Menu content animation
    tl.to(
      menuOverlayContent.current,
      {
        yPercent: 0,
        duration: 1,
        ease: "power4.inOut",
      },
      "<"
    );

    // Media wrapper fade in
    if (menuMediaWrapper.current) {
      tl.to(
        menuMediaWrapper.current,
        {
          opacity: 1,
          duration: 0.75,
          ease: "power2.out",
          delay: 0.5,
        },
        "<"
      );
    }

    // Animate text elements
    const textElements = [
      ...(menuCol1.current ? menuCol1.current.querySelectorAll("a") : []),
      ...(menuCol2.current ? menuCol2.current.querySelectorAll("a") : []),
      ...(menuFooterCol1.current
        ? menuFooterCol1.current.querySelectorAll("p")
        : []),
      ...(menuFooterCol2.current
        ? menuFooterCol2.current.querySelectorAll("p")
        : []),
    ];

    tl.to(
      textElements,
      {
        y: "0%",
        duration: 2,
        ease: "power4.inOut",
        stagger: -0.075,
      },
      -0.15
    );

    tl.call(() => {
      setIsAnimating(false);
    });

    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsAnimating(true);

    const tl = gsap.timeline();

    // Menu overlay close animation
    tl.to(menuOverlay.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      ease: "power4.inOut",
    });

    // Menu content animation
    tl.to(
      menuOverlayContent.current,
      {
        yPercent: -50,
        duration: 1,
        ease: "power4.inOut",
      },
      "<"
    );

    // Menu label animation
    if (menuToggleLabel.current) {
      tl.to(
        menuToggleLabel.current.querySelector("p"),
        {
          y: "0%",
          duration: 1,
          ease: "power4.inOut",
        },
        "<"
      );
    }

    // Fade out menu columns
    const menuCols = [menuCol1.current, menuCol2.current];
    tl.to(
      menuCols,
      {
        opacity: 0.25,
        duration: 1,
        ease: "power4.inOut",
      },
      "<"
    );

    tl.call(() => {
      // Reset text positions
      const textElements = [
        ...(menuCol1.current
          ? Array.from(menuCol1.current.querySelectorAll("a"))
          : []),
        ...(menuCol2.current
          ? Array.from(menuCol2.current.querySelectorAll("a"))
          : []),
        ...(menuFooterCol1.current
          ? Array.from(menuFooterCol1.current.querySelectorAll("p"))
          : []),
        ...(menuFooterCol2.current
          ? Array.from(menuFooterCol2.current.querySelectorAll("p"))
          : []),
      ];

      gsap.set(textElements, { y: "-110%" });
      gsap.set(menuCols, { opacity: 1 });

      if (menuMediaWrapper.current) {
        gsap.set(menuMediaWrapper.current, { opacity: 0 });
      }

      setIsAnimating(false);
    });

    setIsMenuOpen(false);
  };

  useEffect(() => {
    // Set initial states
    const textElements = [
      ...(menuCol1.current
        ? Array.from(menuCol1.current.querySelectorAll("a, button"))
        : []),
      ...(menuCol2.current
        ? Array.from(menuCol2.current.querySelectorAll("a, button"))
        : []),
      ...(menuFooterCol1.current
        ? Array.from(menuFooterCol1.current.querySelectorAll("p"))
        : []),
      ...(menuFooterCol2.current
        ? Array.from(menuFooterCol2.current.querySelectorAll("p"))
        : []),
    ];

    gsap.set(textElements, { y: "-110%" });
  }, []);

  const handleMenuClick = (id: string) => {
    // Close the menu first
    closeMenu();

    // Then scroll after a short delay (matches your GSAP close duration)
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 1100); // adjust if your animation is faster/slower
  };
  return (
    <nav className="fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden z-50">
      {/* Menu Bar */}
      <div className="fixed top-0 left-0 w-full p-8 flex justify-between items-center pointer-events-auto text-white/80 z-50">
        {/* Logo */}
        <div className="w-8 h-8"></div>

        {/* Menu Toggle Button */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={toggleMenu}
          ref={menuToggleBtn}
        >
          <div className="overflow-hidden" ref={menuToggleLabel}>
            <p className="relative transform translate-y-0 text-sm font-medium transition-transform will-change-transform">
              Menu
            </p>
          </div>
          <div
            className={`relative w-12 h-12 flex flex-col justify-center items-center border border-white/10 rounded-full transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${
              isMenuOpen ? "hamburger-active" : ""
            }`}
            ref={hamburgerIcon}
          >
            <span className="absolute w-[15px] h-[1.25px] bg-white transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] transform-gpu will-change-transform hamburger-line-1"></span>
            <span className="absolute w-[15px] h-[1.25px] bg-white transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] transform-gpu will-change-transform hamburger-line-2"></span>
          </div>
        </div>
      </div>

      {/* Menu Overlay  background*/}
      <div
        className="fixed top-0 left-0 w-full h-screen bg-neutral-900 overflow-hidden z-40 will-change-transform"
        ref={menuOverlay}
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0% 0%)" }}
      >
        <div
          className="flex w-full h-screen transform -translate-y-1/2 will-change-transform pointer-events-auto"
          ref={menuOverlayContent}
        >
          {/* Media Wrapper */}
          <div
            className="flex-2 opacity-0 will-change-opacity hidden lg:block"
            ref={menuMediaWrapper}
          >
            <Image
              src="/Luukspfp2.jpg"
              alt="Logo"
              width={800}
              height={1200}
              className="w-full h-full object-cover"
              quality={100}
            />
          </div>

          {/* Content Wrapper */}
          <div className="flex-3 flex relative">
            {/* Main Content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 lg:w-3/4 p-8 flex flex-col lg:flex-row items-start lg:items-end gap-8 lg:gap-8">
              <div className="flex flex-col gap-2 flex-3 " ref={menuCol1}>
                <div className="menu-link overflow-hidden">
                  <Link
                    href="#home"
                    onClick={() => handleMenuClick("home")}
                    className="text-4xl lg:text-5xl font-medium leading-tight text-white block transform translate-y-[-110%] will-change-transform hover:text-primary"
                  >
                    Home
                  </Link>
                </div>
                <div className="menu-link overflow-hidden ">
                  <Link
                    href="/about"
                    className="text-4xl lg:text-5xl font-medium leading-tight text-white  block transform translate-y-[-110%] will-change-transform  hover:text-primary"
                  >
                    About Me
                  </Link>
                </div>
                <div className="menu-link overflow-hidden">
                  <Link
                    href="#skills"
                    onClick={() => handleMenuClick("skills")}
                    className="text-4xl lg:text-5xl font-medium leading-tight text-white block transform translate-y-[-110%] will-change-transform hover:text-primary"
                  >
                    Skills
                  </Link>
                </div>
                <div className="menu-link overflow-hidden">
                  <Link
                    href="/projects"
                    className="text-4xl lg:text-5xl font-medium leading-tight text-white block transform translate-y-[-110%] will-change-transform  hover:text-primary"
                  >
                    Projects
                  </Link>
                </div>
                <div className="menu-link overflow-hidden">
                  <Link
                    href="/contact"
                    className="text-4xl lg:text-5xl font-medium leading-tight text-white block transform translate-y-[-110%] will-change-transform  hover:text-primary"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-2" ref={menuCol2}>
                <div className="menu-tag overflow-hidden">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl lg:text-2xl font-medium text-gray-400 block transform translate-y-[-110%] will-change-transform  hover:text-primary"
                  >
                    Github
                  </a>
                </div>
                <div className="menu-tag overflow-hidden">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl lg:text-2xl font-medium text-gray-400 block transform translate-y-[-110%] will-change-transform  hover:text-primary"
                  >
                    Linkedin
                  </a>
                </div>
                <div className="menu-tag overflow-hidden">
                  <a
                    href="mailto:example@mail.com"
                    className="text-xl lg:text-2xl font-medium text-gray-400 block transform translate-y-[-110%] will-change-transform  hover:text-primary"
                  >
                    Mail
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-3/4 lg:w-3/4 p-8 flex items-end gap-8">
              <div className="flex flex-col gap-1 flex-3" ref={menuFooterCol1}>
                <p className="text-sm font-medium text-gray-400 transform translate-y-[-110%] will-change-transform">
                  Eindhoven, Netherlands
                </p>
              </div>
              <div className="flex flex-col gap-1 flex-2" ref={menuFooterCol2}>
                <p className="text-sm font-medium text-gray-400 transform translate-y-[-110%] will-change-transform">
                  +31 6 80078320
                </p>
                <p className="text-sm font-medium text-gray-400 transform translate-y-[-110%] will-change-transform">
                  luukwillem@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hamburger-line-1 {
          transform: translateY(-3px);
        }

        .hamburger-line-2 {
          transform: translateY(3px);
        }

        .hamburger-active .hamburger-line-1 {
          transform: translateY(0) rotate(45deg) scaleX(1.05);
        }

        .hamburger-active .hamburger-line-2 {
          transform: translateY(0) rotate(-45deg) scaleX(1.05);
        }
      `}</style>
    </nav>
  );
}
