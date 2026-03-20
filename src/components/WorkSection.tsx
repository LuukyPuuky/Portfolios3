"use client";

import React from "react";
import Link from "next/link";
import AnimatedLink from "./AnimatedLink";

interface ProjectLink {
  label: string;
  url: string;
}

interface Projects {
  id: string;
  title: string;
  links: ProjectLink[];
  imageUrl: string;
  category: string;
  year: number;
}

const PROJECTS: Projects[] = [
  {
    id: "branding",
    title: "Branding",
    links: [
      { label: "Figma", url: "https://www.figma.com/proto/EK9EOAI5VEAANG395V9M2w/Project-1--Branding?page-id=268%3A2&node-id=444-584&starting-point-node-id=444%3A584&t=DCsMkKgfuuESkufG-1" },
      { label: "View Project", url: "/projects/branding" },
    ],
    imageUrl: "/projects/branding.png",
    category: "Design",
    year: 2025,
  },
  {
    id: "project-owow",
    title: "Owow Billboard",
    links: [
      { label: "GitHub", url: "https://github.com/LuukyPuuky/OwowProject" },
      { label: "View Project", url: "/projects/owow" },
    ],
    imageUrl: "/projects/project-owow.png",
    category: "Web Development",
    year: 2025,
  },
];

export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  year: string;
  description: string;
  services: string[];
}

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
}> = ({ project }) => {
  const detailPageUrl = project.links.find((link) =>
    link.url.startsWith("/projects/"),
  )?.url;

  return (
    <div
      className="group w-full py-8 border-b border-zinc-700/50 hover:border-zinc-500 transition-colors duration-300 flex justify-between items-center flex-wrap gap-4 cursor-pointer"
    >
      <Link
        href={detailPageUrl || "#"}
        className="flex-1 text-3xl md:text-4xl font-semibold tracking-tight transition-transform duration-300 group-hover:-translate-x-2 text-white hover:opacity-70"
      >
        {project.title}
      </Link>
      <div className="flex flex-col items-end gap-2 ml-auto text-right">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end gap-1">
          {project.links.map((link) => {
            return (
              <AnimatedLink
                key={link.label}
                href={link.url}
                className="text-base"
              >
                {link.label}
              </AnimatedLink>
            );
          })}
        </div>
        <div className="text-zinc-500 text-sm">
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
        <div className="projects-wrapper transition-all duration-500 flex flex-col relative">
          {PROJECTS.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
