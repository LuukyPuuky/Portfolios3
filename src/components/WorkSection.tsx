"use client";

import React, { useState } from "react";
import { PROJECTS } from "../app/projectcontent";
import Image from "next/image";
import AnimatedLink from "./AnimatedLink";

type Project = {
  id: string;
  title: string;
  category: string;
  year: string | number;
  imageUrl: string;
  links: { url: string; label: string }[];
};

type ViewMode = "list" | "grid";

const ProjectItem: React.FC<{ project: Project; view: ViewMode }> = ({
  project,
  view,
}) => {
  const isListView = view === "list";

  if (isListView) {
    return (
      <div className="group w-full py-8 border-b border-zinc-700/50 hover:border-zinc-500 transition-colors duration-300 flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight transition-transform duration-300 group-hover:-translate-x-2">
          {project.title}
        </h2>
        <div className="flex flex-col items-end gap-2 ml-auto text-right">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-end gap-1">
            {project.links.map((link) => (
              <AnimatedLink
                key={link.url}
                href={link.url}
                className="text-base"
              >
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
  }

  return (
    <div className="group aspect-4/3 relative overflow-hidden rounded-lg shadow-lg">
      <Image
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            {project.title}
          </h2>
          <p className="text-zinc-400 text-sm mb-2">
            {project.category} / {project.year}
          </p>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
            {project.links.map((link) => (
              <AnimatedLink key={link.url} href={link.url} className="text-sm">
                {link.label}
              </AnimatedLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkSection: React.FC = () => {
  const [view, setView] = useState<ViewMode>("list");

  return (
    <section className="mt-16 sm:mt-24">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`projects-wrapper transition-all duration-500 ${
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              : "flex flex-col"
          }`}
        >
          {PROJECTS.map((project) => (
            <ProjectItem key={project.id} project={project} view={view} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
