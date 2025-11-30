"use client";

import React, { useState, useRef, useEffect } from "react";
import { PROJECTS } from "../app/projectcontent";
import AnimatedLink from "./AnimatedLink";
import Image from "next/image";
import gsap from "gsap";

type Project = {
  id: string;
  title: string;
  category: string;
  year: string | number;
  imageUrl: string;
  links: { url: string; label: string }[];
};

const ProjectItem: React.FC<{
  project: Project;
  setActiveProject: (project: Project | null) => void;
}> = ({ project, setActiveProject }) => {
  return (
    <div
      className="group w-full py-8 border-b border-zinc-700/50 hover:border-zinc-500 transition-colors duration-300 flex justify-between items-center flex-wrap gap-4 cursor-pointer"
      onMouseEnter={() => setActiveProject(project)}
      onMouseLeave={() => setActiveProject(null)}
    >
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight transition-transform duration-300 group-hover:-translate-x-2 text-white">
        {project.title}
      </h2>
      <div className="flex flex-col items-end gap-2 ml-auto text-right">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end gap-1">
          {project.links.map((link) => (
            <AnimatedLink key={link.url} href={link.url} className="text-base">
              {link.label}
            </AnimatedLink>
          ))}
        </div>
        <div className="text-zinc-500 text-sm group-hover:opacity-0 transition-opacity duration-300">
          {project.category} / {project.year}
        </div>
      </div>
    </div>
  );
};

const WorkSection = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);
  const xMoveCursor = useRef<gsap.QuickToFunc | null>(null);
  const yMoveCursor = useRef<gsap.QuickToFunc | null>(null);

  useEffect(() => {
    if (cursorLabelRef.current) {
      xMoveCursor.current = gsap.quickTo(cursorLabelRef.current, "left", {
        duration: 0.5,
        ease: "power3",
      });
      yMoveCursor.current = gsap.quickTo(cursorLabelRef.current, "top", {
        duration: 0.5,
        ease: "power3",
      });
    }
  }, []);

  const moveItems = (e: React.MouseEvent) => {
    if (xMoveCursor.current && yMoveCursor.current) {
      const { clientX, clientY } = e;
      xMoveCursor.current(clientX);
      yMoveCursor.current(clientY);
    }
  };

  return (
    <section className="mt-16 sm:mt-24" onMouseMove={moveItems}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="projects-wrapper transition-all duration-500 flex flex-col relative">
          {PROJECTS.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              setActiveProject={setActiveProject}
            />
          ))}
        </div>
      </div>
      
      {/* Floating Image Container */}
      <div
        ref={cursorLabelRef}
        className={`fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-50 overflow-hidden rounded-lg transform -translate-x-1/2 -translate-y-1/2 transition-all duration-400 ease-out ${
          activeProject ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="relative w-full h-full bg-zinc-800">
             {activeProject && (
                <Image
                src={activeProject.imageUrl}
                alt={activeProject.title}
                fill
                className="object-cover"
                priority
                />
            )}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
