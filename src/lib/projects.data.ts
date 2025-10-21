export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform built with Next.js and TypeScript",
    image: "/projects/project-1.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "project-2",
    title: "Task Management App",
    description: "A collaborative task management app with real-time features",
    image: "/projects/project-2.jpg",
    tags: ["React", "Node.js", "Socket.io"],
  },
];

export function getProjectById(id: string) {
  return projects.find((p) => p.id === id);
}

export function getAllProjectIds() {
  return projects.map((p) => p.id);
}
