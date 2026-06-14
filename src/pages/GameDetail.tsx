import { useParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import SiteHeader from "@/components/SiteHeader";
import { GAMES, GAME_DESC } from "@/data/news";

function ratingColor(r: number) {
  if (r >= 9) return "bg-emerald-500";
  if (r >= 8) return "bg-lime-500";
  if (r >= 7) return "bg-amber-500";
  return "bg-orange-500";
}

export default function GameDetail() {
  const { id } = useParams();
  const item = GAMES.find((g) => g.id === Number(id));

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Игра не найдена</p>
        <Link to="/games" className="text-sm text-accent hover:underline">К видеоиграм</Link>
      </div>
    );
  }

  const pros = item.pros || ["Качественная графика", "Увлекательный геймплей", "Богатый контент"];
  const cons = item.cons || ["Местами затянутый темп"];
  const more = GAMES.filter((g) => g.id !== item.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <main className="max-w-4xl mx-auto px-4 md:px-6 -mt-24 relative animate-fade-in pb-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cover */}
          <div className="w-40 md:w-48 flex-shrink-0 rounded-xl overflow-hidden shadow-xl border border-border">
            <img src={item.cover} alt={item.title} className="w-full aspect-[3/4] object-cover" />
          </div>

          {/* Head info */}
          <div className="flex-1 pt-2 md:pt-24">
            <span className="category-tag bg-secondary text-secondary-foreground px-2 py-0.5 rounded-sm">{item.genre}</span>
            <h1 className="text-2xl md:text-3xl font-bold mt-2 mb-1">{item.title}</h1>
            <p className="text-sm text-muted-foreground">{item.developer || "Independent Studio"} · {item.date}</p>

            <div className="flex items-center gap-3 mt-4">
              <span className={`${ratingColor(item.rating)} text-white text-lg font-bold px-3 py-1.5 rounded-lg`}>
                {item.rating.toFixed(1)}
              </span>
              <div className="text-sm">
                <p className="font-medium">Оценка редакции</p>
                <p className="text-xs text-muted-foreground">на основе полного прохождения</p>
              </div>
              <button className="ml-auto flex items-center gap-1.5 text-sm bg-foreground text-primary-foreground px-4 py-2 rounded hover:bg-accent transition-colors">
                <Icon name="Gamepad2" size={15} />
                Купить
              </button>
            </div>
          </div>
        </div>

        {/* Meta row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
          {[
            { icon: "Monitor", label: "Платформы", value: item.platform },
            { icon: "Tag", label: "Жанр", value: item.genre },
            { icon: "Calendar", label: "Дата", value: item.date.replace("Релиз: ", "") },
          ].map((m) => (
            <div key={m.label} className="border border-border rounded-lg p-3 bg-card">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono uppercase mb-1">
                <Icon name={m.icon} size={13} />
                {m.label}
              </div>
              <p className="text-sm font-medium">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <section className="mt-8">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3 pb-2 border-b border-border">
            Об игре
          </h2>
          <p className="text-base leading-relaxed text-foreground/90">{item.description || GAME_DESC}</p>
        </section>

        {/* Pros / cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="border border-border rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-3 text-emerald-600">
              <Icon name="ThumbsUp" size={15} /> Плюсы
            </h3>
            <ul className="space-y-2">
              {pros.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Icon name="Check" size={15} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-border rounded-lg p-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold mb-3 text-orange-600">
              <Icon name="ThumbsDown" size={15} /> Минусы
            </h3>
            <ul className="space-y-2">
              {cons.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Icon name="Minus" size={15} className="text-orange-500 mt-0.5 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* More games */}
        <section className="mt-10">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4 pb-2 border-b border-border">
            Другие игры
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {more.map((g) => (
              <Link key={g.id} to={`/games/${g.id}`} className="group">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-muted mb-2">
                  <img src={g.cover} alt={g.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <span className={`absolute top-2 right-2 ${ratingColor(g.rating)} text-white text-xs font-bold px-1.5 py-0.5 rounded`}>{g.rating.toFixed(1)}</span>
                </div>
                <p className="text-sm font-medium line-clamp-1 group-hover:text-accent transition-colors">{g.title}</p>
                <p className="text-xs text-muted-foreground">{g.genre}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
