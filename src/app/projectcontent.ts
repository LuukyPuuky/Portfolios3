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

export const PROJECTS: Project[] = [
  {
    id: "Branding",
    title: "Branding",
    links: [
      { label: "GitHub", url: "https://github.com/branding-project" },
      { label: "View Project", url: "https://branding-project.com" },
    ],
    imageUrl: "/projects/branding.png",
    category: "Design",
    year: 2025,
  },
  {
    id: "Project OWOW",
    title: "Project OWOW",
    links: [
      { label: "GitHub", url: "https://github.com/project-owow" },
      { label: "View Project", url: "" },
    ],
    imageUrl: "/projects/project-owow.png",
    category: "Web Development",
    year: 2025,
  },
];
