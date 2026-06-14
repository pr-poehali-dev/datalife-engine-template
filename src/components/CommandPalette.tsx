import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Icon from "@/components/ui/icon";
import { NEWS, VIDEOS, GAMES } from "@/data/news";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Открытие по Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "л") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Кнопка-триггер для шапки */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-lg px-3 py-1.5 hover:border-foreground transition-colors bg-card/50"
      >
        <Icon name="Search" size={14} />
        <span>Поиск</span>
        <kbd className="ml-2 text-[10px] font-mono bg-secondary px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Поиск по новостям, видео и играм..." />
        <CommandList>
          <CommandEmpty>Ничего не найдено.</CommandEmpty>

          <CommandGroup heading="Разделы">
            <CommandItem onSelect={() => go("/")}>
              <Icon name="Newspaper" size={16} className="mr-2" /> Новости
            </CommandItem>
            <CommandItem onSelect={() => go("/videos")}>
              <Icon name="Play" size={16} className="mr-2" /> Видеоролики
            </CommandItem>
            <CommandItem onSelect={() => go("/games")}>
              <Icon name="Gamepad2" size={16} className="mr-2" /> Видеоигры
            </CommandItem>
            <CommandItem onSelect={() => go("/profile")}>
              <Icon name="User" size={16} className="mr-2" /> Профиль
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Новости">
            {NEWS.slice(0, 6).map((n) => (
              <CommandItem key={`n-${n.id}`} value={`новость ${n.title}`} onSelect={() => go(`/news/${n.id}`)}>
                <Icon name="FileText" size={16} className="mr-2 text-muted-foreground" />
                <span className="truncate">{n.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Видео">
            {VIDEOS.slice(0, 5).map((v) => (
              <CommandItem key={`v-${v.id}`} value={`видео ${v.title}`} onSelect={() => go(`/videos/${v.id}`)}>
                <Icon name="Play" size={16} className="mr-2 text-muted-foreground" />
                <span className="truncate">{v.title}</span>
                <span className="ml-auto text-xs text-muted-foreground font-mono">{v.duration}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Игры">
            {GAMES.slice(0, 5).map((g) => (
              <CommandItem key={`g-${g.id}`} value={`игра ${g.title}`} onSelect={() => go(`/games/${g.id}`)}>
                <Icon name="Gamepad2" size={16} className="mr-2 text-muted-foreground" />
                <span className="truncate">{g.title}</span>
                <span className="ml-auto text-xs font-bold text-emerald-500">{g.rating.toFixed(1)}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
