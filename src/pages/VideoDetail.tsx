import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import { VIDEOS, VIDEO_DESC, type VideoItem } from "@/data/news";

function NavButton({ video, side }: { video: VideoItem; side: "prev" | "next" }) {
  const isPrev = side === "prev";
  return (
    <Link
      to={`/videos/${video.id}`}
      className="group hidden xl:flex flex-col items-center w-40 flex-shrink-0 pt-2"
      title={isPrev ? "Предыдущее видео" : "Следующее видео"}
    >
      {/* Mini preview as a button */}
      <div className="relative w-full rounded-lg overflow-hidden bg-muted aspect-video border border-border group-hover:border-foreground transition-colors">
        <img src={video.thumb} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-9 h-9 rounded-full bg-background/90 border border-border flex items-center justify-center group-hover:bg-accent group-hover:text-white group-hover:scale-110 transition-all">
            <Icon name={isPrev ? "ChevronLeft" : "ChevronRight"} size={18} />
          </span>
        </div>
        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-mono px-1 rounded">{video.duration}</span>
      </div>
      <span className="text-[11px] font-mono uppercase tracking-wide text-muted-foreground mt-2">
        {isPrev ? "Предыдущее" : "Следующее"}
      </span>
      <p className="text-xs font-medium text-center leading-snug line-clamp-2 mt-1 group-hover:text-accent transition-colors">
        {video.title}
      </p>
    </Link>
  );
}

export default function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);

  const index = VIDEOS.findIndex((v) => v.id === Number(id));
  const item = VIDEOS[index];

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Видео не найдено</p>
        <Link to="/videos" className="text-sm text-accent hover:underline">К видеороликам</Link>
      </div>
    );
  }

  // Соседние видео (по кругу)
  const prev = VIDEOS[(index - 1 + VIDEOS.length) % VIDEOS.length];
  const next = VIDEOS[(index + 1) % VIDEOS.length];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 animate-fade-in">
        <div className="flex items-start justify-center gap-5">
          {/* Prev */}
          <NavButton video={prev} side="prev" />

          {/* Center column */}
          <div className="w-full max-w-3xl">
            {/* Player */}
            <div className="relative rounded-xl overflow-hidden bg-black aspect-video mb-4">
              <img
                src={item.thumb}
                alt={item.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${playing ? "opacity-40" : "opacity-100"}`}
              />
              {!playing ? (
                <button
                  onClick={() => setPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                >
                  <span className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name="Play" size={28} className="text-black ml-1" />
                  </span>
                </button>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-2">
                  <Icon name="Loader" size={28} className="animate-spin opacity-70" />
                  <span className="text-xs font-mono opacity-70">Воспроизведение...</span>
                </div>
              )}
              <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-mono px-2 py-0.5 rounded">
                {item.duration}
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-bold leading-tight mb-2">{item.title}</h1>
            <p className="text-sm text-muted-foreground font-mono mb-4">
              {item.views} просмотров · {item.date}
            </p>

            {/* Channel + actions */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-foreground text-primary-foreground flex items-center justify-center font-bold">
                  {item.channel.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{item.channel}</p>
                  <p className="text-xs text-muted-foreground">128K подписчиков</p>
                </div>
              </div>
              <button className="text-sm bg-foreground text-primary-foreground px-4 py-2 rounded-full hover:bg-accent transition-colors">
                Подписаться
              </button>
            </div>

            {/* Description */}
            <div className="py-4 text-sm leading-relaxed text-foreground/90">
              {item.description || VIDEO_DESC}
            </div>

            {/* Mobile prev/next (когда боковые кнопки скрыты) */}
            <div className="grid grid-cols-2 gap-3 xl:hidden mt-2">
              <button
                onClick={() => navigate(`/videos/${prev.id}`)}
                className="flex items-center gap-2 border border-border rounded-lg p-2 hover:border-foreground transition-colors text-left"
              >
                <Icon name="ChevronLeft" size={18} className="text-muted-foreground flex-shrink-0" />
                <div className="relative w-16 h-10 flex-shrink-0 rounded overflow-hidden bg-muted">
                  <img src={prev.thumb} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-medium line-clamp-2">{prev.title}</span>
              </button>
              <button
                onClick={() => navigate(`/videos/${next.id}`)}
                className="flex items-center gap-2 border border-border rounded-lg p-2 hover:border-foreground transition-colors text-right"
              >
                <span className="text-xs font-medium line-clamp-2">{next.title}</span>
                <div className="relative w-16 h-10 flex-shrink-0 rounded overflow-hidden bg-muted">
                  <img src={next.thumb} alt="" className="w-full h-full object-cover" />
                </div>
                <Icon name="ChevronRight" size={18} className="text-muted-foreground flex-shrink-0" />
              </button>
            </div>
          </div>

          {/* Next */}
          <NavButton video={next} side="next" />
        </div>
      </main>
    </div>
  );
}
