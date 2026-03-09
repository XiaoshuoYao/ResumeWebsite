interface MarkdownRendererProps {
  contentHtml: string;
}

export default function MarkdownRenderer({ contentHtml }: MarkdownRendererProps) {
  return (
    <div
      className="prose prose-gray max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 dark:prose-a:text-blue-400"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
