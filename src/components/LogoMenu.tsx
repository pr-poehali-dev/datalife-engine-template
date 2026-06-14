import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

const MENU_ITEMS = [
  { label: "Новости", to: "/", icon: "Newspaper", desc: "Свежие материалы" },
  { label: "Видеоролики", to: "/videos", icon: "Play", desc: "Видео и обзоры" },
  { label: "Видеоигры", to: "/games", icon: "Gamepad2", desc: "Гейминг и новинки" },
];

export default function LogoMenu() {
  const location = useLocation();

  // Определяем активный раздел по адресу страницы
  const activeSection =
    location.pathname.startsWith("/videos")
      ? MENU_ITEMS[1]
      : location.pathname.startsWith("/games")
      ? MENU_ITEMS[2]
      : null;

  return (
    <div className="relative group/logo">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="w-7 h-7 bg-foreground rounded-sm flex items-center justify-center group-hover:bg-accent transition-colors duration-200">
          <Icon name="Zap" size={14} className="text-primary-foreground" />
        </div>
        <span className="text-lg font-bold tracking-tight">НОВОСТИ</span>
        {activeSection && (
          <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground animate-fade-in">
            <span className="text-border">/</span>
            <Icon name={activeSection.icon} size={13} className="text-accent" />
            {activeSection.label}
          </span>
        )}
        <Icon
          name="ChevronDown"
          size={14}
          className="text-muted-foreground transition-transform duration-200 group-hover/logo:rotate-180"
        />
      </Link>

      {/* Dropdown */}
      <div className="absolute left-0 top-full pt-2 w-60 opacity-0 invisible -translate-y-1 group-hover/logo:opacity-100 group-hover/logo:visible group-hover/logo:translate-y-0 transition-all duration-200 z-50">
        <div className="bg-card border border-border rounded-lg shadow-lg p-1.5">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-secondary transition-colors group/item"
            >
              <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center flex-shrink-0 group-hover/item:bg-accent group-hover/item:text-white transition-colors">
                <Icon name={item.icon} size={16} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}