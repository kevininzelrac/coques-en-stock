const isVoidUrl = (url: string, type: any) => {
  if (!url) return false;

  switch (type) {
    case "image":
      const _url = new URL(url);
      const image = _url.pathname.split(".").pop()?.toString();
      return ["jpg", "png"].includes(image!) ? url : null;
    //
    case "youtube":
      const youtubeRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;

      const youtubeMatch = url.match(youtubeRegex);

      if (!youtubeMatch) return null;
      const videoId = youtubeMatch[5];
      return `https://www.youtube.com/embed/${videoId}`;
    //
    case "spotify":
      const spotifyRegex =
        /^https:\/\/open\.spotify\.com\/(?:[a-z-]+\/)?(album|track|playlist)\/([a-zA-Z0-9]+)\?si=([a-zA-Z0-9_-]+)$/;

      const spotifyMatch = url.match(spotifyRegex);

      if (!spotifyMatch) return null;
      const [, type, id] = spotifyMatch;
      return `https://open.spotify.com/embed/${type}/${id}?utm_source=generator&theme=0`;
  }
};
export default isVoidUrl;
