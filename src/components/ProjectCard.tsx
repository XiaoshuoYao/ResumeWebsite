"use client";

import Link from "next/link";
import type { ProjectFrontmatter } from "@/lib/projects";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectCardProps {
  slug: string;
  frontmatter: ProjectFrontmatter;
}

export default function ProjectCard({ slug, frontmatter }: ProjectCardProps) {
  const { locale } = useLanguage();
  const title =
    locale === "zh" && frontmatter.title_zh
      ? frontmatter.title_zh
      : frontmatter.title;
  const description =
    locale === "zh" && frontmatter.description_zh
      ? frontmatter.description_zh
      : frontmatter.description;

  return (
    <Link
      href={`/projects/${slug}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 transition-all hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:hover:border-gray-700"
    >
      {frontmatter.image && (
        <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={frontmatter.image}
            alt={title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {frontmatter.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
