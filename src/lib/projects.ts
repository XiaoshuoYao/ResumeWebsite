import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import type { Locale } from "@/lib/i18n";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface ProjectFrontmatter {
  title: string;
  title_zh?: string;
  description: string;
  description_zh?: string;
  tech: string[];
  github?: string;
  demo?: string;
  download?: string;
  image?: string;
  type: "web" | "unity" | "cli" | "other";
  unityBuild?: string;
  featured?: boolean;
  date: string;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  contentHtml: string;
}

export function getAllProjects(): Omit<Project, "contentHtml">[] {
  if (!fs.existsSync(projectsDirectory)) return [];

  const fileNames = fs.readdirSync(projectsDirectory).filter((f) => f.endsWith(".md"));

  const projects = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      frontmatter: data as ProjectFrontmatter,
    };
  });

  return projects.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export async function getProjectBySlug(slug: string, locale?: Locale): Promise<Project> {
  // For Chinese locale, try to load from zh subdirectory first
  if (locale === "zh") {
    const zhPath = path.join(projectsDirectory, "zh", `${slug}.md`);
    if (fs.existsSync(zhPath)) {
      const fileContents = fs.readFileSync(zhPath, "utf8");
      const { data, content } = matter(fileContents);
      const processedContent = await remark().use(gfm).use(html, { sanitize: false }).process(content);
      return {
        slug,
        frontmatter: data as ProjectFrontmatter,
        contentHtml: processedContent.toString(),
      };
    }
  }

  const fullPath = path.join(projectsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(gfm).use(html, { sanitize: false }).process(content);

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    contentHtml: processedContent.toString(),
  };
}
