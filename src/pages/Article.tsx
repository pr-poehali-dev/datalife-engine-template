import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { NEWS, CATEGORY_COLORS, COMMENTS, type Comment } from "@/data/news";

function CommentForm({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={submit} className="mb-8">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Оставьте комментарий..."
        rows={3}
        className="w-full text-sm border border-border rounded p-3 bg-card outline-none focus:border-foreground transition-colors resize-none"
      />
      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={!text.trim()}
          className="text-sm px-5 py-2 bg-foreground text-primary-foreground rounded hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Отправить
        </button>
      </div>
    </form>
  );
}

function CommentRow({ comment }: { comment: Comment }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(comment.likes);

  const toggle = () => {
    if (liked) { setLiked(false); setLikes((n) => n - 1); }
    else { setLiked(true); setLikes((n) => n + 1); }
  };

  return (
    <div className="flex gap-3 py-4 border-b border-border last:border-0">
      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold flex-shrink-0">
        {comment.author.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium">{comment.author}</span>
          <span className="text-xs text-muted-foreground font-mono">{comment.date}</span>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed mb-2">{comment.text}</p>
        <button
          onClick={toggle}
          className={`flex items-center gap-1.5 text-xs transition-colors ${
            liked ? "text-accent" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon name={liked ? "Heart" : "Heart"} size={13} className={liked ? "fill-current" : ""} />
          {likes}
        </button>
      </div>
    </div>
  );
}

export default function Article() {
  const { id } = useParams();
  const item = NEWS.find((n) => n.id === Number(id));

  const [digged, setDigged] = useState(false);
  const [num, setNum] = useState(item?.diggs ?? 0);
  const [bookmarked, setBookmarked] = useState(false);
  const [comments, setComments] = useState(COMMENTS);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Новость не найдена</p>
        <Link to="/" className="text-sm text-accent hover:underline">На главную</Link>
      </div>
    );
  }

  const colorClass = CATEGORY_COLORS[item.category] || "bg-gray-50 text-gray-700";
  const related = NEWS.filter((n) => n.id !== item.id && n.category === item.category).slice(0, 3);

  const addComment = (text: string) => {
    setComments((prev) => [
      { id: Date.now(), author: "Вы", date: "только что", text, likes: 0 },
      ...prev,
    ]);
  };

  const handleDigg = () => {
    if (!digged) { setDigged(true); setNum((n) => n + 1); }
    else { setDigged(false); setNum((n) => n - 1); }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 bg-foreground rounded-sm flex items-center justify-center group-hover:bg-accent transition-colors duration-200">
                <Icon name="Zap" size={14} className="text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight">НОВОСТИ</span>
            </Link>
            <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="ArrowLeft" size={15} />
              К ленте
            </Link>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 md:px-6 py-8 animate-fade-in">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-5">
          <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
          <Icon name="ChevronRight" size={12} />
          <span className={`category-tag px-2 py-0.5 rounded-sm ${colorClass}`}>{item.category}</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{item.title}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{item.excerpt}</p>

        {/* Meta bar */}
        <div className="flex items-center justify-between py-4 border-y border-border mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold">
              {item.author.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium">{item.author}</p>
              <p className="text-xs text-muted-foreground font-mono">{item.date} · {item.readTime} чтения</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDigg}
              className={`flex items-center gap-1.5 text-sm font-mono px-3 py-2 rounded border transition-all ${
                digged ? "bg-orange-500 border-orange-500 text-white" : "border-border hover:border-foreground"
              }`}
            >
              <Icon name="ArrowUp" size={14} />
              {num.toLocaleString("ru")}
            </button>
            <button
              onClick={() => setBookmarked((b) => !b)}
              className={`w-9 h-9 flex items-center justify-center rounded border transition-all ${
                bookmarked ? "bg-foreground border-foreground text-primary-foreground" : "border-border hover:border-foreground text-muted-foreground"
              }`}
            >
              <Icon name="Bookmark" size={15} className={bookmarked ? "fill-current" : ""} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded border border-border hover:border-foreground text-muted-foreground transition-all">
              <Icon name="Share2" size={15} />
            </button>
          </div>
        </div>

        {/* Cover */}
        {item.image && (
          <div className="rounded-lg overflow-hidden bg-muted mb-8">
            <img src={item.image} alt={item.title} className="w-full object-cover" />
          </div>
        )}

        {/* Body */}
        <div className="prose-content space-y-5 mb-10">
          {item.content?.map((para, i) => (
            <p key={i} className="text-base leading-relaxed text-foreground/90">{para}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pb-8 border-b border-border mb-8">
          {["ИИ", "Технологии", "Исследования"].map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 bg-secondary text-secondary-foreground rounded-sm">
              #{tag}
            </span>
          ))}
        </div>

        {/* Comments */}
        <section>
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
            Комментарии
            <span className="text-sm font-normal text-muted-foreground font-mono">({comments.length})</span>
          </h2>
          <CommentForm onAdd={addComment} />
          <div>
            {comments.map((c) => (
              <CommentRow key={c.id} comment={c} />
            ))}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4 pb-2 border-b border-border">
              Похожие материалы
            </h2>
            <div className="space-y-0">
              {related.map((r) => (
                <Link key={r.id} to={`/news/${r.id}`} className="flex items-center justify-between py-3 border-b border-border last:border-0 group">
                  <span className="text-sm font-medium group-hover:text-accent transition-colors line-clamp-1 pr-4">{r.title}</span>
                  <Icon name="ArrowUpRight" size={16} className="text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-foreground rounded-sm flex items-center justify-center">
              <Icon name="Zap" size={10} className="text-primary-foreground" />
            </div>
            <span className="text-sm font-bold">НОВОСТИ</span>
            <span className="text-xs text-muted-foreground font-mono ml-2">© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
