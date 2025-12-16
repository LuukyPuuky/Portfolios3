// lib/projects.ts
import { ProjectData } from "@/components/ProjectContents";
import PROJECT_DETAILS from "@/app/projectcontent";

export const getProjectBySlug = (slug: string): ProjectData => {
  const projects = PROJECT_DETAILS as unknown as ProjectData[];
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    throw new Error(`Project with slug "${slug}" not found`);
  }
  return project;
};

export const getAllProjects = (): ProjectData[] => {
  return PROJECT_DETAILS as unknown as ProjectData[];
};

export const getProjectById = (id: string): ProjectData => {
  const projects = PROJECT_DETAILS as unknown as ProjectData[];
  const project = projects.find((p) => p.id === id);
  if (!project) {
    throw new Error(`Project with id "${id}" not found`);
  }
  return project;
};
