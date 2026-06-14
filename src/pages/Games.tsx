import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import { GAMES, type GameItem } from "@/data/news";

function ratingColor(r: number) {
  if (r >= 9) return "bg-emerald-500";
  if (r >= 8) return "bg-lime-500";
  if (r >= 7) return "bg-amber-500";
  return "bg-orange-500";
}

function GameCard({ item, index }: { item: GameItem; index: number }) {
  return (
    <Link
      to={`/games/${item.id}`}
      className="news-card animate-fade-in group cursor-pointer rounded-lg overflow-hidden border border-border bg-card hover:shadow-lg transition-shadow block"
      style={{ animationDelay: `${index * 60}ms`, opacity: 0 }}
    >
      {/* Cover with rating badge */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        <img
          src={item.cover}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
        <span className={`absolute top-2 right-2 ${ratingColor(item.rating)} text-white text-sm font-bold px-2 py-0.5 rounded`}>
          {item.rating.toFixed(1)}
        </span>
        <span className="absolute bottom-2 left-2 category-tag bg-white/15 text-white px-2 py-0.5 rounded-sm backdrop-blur-sm">
          {item.genre}
        </span>
      </div>

      {/* Info */}
      <div className="p-3">
        <h2 className="text-sm font-bold leading-snug mb-1 group-hover:text-accent transition-colors line-clamp-1">
          {item.title}
        </h2>
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Icon name="Gamepad2" size={12} />
          {item.platform}
        </p>
        <p className="text-xs text-muted-foreground font-mono mt-1">{item.date}</p>
      </div>
    </Link>
  );
}

export default function Games() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Gamepad2" size={20} className="text-accent" />
          <h1 className="text-2xl font-bold">Видеоигры</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {GAMES.map((item, i) => (
            <GameCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}