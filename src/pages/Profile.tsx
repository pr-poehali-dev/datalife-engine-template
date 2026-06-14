import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useTheme } from "@/hooks/use-theme";
import LogoMenu from "@/components/LogoMenu";
import { NEWS, CATEGORY_COLORS } from "@/data/news";

type Tab = "posts" | "bookmarks" | "settings";

const USER = {
  name: "Иван Петров",
  username: "ivan_petrov",
  joined: "Регистрация: март 2025",
  bio: "Технологический журналист. Пишу про ИИ, стартапы и будущее веба.",
  stats: { posts: 24, bookmarks: 18, rating: 4820 },
};

function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-xl font-bold">{value.toLocaleString("ru")}</div>
      <div className="text-xs text-muted-foreground font-mono uppercase tracking-wide">{label}</div>
    </div>
  );
}

function PostRow({ id }: { id: number }) {
  const item = NEWS.find((n) => n.id === id)!;
  return (
    <Link to={`/news/${item.id}`} className="flex items-center justify-between py-4 border-b border-border last:border-0 group">
      <div className="min-w-0 pr-4">
        <span className={`category-tag px-2 py-0.5 rounded-sm ${CATEGORY_COLORS[item.category] || "bg-gray-50 text-gray-600"}`}>
          {item.category}
        </span>
        <p className="text-sm font-medium mt-1.5 line-clamp-1 group-hover:text-accent transition-colors">{item.title}</p>
        <p className="text-xs text-muted-foreground font-mono mt-1">{item.date} · {item.diggs} рейтинг</p>
      </div>
      <Icon name="ArrowUpRight" size={16} className="text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
    </Link>
  );
}

export default function Profile() {
  const [tab, setTab] = useState<Tab>("posts");
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14">
            <LogoMenu />
            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label="Сменить тему"
                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-secondary"
              >
                <Icon name={theme === "dark" ? "Sun" : "Moon"} size={16} />
              </button>
              <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="ArrowLeft" size={15} />
                К ленте
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 animate-fade-in">
        {/* Profile head */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 pb-8 border-b border-border">
          <div className="w-20 h-20 rounded-full bg-foreground text-primary-foreground flex items-center justify-center text-3xl font-bold flex-shrink-0">
            {USER.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold">{USER.name}</h1>
            <p className="text-sm text-muted-foreground font-mono">@{USER.username}</p>
            <p className="text-sm text-foreground/80 mt-2 max-w-lg">{USER.bio}</p>
            <p className="text-xs text-muted-foreground font-mono mt-1">{USER.joined}</p>
          </div>
          <div className="flex gap-6 md:flex-col md:gap-3 md:items-end">
            <div className="flex gap-6">
              <StatBox value={USER.stats.posts} label="публикаций" />
              <StatBox value={USER.stats.bookmarks} label="закладок" />
              <StatBox value={USER.stats.rating} label="рейтинг" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border mt-6 mb-6">
          {([
            { id: "posts", label: "Мои публикации", icon: "FileText" },
            { id: "bookmarks", label: "Закладки", icon: "Bookmark" },
            { id: "settings", label: "Настройки", icon: "Settings" },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm border-b-2 -mb-px transition-all duration-150 ${
                tab === t.id
                  ? "border-foreground text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon name={t.icon} size={15} />
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "posts" && (
          <div className="animate-fade-in">
            {[1, 3, 4, 8].map((id) => <PostRow key={id} id={id} />)}
          </div>
        )}

        {tab === "bookmarks" && (
          <div className="animate-fade-in">
            {[6, 2, 5].map((id) => <PostRow key={id} id={id} />)}
          </div>
        )}

        {tab === "settings" && (
          <div className="animate-fade-in max-w-md space-y-5">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-muted-foreground mb-1.5">Имя</label>
              <input defaultValue={USER.name} className="w-full text-sm border border-border rounded px-3 py-2.5 bg-card outline-none focus:border-foreground transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-muted-foreground mb-1.5">Email</label>
              <input type="email" defaultValue="ivan@email.com" className="w-full text-sm border border-border rounded px-3 py-2.5 bg-card outline-none focus:border-foreground transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-muted-foreground mb-1.5">О себе</label>
              <textarea defaultValue={USER.bio} rows={3} className="w-full text-sm border border-border rounded px-3 py-2.5 bg-card outline-none focus:border-foreground transition-colors resize-none" />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-muted-foreground mb-1.5">Новый пароль</label>
              <input type="password" placeholder="••••••••" className="w-full text-sm border border-border rounded px-3 py-2.5 bg-card outline-none focus:border-foreground transition-colors" />
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button className="bg-foreground text-primary-foreground text-sm font-medium px-5 py-2.5 rounded hover:bg-accent transition-colors">
                Сохранить изменения
              </button>
              <button className="flex items-center gap-1.5 text-sm text-destructive px-4 py-2.5 rounded hover:bg-secondary transition-colors">
                <Icon name="LogOut" size={15} />
                Выйти
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
