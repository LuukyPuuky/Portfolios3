// app/projectcontent.ts

interface ProjectLink {
  label: string;
  url: string;
}

interface Project {
  id: string;
  title: string;
  links: ProjectLink[];
  imageUrl: string;
  category: string;
  year: number;
}

// Your main projects list (for the WorkSection)
export const PROJECTS: Project[] = [
  {
    id: "branding",
    title: "Branding",
    links: [
      { label: "GitHub", url: "https://github.com/branding-project" },
      { label: "View Project", url: "/projects/branding" },
    ],
    imageUrl: "/projects/branding.png",
    category: "Design",
    year: 2025,
  },
  {
    id: "project-owow",
    title: "Project OWOW",
    links: [
      { label: "GitHub", url: "https://github.com/project-owow" },
      { label: "View Project", url: "/projects/owow" },
    ],
    imageUrl: "/projects/project-owow.png",
    category: "Web Development",
    year: 2025,
  },
  // Add more projects here
];
