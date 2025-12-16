// components/ProjectContent.tsx
"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

// Types
export interface ProjectService {
  title: string;
}

export interface ProjectResult {
  value: string;
  label: string;
}

export interface GalleryItem {
  type: "image" | "video";
  src: string;
  alt?: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  year: string;
  description: string;
  services: string[];
  heroImage?: string;
  heroVideo?: string;
  challenge: string[];
  designApproach: string;
  galleryItems: GalleryItem[];
  results: ProjectResult[];
  nextProject?: {
    title: string;
    slug: string;
    image: string;
    services: string[];
  };
  contactInfo?: {
    email?: string;
    instagram?: string;
    behance?: string;
    linkedin?: string;
  };
}

interface ProjectContentProps {
  project: ProjectData;
  nextProject?: ProjectData;
}

export const ProjectContent: React.FC<ProjectContentProps> = ({
  project,
  nextProject,
}) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const galleryItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);
  const resultItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  // Title animation
  useEffect(() => {
    if (titleRef.current) {
      const split = new SplitType(titleRef.current, { types: "chars" });

      gsap.fromTo(
        split.chars,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.05,
          delay: 0.3,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      return () => {
        split.revert();
      };
    }
  }, []);

  // Description animation
  useEffect(() => {
    if (descRef.current) {
      const split = new SplitType(descRef.current, { types: "lines" });

      gsap.fromTo(
        split.lines,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      return () => {
        split.revert();
      };
    }
  }, []);

  // Gallery animation
  useEffect(() => {
    galleryItemsRef.current.forEach((item) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });
  }, []);

  // Results animation
  useEffect(() => {
    if (resultsRef.current) {
      resultItemsRef.current.forEach((item, idx) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: idx * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: resultsRef.current,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }
  }, []);

  // Image hover animation
  useEffect(() => {
    if (imageRef.current) {
      const img = imageRef.current.querySelector("img");
      if (img) {
        img.addEventListener("mouseenter", () => {
          gsap.to(img, { scale: 1.05, duration: 0.4, ease: "power2.out" });
        });

        img.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1, duration: 0.4, ease: "power2.out" });
        });
      }
    }
  }, []);

  return (
    <main className="w-full bg-black">
      {/* Hero Section */}
      <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 md:px-8">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center min-h-[60vh]">
            <div className="text-sm md:text-base opacity-70 leading-relaxed">
              <p className="m-0 font-light tracking-wide">
                {project.services.join(" / ")}
              </p>
            </div>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold m-0 leading-tight tracking-tight overflow-hidden"
            >
              {project.title}
            </h1>

            <div className="text-right">
              <p className="m-0 text-sm md:text-base opacity-70">
                {project.year}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Video */}
      {project.heroVideo && (
        <section className="py-12 md:py-20 bg-black">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="w-full rounded-lg overflow-hidden">
              <video
                src={project.heroVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
      )}

      {/* Description & Challenge Section */}
      <section className="py-16 md:py-32 bg-black text-white">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div className="space-y-12 md:space-y-20">
            <div className="overflow-hidden">
              <p
                ref={descRef}
                className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed"
              >
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
                  Challenge
                </h3>
                <ol className="space-y-4 text-base md:text-lg text-gray-300">
                  {project.challenge.map((item, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="font-bold shrink-0">{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
                  Design Approach
                </h3>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  {project.designApproach}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {project.galleryItems.length > 0 && (
        <section className="py-16 md:py-32 bg-black">
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {project.galleryItems.map((item, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    galleryItemsRef.current[idx] = el;
                  }}
                  className="w-full rounded-lg overflow-hidden bg-gray-900"
                >
                  {item.type === "image" ? (
                    <div className="relative w-full h-96 md:h-[500px]">
                      <Image
                        src={item.src}
                        alt={item.alt || `Gallery item ${idx}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <video
                      src={item.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-96 md:h-[500px] object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      <section className="py-16 md:py-32 bg-black text-white">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
          <div
            ref={resultsRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20"
          >
            <div className="flex flex-col gap-8">
              {project.results.map((result, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    resultItemsRef.current[idx] = el;
                  }}
                  className="space-y-2"
                >
                  <div className="text-3xl md:text-4xl lg:text-5xl font-bold">
                    {result.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-400">
                    {result.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Project Section */}
      {nextProject && (
        <>
          <section className="py-16 md:py-32 bg-black text-white border-t border-gray-800">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
              <div className="space-y-12">
                <p className="text-sm tracking-widest opacity-70 uppercase">
                  next project
                </p>

                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    {nextProject.title}
                  </h2>

                  <Link href={`/projects/${nextProject.slug}`}>
                    <div
                      ref={imageRef}
                      className="relative w-full h-96 md:h-[600px] rounded-lg overflow-hidden cursor-pointer group"
                    >
                      <Image
                        src={nextProject.heroImage || ""}
                        alt={nextProject.title}
                        fill
                        className="object-cover transition-transform duration-300"
                        priority
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    </div>
                  </Link>

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-4 border-t border-gray-800">
                    <span className="text-sm md:text-base opacity-70">
                      {nextProject.year}
                    </span>
                    <div className="flex flex-wrap gap-4">
                      {nextProject.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="text-sm opacity-70 hover:opacity-100 transition-opacity"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-12 md:py-16 bg-black text-white border-t border-gray-800">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                {project.contactInfo?.instagram && (
                  <a
                    href={project.contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity text-sm md:text-base"
                  >
                    Instagram
                  </a>
                )}

                <div className="text-xs md:text-sm opacity-50 text-center">
                  Design & Development
                </div>

                {project.contactInfo?.behance && (
                  <a
                    href={project.contactInfo.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity text-sm md:text-base"
                  >
                    Behance
                  </a>
                )}

                {project.contactInfo?.email && (
                  <a
                    href={`mailto:${project.contactInfo.email}`}
                    className="hover:opacity-70 transition-opacity text-sm md:text-base"
                  >
                    Email
                  </a>
                )}

                {project.contactInfo?.linkedin && (
                  <a
                    href={project.contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity text-sm md:text-base"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </footer>
        </>
      )}
    </main>
  );
};
