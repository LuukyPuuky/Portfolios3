"use client";

import React from "react";
import { PROJECTS } from "../app/projectcontent";
import AnimatedLink from "./AnimatedLink";

type Project = {
  id: string;
  title: string;
  category: string;
  year: string | number;
  imageUrl: string;
  links: { url: string; label: string }[];
};

const ProjectItem: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group w-full py-8 border-b border-zinc-700/50 hover:border-zinc-500 transition-colors duration-300 flex justify-between items-center flex-wrap gap-4">
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
  return (
    <section className="mt-16 sm:mt-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="projects-wrapper transition-all duration-500 flex flex-col">
          {PROJECTS.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
