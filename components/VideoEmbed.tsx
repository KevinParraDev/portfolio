import type { Video } from "@/data/projects";

const embedUrl = ({ provider, id }: Video) =>
  provider === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${id}?loop=1&playlist=${id}`
    : `https://player.vimeo.com/video/${id}?loop=1`;

// Reemplaza a react-player: un iframe nativo pesa mucho menos y hace lo mismo.
export default function VideoEmbed({ video, title }: { video: Video; title: string }) {
  return (
    <iframe
      src={embedUrl(video)}
      title={title}
      className="video-embed"
      loading="lazy"
      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
      allowFullScreen
    />
  );
}
