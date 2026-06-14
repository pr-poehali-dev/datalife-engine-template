import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { useTheme } from "@/hooks/use-theme";
import LogoMenu from "@/components/LogoMenu";

type Mode = "login" | "register";

export default function Auth() {
  const [mode, setMode] = useState<Mode>("login");
  const { theme, toggleTheme } = useTheme();

  const isLogin = mode === "login";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
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
              <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="ArrowLeft" size={15} />
                К ленте
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Tabs */}
          <div className="flex p-1 bg-secondary rounded-lg mb-8">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 text-sm py-2 rounded-md transition-all duration-200 ${
                isLogin ? "bg-card text-foreground shadow-sm font-medium" : "text-muted-foreground"
              }`}
            >
              Вход
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 text-sm py-2 rounded-md transition-all duration-200 ${
                !isLogin ? "bg-card text-foreground shadow-sm font-medium" : "text-muted-foreground"
              }`}
            >
              Регистрация
            </button>
          </div>

          <h1 className="text-2xl font-bold mb-1">
            {isLogin ? "С возвращением" : "Создать аккаунт"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {isLogin ? "Войдите, чтобы продолжить чтение" : "Присоединяйтесь к сообществу читателей"}
          </p>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="animate-fade-in">
                <label className="block text-xs font-mono uppercase tracking-wide text-muted-foreground mb-1.5">
                  Имя пользователя
                </label>
                <div className="relative">
                  <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="ivan_petrov"
                    className="w-full text-sm border border-border rounded pl-9 pr-3 py-2.5 bg-card outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono uppercase tracking-wide text-muted-foreground mb-1.5">
                Email
              </label>
              <div className="relative">
                <Icon name="Mail" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full text-sm border border-border rounded pl-9 pr-3 py-2.5 bg-card outline-none focus:border-foreground transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono uppercase tracking-wide text-muted-foreground">
                  Пароль
                </label>
                {isLogin && (
                  <a href="#" className="text-xs text-accent hover:underline">Забыли?</a>
                )}
              </div>
              <div className="relative">
                <Icon name="Lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full text-sm border border-border rounded pl-9 pr-3 py-2.5 bg-card outline-none focus:border-foreground transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-foreground text-primary-foreground text-sm font-medium py-2.5 rounded hover:bg-accent transition-colors duration-150 mt-2"
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground font-mono">или</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-2">
            <button className="w-full flex items-center justify-center gap-2 text-sm border border-border rounded py-2.5 hover:bg-secondary transition-colors">
              <Icon name="Mail" size={16} />
              Продолжить с Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 text-sm border border-border rounded py-2.5 hover:bg-secondary transition-colors">
              <Icon name="Send" size={16} />
              Продолжить с Telegram
            </button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed">
            Продолжая, вы соглашаетесь с{" "}
            <a href="#" className="text-foreground hover:underline">правилами</a> и{" "}
            <a href="#" className="text-foreground hover:underline">политикой конфиденциальности</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
