import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useTheme } from "@/hooks/use-theme";
import LogoMenu from "@/components/LogoMenu";
import CommandPalette from "@/components/CommandPalette";
import { NEWS, CATEGORIES, CATEGORY_COLORS, type NewsItem } from "@/data/news";

function DiggCount({ count }: { count: number }) {
  const [digged, setDigged] = useState(false);
  const [num, setNum] = useState(count);

  const handleDigg = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!digged) { setDigged(true); setNum((n) => n + 1); }
    else { setDigged(false); setNum((n) => n - 1); }
  };

  return (
    <button
      onClick={handleDigg}
      className={`flex items-center gap-1.5 text-xs font-mono transition-all duration-200 group ${
        digged ? "text-orange-500" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <span className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 ${
        digged ? "bg-orange-500 border-orange-500 text-white" : "border-border group-hover:border-foreground"
      }`}>
        <Icon name="ArrowUp" size={11} />
      </span>
      <span>{num.toLocaleString("ru")}</span>
    </button>
  );
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const colorClass = CATEGORY_COLORS[item.category] || "bg-gray-50 text-gray-700";

  return (
    <article
      className="news-card animate-fade-in group cursor-pointer"
      style={{ animationDelay: `${index * 60}ms`, opacity: 0 }}
    >
      <div className="flex gap-4 py-5 border-b border-border">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2.5">
            <span className={`category-tag px-2 py-0.5 rounded-sm ${colorClass}`}>
              {item.category}
            </span>
            <span className="text-xs text-muted-foreground font-mono">{item.date}</span>
            <span className="text-xs text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground font-mono">{item.readTime}</span>
          </div>
          <Link to={`/news/${item.id}`}>
            <h2 className="text-base font-semibold leading-snug mb-2 group-hover:text-accent transition-colors duration-150 story-link inline">
              {item.title}
            </h2>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2 mt-2">
            {item.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{item.author}</span>
            <DiggCount count={item.diggs} />
          </div>
        </div>
        {item.image && (
          <Link to={`/news/${item.id}`} className="flex-shrink-0 w-28 h-20 md:w-36 md:h-24 rounded overflow-hidden bg-muted">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        )}
      </div>
    </article>
  );
}

function BentoTile({ item, big = false }: { item: NewsItem; big?: boolean }) {
  const colorClass = CATEGORY_COLORS[item.category] || "bg-gray-50 text-gray-700";
  return (
    <Link
      to={`/news/${item.id}`}
      className={`group relative overflow-hidden rounded-xl bg-foreground text-primary-foreground ${
        big ? "md:row-span-2 min-h-[260px] md:min-h-[420px]" : "min-h-[200px]"
      }`}
    >
      {item.image ? (
        <>
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-foreground to-secondary opacity-90" />
      )}
      <div className={`relative h-full flex flex-col justify-end ${big ? "p-6 md:p-7" : "p-5"}`}>
        <span className={`category-tag self-start px-2 py-0.5 rounded-sm mb-2 ${big ? "bg-accent text-white" : colorClass}`}>
          {item.category}
        </span>
        <h3 className={`font-bold leading-tight group-hover:text-white/90 transition-colors ${big ? "text-xl md:text-2xl" : "text-base"} line-clamp-3`}>
          {item.title}
        </h3>
        <div className="flex items-center gap-2 mt-2 text-white/60 text-xs font-mono">
          <span>{item.date}</span>
          <span>·</span>
          <span className="flex items-center gap-1"><Icon name="ArrowUp" size={11} />{item.diggs.toLocaleString("ru")}</span>
        </div>
      </div>
    </Link>
  );
}

