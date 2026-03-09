import fs from "fs";
import path from "path";
import { getMarkdownContent } from "@/lib/markdown";
import ResumeContent from "@/components/ResumeContent";

export const metadata = {
  title: "Resume — Xiaoshuo Yao",
};

export default async function ResumePage() {
  const en = await getMarkdownContent("content/resume.md");

  const zhPath = path.join(process.cwd(), "content/resume.zh.md");
  let zh = en;
  if (fs.existsSync(zhPath)) {
    zh = await getMarkdownContent("content/resume.zh.md");
  }

  return <ResumeContent en={en} zh={zh} />;
}
