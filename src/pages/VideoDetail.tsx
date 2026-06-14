import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import { VIDEOS, VIDEO_DESC } from "@/data/news";

export default function VideoDetail() {
  const { id } = useParams();
  const item = VIDEOS.find((v) => v.id === Number(id));
  const [playing, setPlaying] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Видео не найдено</p>
        <Link to="/videos" className="text-sm text-accent hover:underline">К видеороликам</Link>
      </div>
    );
  }

  const more = VIDEOS.filter((v) => v.id !== item.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-6 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player + info */}
          <div className="lg:col-span-2">
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
          </div>

          {/* Up next */}
          <aside className="space-y-4">
            <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest pb-2 border-b border-border">
              Смотреть далее
            </h3>
            {more.map((v) => (
              <Link key={v.id} to={`/videos/${v.id}`} className="flex gap-3 group">
                <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                  <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-mono px-1 rounded">{v.duration}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-accent transition-colors">{v.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{v.channel}</p>
                  <p className="text-xs text-muted-foreground font-mono">{v.views} просмотров</p>
                </div>
              </Link>
            ))}
          </aside>
        </div>
      </main>
    </div>
  );
}
