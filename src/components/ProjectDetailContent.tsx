"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import UnityPlayer from "@/components/UnityPlayer";
import type { Project } from "@/lib/projects";

interface ProjectDetailContentProps {
  project: Project;
  zhContentHtml: string;
}

export default function ProjectDetailContent({
  project,
  zhContentHtml,
}: ProjectDetailContentProps) {
  const { locale, t } = useLanguage();
  const { frontmatter } = project;

  const title =
    locale === "zh" && frontmatter.title_zh
      ? frontmatter.title_zh
      : frontmatter.title;
  const description =
    locale === "zh" && frontmatter.description_zh
      ? frontmatter.description_zh
      : frontmatter.description;
  const contentHtml = locale === "zh" ? zhContentHtml : project.contentHtml;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
      >
        {t("project.backToProjects")}
      </Link>

      <h1 className="mt-4 text-4xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {frontmatter.tech.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-4">
        {frontmatter.github && (
          <a
            href={frontmatter.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {t("project.githubRepo")}
          </a>
        )}
        {frontmatter.demo && (
          <a
            href={frontmatter.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {t("project.liveDemo")}
          </a>
        )}
      </div>

      {frontmatter.type === "unity" && frontmatter.unityBuild && (
        <UnityPlayer buildPath={frontmatter.unityBuild} title={title} />
      )}

      <div className="mt-10">
        <MarkdownRenderer contentHtml={contentHtml} />
      </div>
    </div>
  );
}
