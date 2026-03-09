export type Locale = "en" | "zh";

const translations = {
  en: {
    nav: {
      home: "Home",
      resume: "Resume",
      projects: "Projects",
    },
    home: {
      greeting: "",
      tagline: "Technical Designer, Engineer, and more",
      viewResume: "View Resume",
      seeProjects: "See Projects",
      featuredProjects: "Featured Projects",
    },
    projects: {
      title: "Projects",
      subtitle: "A collection of things I've built.",
      empty: "No projects yet. Add markdown files to content/projects/ to get started.",
    },
    project: {
      backToProjects: "\u2190 Back to Projects",
      githubRepo: "GitHub Repo",
      liveDemo: "Live Demo",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  zh: {
    nav: {
      home: "\u9996\u9875",
      resume: "\u7b80\u5386",
      projects: "\u9879\u76ee",
    },
    home: {
      greeting: "",
      tagline: "技术策划，工程师，也许还能做更多",
      viewResume: "\u67e5\u770b\u7b80\u5386",
      seeProjects: "\u67e5\u770b\u9879\u76ee",
      featuredProjects: "\u7cbe\u9009\u9879\u76ee",
    },
    projects: {
      title: "\u9879\u76ee",
      subtitle: "\u6211\u6784\u5efa\u7684\u4e00\u4e9b\u4f5c\u54c1\u3002",
      empty: "\u6682\u65e0\u9879\u76ee\u3002\u5728 content/projects/ \u76ee\u5f55\u4e0b\u6dfb\u52a0 Markdown \u6587\u4ef6\u5373\u53ef\u5f00\u59cb\u3002",
    },
    project: {
      backToProjects: "\u2190 \u8fd4\u56de\u9879\u76ee\u5217\u8868",
      githubRepo: "GitHub \u4ed3\u5e93",
      liveDemo: "\u5728\u7ebf\u6f14\u793a",
    },
    footer: {
      rights: "\u4fdd\u7559\u6240\u6709\u6743\u5229\u3002",
    },
  },
} as const;

export function t(locale: Locale, path: string): string {
  const keys = path.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = translations[locale];
  for (const key of keys) {
    value = value?.[key];
  }
  return (value as string) ?? path;
}
