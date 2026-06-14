import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import { VIDEOS, type VideoItem } from "@/data/news";

function VideoCard({ item, index }: { item: VideoItem; index: number }) {
  return (
    <Link
      to={`/videos/${item.id}`}
      className="news-card animate-fade-in group cursor-pointer block"
      style={{ animationDelay: `${index * 60}ms`, opacity: 0 }}
    >
      {/* Thumbnail with play + duration */}
      <div className="relative rounded-lg overflow-hidden bg-muted aspect-video mb-3">
        <img
          src={item.thumb}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-200">
            <Icon name="Play" size={20} className="text-black ml-0.5" fallback="Play" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-mono px-1.5 py-0.5 rounded">
          {item.duration}
        </span>
      </div>

      {/* Info */}
      <h2 className="text-sm font-semibold leading-snug mb-1.5 group-hover:text-accent transition-colors line-clamp-2">
        {item.title}
      </h2>
      <p className="text-xs text-muted-foreground">{item.channel}</p>
      <p className="text-xs text-muted-foreground font-mono mt-0.5">
        {item.views} просмотров · {item.date}
      </p>
    </Link>
  );
}

export default function Videos() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Play" size={20} className="text-accent" />
          <h1 className="text-2xl font-bold">Видеоролики</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
          {VIDEOS.map((item, i) => (
            <VideoCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}