"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface ResumeData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  frontmatter: Record<string, any>;
  contentHtml: string;
}

interface ResumeContentProps {
  en: ResumeData;
  zh: ResumeData;
}

export default function ResumeContent({ en, zh }: ResumeContentProps) {
  const { locale } = useLanguage();
  const { frontmatter, contentHtml } = locale === "zh" ? zh : en;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">{frontmatter.name}</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">{frontmatter.title}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
          {frontmatter.email && (
            <a href={`mailto:${frontmatter.email}`} className="hover:text-blue-600 dark:hover:text-blue-400">
              {frontmatter.email}
            </a>
          )}
          {frontmatter.github && (
            <a href={frontmatter.github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
              GitHub
            </a>
          )}
          {frontmatter.linkedin && (
            <a href={frontmatter.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 dark:hover:text-blue-400">
              LinkedIn
            </a>
          )}
        </div>
      </div>
      <MarkdownRenderer contentHtml={contentHtml} />
    </div>
  );
}
