import { getAllProjects } from "@/lib/projects";
import ProjectsContent from "@/components/ProjectsContent";

export const metadata = {
  title: "Projects — Xiaoshuo Yao",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return <ProjectsContent projects={projects} />;
}
