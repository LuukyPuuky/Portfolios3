// pages/projects/branding/page.tsx
"use client";

import React from "react";
import { ProjectContent, ProjectData } from "@/components/ProjectContents";
import { PROJECT_DETAILS } from "@/app/projectcontent";

const BrandingPage = () => {
  const project = PROJECT_DETAILS.find(
    (p) => p.slug === "branding"
  ) as ProjectData;
  const currentIndex = PROJECT_DETAILS.findIndex((p) => p.slug === "branding");
  const nextProject = PROJECT_DETAILS[currentIndex + 1] as
    | ProjectData
    | undefined;

  if (!project) {
    return <div>Project not found</div>;
  }

  return <ProjectContent project={project} nextProject={nextProject} />;
};

export default BrandingPage;
