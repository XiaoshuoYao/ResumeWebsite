"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import ProjectCard from "@/components/ProjectCard";
import type { ProjectFrontmatter } from "@/lib/projects";

interface HomeContentProps {
  featuredProjects: { slug: string; frontmatter: ProjectFrontmatter }[];
}

export default function HomeContent({ featuredProjects }: HomeContentProps) {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      {/* Hero */}
      <section className="py-16 text-center">
        <h1 className="text-5xl font-bold tracking-tight">
          {t("home.greeting")}{" "}
          <span className="text-blue-600 dark:text-blue-400">姚晓硕 Xiaoshuo Yao</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          {t("home.tagline")}
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/resume"
            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            {t("home.viewResume")}
          </Link>
          <Link
            href="/projects"
            className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900"
          >
            {t("home.seeProjects")}
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-12">
          <h2 className="mb-8 text-2xl font-bold">{t("home.featuredProjects")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.slug}
                slug={project.slug}
                frontmatter={project.frontmatter}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
