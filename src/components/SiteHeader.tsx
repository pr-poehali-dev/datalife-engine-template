import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useTheme } from "@/hooks/use-theme";
import LogoMenu from "@/components/LogoMenu";

export default function SiteHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/60">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
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
            <Link to="/profile" className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground hover:bg-muted transition-colors text-sm font-semibold">
              А
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}