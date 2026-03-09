import { getAllProjects } from "@/lib/projects";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  const featuredProjects = getAllProjects().filter((p) => p.frontmatter.featured);

  return <HomeContent featuredProjects={featuredProjects} />;
}
