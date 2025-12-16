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
      { label: "View Project", url: "/projects/project-owow" },
    ],
    imageUrl: "/projects/project-owow.png",
    category: "Web Development",
    year: 2025,
  },
  // Add more projects here
];

// Detailed project information (for the project detail pages)
export const PROJECT_DETAILS = [
  {
    id: "1",
    slug: "branding",
    title: "Branding",
    year: "2025",
    description:
      "A comprehensive branding project that establishes visual identity and design language. This project showcases modern design principles and creative direction.",
    services: ["Brand Strategy", "Visual Identity", "Design System"],
    heroImage: "/projects/branding.png",
    challenge: [
      "Create a cohesive brand identity that resonates with target audience",
      "Develop a versatile design system for multiple touchpoints",
      "Establish brand guidelines that are easy to implement",
    ],
    designApproach:
      "We took a strategic approach to branding, starting with deep market research and competitor analysis. We created mood boards, explored typography and color palettes, and developed a comprehensive brand guide that ensures consistency across all platforms.",
    galleryItems: [
      {
        type: "image",
        src: "/projects/branding.png",
        alt: "Branding project 1",
      },
      // Add more gallery items as needed
    ],
    results: [
      { value: "95%", label: "Client Satisfaction" },
      { value: "100%", label: "Brand Guidelines Adoption" },
    ],
    contactInfo: {
      email: "contact@yoursite.com",
      instagram: "https://instagram.com/yourprofile",
      behance: "https://behance.net/yourprofile",
      linkedin: "https://linkedin.com/in/yourprofile",
    },
  },
  {
    id: "2",
    slug: "project-owow",
    title: "Project OWOW",
    year: "2025",
    description:
      "An innovative web development project showcasing cutting-edge technologies and modern web design practices. This project demonstrates full-stack development capabilities.",
    services: ["Web Development", "UI/UX Design", "Full Stack"],
    heroImage: "/projects/project-owow.png",
    challenge: [
      "Build a scalable and performant web application",
      "Create an intuitive user interface for complex features",
      "Ensure accessibility and responsive design across all devices",
    ],
    designApproach:
      "We employed an agile development methodology combined with user-centered design principles. The project was built with modern technologies and best practices, ensuring maintainability and scalability. We focused on creating an exceptional user experience while maintaining clean, efficient code.",
    galleryItems: [
      {
        type: "image",
        src: "/projects/project-owow.png",
        alt: "Project OWOW 1",
      },
      // Add more gallery items as needed
    ],
    results: [
      { value: "50ms", label: "Page Load Time" },
      { value: "98%", label: "Lighthouse Score" },
    ],
    contactInfo: {
      email: "contact@yoursite.com",
      instagram: "https://instagram.com/yourprofile",
      behance: "https://behance.net/yourprofile",
      linkedin: "https://linkedin.com/in/yourprofile",
    },
  },
  // Add more projects here
];
export default PROJECT_DETAILS;