function BentoSection({ items }: { items: NewsItem[] }) {
  const [big, ...rest] = items;
  if (!big) return null;
  return (
    <section className="mb-8 animate-fade-in">
      <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3">
        Главное сейчас
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
        <div className="md:col-span-2 md:row-span-2">
          <BentoTile item={big} big />
        </div>
        {rest.slice(0, 2).map((it) => (
          <BentoTile key={it.id} item={it} />
        ))}
      </div>
    </section>
  );
}

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { theme, toggleTheme } = useTheme();

  const featured = NEWS.find((n) => n.featured)!;
  const filtered = NEWS.filter((n) => !n.featured)
    .filter((n) => activeCategory === "Все" ? true : n.category === activeCategory)
    .filter((n) => searchValue
      ? n.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        n.excerpt.toLowerCase().includes(searchValue.toLowerCase())
      : true
    );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/60">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14">
            <LogoMenu />

            <nav
              className={`hidden md:flex items-center gap-1 transition-all duration-300 ease-out ${
                searchOpen
                  ? "opacity-0 -translate-x-4 pointer-events-none"
                  : "opacity-100 translate-x-0"
              }`}
            >
              {CATEGORIES.slice(1).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat === activeCategory ? "Все" : cat)}
                  className={`px-3 py-1.5 text-sm rounded transition-all duration-150 ${
                    activeCategory === cat
                      ? "bg-foreground text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 flex-1 justify-end">
              <div
                className={`flex items-center transition-all duration-300 ease-out ${
                  searchOpen ? "flex-1 max-w-md" : "max-w-[2rem]"
                }`}
              >
                {searchOpen && (
                  <input
                    autoFocus
                    type="text"
                    placeholder="Поиск по новостям..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Escape") { setSearchOpen(false); setSearchValue(""); } }}
                    className="flex-1 text-sm border border-border rounded px-3 py-1.5 bg-background outline-none focus:border-foreground transition-colors animate-fade-in"
                  />
                )}
                <button
                  onClick={() => { if (searchOpen) { setSearchValue(""); } setSearchOpen((s) => !s); }}
                  className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-secondary ml-1"
                >
                  <Icon name={searchOpen ? "X" : "Search"} size={16} />
                </button>
              </div>

              <button
                className={`hidden md:flex items-center gap-1.5 text-sm px-3 py-1.5 bg-foreground text-primary-foreground rounded hover:bg-accent transition-all duration-300 ${
                  searchOpen ? "opacity-0 w-0 px-0 overflow-hidden pointer-events-none" : "opacity-100"
                }`}
              >
                <Icon name="Plus" size={14} />
                Добавить
              </button>
              <CommandPalette />
              <button
                onClick={toggleTheme}
                aria-label="Сменить тему"
                className="w-8 h-8 flex-shrink-0 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-secondary"
              >
                <Icon name={theme === "dark" ? "Sun" : "Moon"} size={16} />
              </button>
              <Link to="/profile" className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-muted transition-colors text-sm font-semibold">
                А
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile categories */}
      <div className="md:hidden border-b border-border bg-background overflow-x-auto">
        <div className="flex gap-0 px-4 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-2.5 text-sm whitespace-nowrap border-b-2 transition-all duration-150 ${
                activeCategory === cat
                  ? "border-foreground text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tags bar (под навигацией) */}
      <div className="border-b border-border bg-background">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-2.5 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wide flex-shrink-0">
            Теги:
          </span>
          {["ИИ", "Стартапы", "Космос", "Климат", "Крипто", "Биотех", "Робототехника", "Квантум", "Кибербез"].map((tag) => (
            <a
              key={tag}
              href="#"
              className="text-xs whitespace-nowrap px-2.5 py-1 bg-secondary text-secondary-foreground rounded-sm hover:bg-foreground hover:text-primary-foreground transition-all duration-150 flex-shrink-0"
            >
              #{tag}
            </a>
          ))}
        </div>
      </div>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-6">
        {/* Bento-сетка «Главное сейчас» */}
        {activeCategory === "Все" && !searchValue && (
          <BentoSection items={[featured, ...NEWS.filter((n) => !n.featured)]} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feed */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                {activeCategory === "Все" ? "Последние новости" : activeCategory}
              </h2>
              {searchValue && (
                <span className="text-xs text-muted-foreground font-mono">
                  {filtered.length} результатов
                </span>
              )}
            </div>

            {filtered.length > 0 ? (
              <div>
                {filtered.map((item, i) => (
                  <NewsCard key={item.id} item={item} index={i} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center text-muted-foreground">
                <Icon name="Search" size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Ничего не найдено</p>
              </div>
            )}

            {filtered.length > 0 && (
              <div className="pt-6 text-center">
                <button className="text-sm text-muted-foreground hover:text-foreground font-mono border border-border px-6 py-2.5 rounded hover:border-foreground transition-all duration-150">
                  Загрузить ещё
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-6">
            <div>
              <h3 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-3 pb-2 border-b border-border">
                Тренды
              </h3>
              <div className="space-y-0">
                {[...NEWS].sort((a, b) => b.diggs - a.diggs).slice(0, 5).map((item, i) => (
                  <Link key={item.id} to={`/news/${item.id}`} className="flex items-start gap-3 py-3 border-b border-border last:border-0 group">
                    <span className="text-2xl font-black text-border group-hover:text-muted-foreground transition-colors leading-none mt-0.5 min-w-[2rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug group-hover:text-accent transition-colors line-clamp-2">
                        {item.title}
                      </p>
                      <span className={`category-tag mt-1 inline-block px-1.5 py-0.5 rounded-sm ${CATEGORY_COLORS[item.category] || "bg-gray-50 text-gray-600"}`}>
                        {item.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-foreground text-primary-foreground rounded-lg p-5">
              <h3 className="font-bold text-base mb-1">Дайджест</h3>
              <p className="text-xs text-white/60 mb-4 leading-relaxed">
                Лучшие материалы недели прямо на почту. Без спама.
              </p>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full text-sm bg-white/10 border border-white/20 rounded px-3 py-2 placeholder-white/30 text-white outline-none focus:border-white/50 mb-2 transition-colors"
              />
              <button className="w-full text-sm bg-accent text-white py-2 rounded hover:bg-orange-600 transition-colors font-medium">
                Подписаться
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-foreground rounded-sm flex items-center justify-center">
                <Icon name="Zap" size={10} className="text-primary-foreground" />
              </div>
              <span className="text-sm font-bold">НОВОСТИ</span>
              <span className="text-xs text-muted-foreground font-mono ml-2">© 2026</span>
            </div>
            <nav className="flex items-center gap-4">
              {["О нас", "Реклама", "Контакты", "Правила", "Конфиденциальность"].map((link) => (
                <a key={link} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}