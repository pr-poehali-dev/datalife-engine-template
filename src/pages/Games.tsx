import { useState, useMemo } from "react";
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

// Платформа из строки "PC, PS5, Xbox" → ["PC","PS5","Xbox"]
function splitPlatforms(s: string) {
  return s.split(",").map((p) => p.trim());
}

const ALL_GENRES = Array.from(new Set(GAMES.map((g) => g.genre)));
const ALL_PLATFORMS = Array.from(new Set(GAMES.flatMap((g) => splitPlatforms(g.platform))));

type SortKey = "rating" | "new" | "name";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "rating", label: "По рейтингу" },
  { key: "new", label: "Новинки" },
  { key: "name", label: "По названию" },
];

function GameCard({ item, index }: { item: GameItem; index: number }) {
  return (
    <Link
      to={`/games/${item.id}`}
      className="animate-fade-in group cursor-pointer rounded-lg overflow-hidden border border-border bg-card hover:shadow-lg transition-shadow block"
      style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}
    >
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

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="flex items-center gap-1 text-xs bg-foreground text-primary-foreground pl-2.5 pr-1.5 py-1 rounded-full hover:bg-accent transition-colors"
    >
      {label}
      <Icon name="X" size={12} />
    </button>
  );
}

export default function Games() {
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState<SortKey>("rating");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggle = (arr: string[], val: string, set: (v: string[]) => void) =>
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);

  const filtered = useMemo(() => {
    let list = GAMES.filter((g) => {
      if (search && !g.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (genres.length && !genres.includes(g.genre)) return false;
      if (platforms.length && !splitPlatforms(g.platform).some((p) => platforms.includes(p))) return false;
      if (g.rating < minRating) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "name") return a.title.localeCompare(b.title);
      return b.id - a.id;
    });
    return list;
  }, [search, genres, platforms, minRating, sort]);

  const hasFilters = genres.length > 0 || platforms.length > 0 || minRating > 0 || search.length > 0;
  const resetAll = () => {
    setSearch(""); setGenres([]); setPlatforms([]); setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Title + search + sort */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Icon name="Gamepad2" size={20} className="text-accent" />
            <h1 className="text-2xl font-bold">Видеоигры</h1>
            <span className="text-sm text-muted-foreground font-mono">({filtered.length})</span>
          </div>

          <div className="flex-1 flex items-center gap-2 md:justify-end">
            <div className="relative flex-1 md:max-w-xs">
              <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск игр..."
                className="w-full text-sm border border-border rounded pl-9 pr-3 py-2 bg-card outline-none focus:border-foreground transition-colors"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="text-sm border border-border rounded px-3 py-2 bg-card outline-none focus:border-foreground transition-colors cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>{o.label}</option>
              ))}
            </select>
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className="lg:hidden flex items-center gap-1.5 text-sm border border-border rounded px-3 py-2 hover:bg-secondary transition-colors"
            >
              <Icon name="SlidersHorizontal" size={15} />
              Фильтры
            </button>
          </div>
        </div>

        {/* Active filter chips */}
        {hasFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            {genres.map((g) => <FilterChip key={g} label={g} onRemove={() => toggle(genres, g, setGenres)} />)}
            {platforms.map((p) => <FilterChip key={p} label={p} onRemove={() => toggle(platforms, p, setPlatforms)} />)}
            {minRating > 0 && <FilterChip label={`Рейтинг ${minRating}+`} onRemove={() => setMinRating(0)} />}
            <button onClick={resetAll} className="text-xs text-accent hover:underline ml-1">Сбросить всё</button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar filters */}
          <aside className={`lg:col-span-1 ${filtersOpen ? "block" : "hidden lg:block"}`}>
            <div className="lg:sticky lg:top-20 space-y-6">
              {/* Genres */}
              <div>
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3 pb-2 border-b border-border">
                  Жанр
                </h3>
                <div className="space-y-1.5">
                  {ALL_GENRES.map((g) => (
                    <label key={g} className="flex items-center gap-2.5 text-sm cursor-pointer group">
                      <span className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        genres.includes(g) ? "bg-foreground border-foreground" : "border-border group-hover:border-foreground"
                      }`}>
                        {genres.includes(g) && <Icon name="Check" size={11} className="text-primary-foreground" />}
                      </span>
                      <input type="checkbox" className="sr-only" checked={genres.includes(g)} onChange={() => toggle(genres, g, setGenres)} />
                      <span className="group-hover:text-foreground text-muted-foreground transition-colors">{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Platforms */}
              <div>
                <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3 pb-2 border-b border-border">
                  Платформа
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_PLATFORMS.map((p) => (
                    <button
                      key={p}
                      onClick={() => toggle(platforms, p, setPlatforms)}
                      className={`text-xs px-2.5 py-1 rounded-sm border transition-colors ${
                        platforms.includes(p)
                          ? "bg-foreground text-primary-foreground border-foreground"
                          : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Min rating */}
              <div>
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                  <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Рейтинг от</h3>
                  <span className="text-sm font-bold">{minRating > 0 ? minRating.toFixed(1) : "—"}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={9.5}
                  step={0.5}
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full accent-accent cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground font-mono mt-1">
                  <span>Любой</span>
                  <span>9.5</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="lg:col-span-3">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filtered.map((item, i) => (
                  <GameCard key={item.id} item={item} index={i} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center text-muted-foreground">
                <Icon name="SearchX" size={36} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm mb-3">По заданным фильтрам ничего не найдено</p>
                <button onClick={resetAll} className="text-sm text-accent hover:underline">Сбросить фильтры</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
