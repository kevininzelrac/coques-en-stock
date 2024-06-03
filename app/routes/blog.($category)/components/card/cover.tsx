import { Prisma } from "@prisma/client";
import image from "~/src/blurryBkgrd.png";
import spotifyIcon from "~/src/spotify.png";

export default function Cover({
  content,
}: Prisma.PostGetPayload<{
  select: {
    content: true;
  };
}>) {
  const youtube = content.includes("youtube")
    ? "https://img.youtube.com/vi/" +
      new URL(
        JSON.parse(content).find(({ type }: any) => type === "youtube").src
      ).pathname
        .split("/")
        .pop() +
      "/maxresdefault.jpg"
    : null;

  const img = content.includes("image")
    ? JSON.parse(content).find(({ type }: any) => type === "image").src
    : null;

  const spotify = content.includes("spotify") ? spotifyIcon : null;

  return (
    <figure>
      <img src={youtube || img || spotify || image} />
      <figcaption></figcaption>
    </figure>
  );
}
