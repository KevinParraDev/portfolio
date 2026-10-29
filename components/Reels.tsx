import VideoEmbed from "./VideoEmbed";
import type { Video } from "@/data/projects";

const reels: { title: string; video: Video }[] = [
  { title: "Game Development", video: { provider: "vimeo", id: "999400663" } },
  { title: "Animation", video: { provider: "vimeo", id: "999399984" } },
];

export default function Reels() {
  return (
    <div>
      <h1 className="subtitulo">Reels</h1>
      <div className="contenedor-reel">
        <div className="videos-proyectos">
          {reels.map(({ title, video }) => (
            <div key={title}>
              <h2 className="subtitulo-videos">{title}</h2>
              <div className="reel">
                <VideoEmbed video={video} title={`${title} reel`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
