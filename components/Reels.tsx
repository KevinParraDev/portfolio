import VideoEmbed from "./VideoEmbed";
import type { Video } from "@/data/projects";
import type { Dictionary } from "@/i18n/dictionaries";

const reels: { key: "gameDev" | "animation"; video: Video }[] = [
  { key: "gameDev", video: { provider: "vimeo", id: "999400663" } },
  { key: "animation", video: { provider: "vimeo", id: "999399984" } },
];

export default function Reels({ t }: { t: Dictionary["reels"] }) {
  return (
    <div>
      <h1 className="subtitulo" data-reveal>
        {t.title}
      </h1>
      <div className="contenedor-reel">
        <div className="videos-proyectos">
          {reels.map(({ key, video }, i) => (
            <div key={key} data-reveal style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}>
              <h2 className="subtitulo-videos">{t[key]}</h2>
              <div className="reel">
                <VideoEmbed video={video} title={`${t[key]} reel`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
