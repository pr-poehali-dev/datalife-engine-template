{headers}
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[title]</title>
    <link rel="stylesheet" href="{THEME}/css/style.css">
</head>
<body>

<!-- ============ ШАПКА ============ -->
<header class="site-header">
    <div class="wrap">
        <div class="header-inner">
            <a href="{HOME}" class="logo">
                <span class="logo-mark">⚡</span>
                <span class="logo-text">НОВОСТИ</span>
            </a>

            <!-- Навигация по категориям DLE -->
            <nav class="main-nav">
                [category=0]<a href="{HOME}" class="active">Все</a>[/category]
                {categorymenu}
            </nav>

            <div class="header-actions">
                <!-- Поиск DLE -->
                <form method="get" action="{HOME}index.php?do=search" class="search-form">
                    <input type="hidden" name="do" value="search">
                    <input type="hidden" name="subaction" value="search">
                    <input type="text" name="story" placeholder="Поиск...">
                </form>
                [not-group=5]<a href="{HOME}index.php?do=addnews" class="btn-add">+ Добавить</a>[/not-group]
                [group=5]<a href="{HOME}index.php?do=register" class="btn-add">Войти</a>[/group]
            </div>
        </div>
    </div>
</header>

<!-- ============ КОНТЕНТ ============ -->
<div class="wrap">
    <div class="layout">
        <!-- Лента новостей (сюда DLE подставляет shortstory.tpl / fullstory.tpl) -->
        <main>
            <h2 class="section-title">Последние новости</h2>
            {content}

            <!-- Постраничная навигация DLE -->
            <div class="pagination">{navigation}</div>
        </main>

        <!-- Сайдбар -->
        <aside class="sidebar">
            <!-- Тренды: популярные новости -->
            <div class="side-block">
                <h3>Тренды</h3>
                {topnews limit="5"}
            </div>

            <!-- Подписка -->
            <div class="newsletter">
                <h3>Дайджест</h3>
                <p>Лучшие материалы недели прямо на почту. Без спама.</p>
                <form method="post" action="">
                    <input type="email" name="subscribe_email" placeholder="your@email.com">
                    <button type="submit">Подписаться</button>
                </form>
            </div>

            <!-- Облако тегов DLE -->
            <div class="side-block">
                <h3>Теги</h3>
                <div class="tag-cloud">{tagscloud}</div>
            </div>
        </aside>
    </div>
</div>

<!-- ============ ФУТЕР ============ -->
<footer class="site-footer">
    <div class="wrap">
        <div class="footer-inner">
            <div class="logo">
                <span class="logo-mark" style="width:20px;height:20px;font-size:11px;">⚡</span>
                <span class="logo-text" style="font-size:14px;">НОВОСТИ</span>
                <span class="author-date" style="margin-left:8px;">© {date=Y}</span>
            </div>
            <nav class="footer-nav">
                <a href="{HOME}index.php?do=feedback">О нас</a>
                <a href="{HOME}index.php?do=feedback">Реклама</a>
                <a href="{HOME}index.php?do=feedback">Контакты</a>
                <a href="{HOME}index.php?do=rules">Правила</a>
                <a href="{HOME}index.php?do=pm">Конфиденциальность</a>
            </nav>
        </div>
    </div>
</footer>

{login}
</body>
</html>
