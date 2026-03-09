import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import ProjectDetailContent from "@/components/ProjectDetailContent";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const project = await getProjectBySlug(params.slug);
    return { title: `${project.frontmatter.title} — Xiaoshuo Yao` };
  } catch {
    return { title: "Project Not Found" };
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  let project;
  try {
    project = await getProjectBySlug(params.slug);
  } catch {
    notFound();
  }

  let zhContentHtml = project.contentHtml;
  try {
    const zhProject = await getProjectBySlug(params.slug, "zh");
    zhContentHtml = zhProject.contentHtml;
  } catch {
    // fallback to English content
  }

  return (
    <ProjectDetailContent
      project={project}
      zhContentHtml={zhContentHtml}
    />
  );
}
