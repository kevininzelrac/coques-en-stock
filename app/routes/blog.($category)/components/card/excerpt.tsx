import { Prisma } from "@prisma/client";

export default function Excerpt({
  content,
}: Prisma.PostGetPayload<{
  select: {
    content: true;
  };
}>) {
  const excerpt = content.includes("children")
    ? JSON.parse(content)
        .filter(({ children }: any) => children[0].text !== "")
        .map(({ children }: any) => children[0].text)
        .toString()
    : content;
  return (
    <p className="excerpt">
      {excerpt.substring(0, 200)}
      ...
    </p>
  );
}
