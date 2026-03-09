"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import ProjectCard from "@/components/ProjectCard";
import type { ProjectFrontmatter } from "@/lib/projects";

interface ProjectsContentProps {
  projects: { slug: string; frontmatter: ProjectFrontmatter }[];
}

export default function ProjectsContent({ projects }: ProjectsContentProps) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold">{t("projects.title")}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {t("projects.subtitle")}
      </p>

      {projects.length === 0 ? (
        <p className="mt-12 text-center text-gray-500 dark:text-gray-400">
          {t("projects.empty")}
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              frontmatter={project.frontmatter}
            />
          ))}
        </div>
      )}
    </div>
  );
}
