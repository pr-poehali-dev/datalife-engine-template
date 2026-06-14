<!-- ============================================================
     shortstory-games.tpl — карточка ВИДЕОИГРЫ (обложка + оценка)
     Привязывается к категории "Видеоигры" в админке DLE
     (Категории → правка категории → "Шаблон short-story" = games)
     ============================================================ -->
<article class="game-card">
    <a href="{full-link}" class="game-cover">
        [thumb]{thumb-storyimage}[/thumb]
        <span class="game-overlay"></span>
        <!-- Оценка и жанр — доп. поля {xfvalue_rating}, {xfvalue_genre} -->
        <span class="game-rating">{xfvalue_rating}</span>
        <span class="game-genre">{xfvalue_genre}</span>
    </a>
    <div class="game-info">
        <a href="{full-link}"><h2 class="game-title">{title}</h2></a>
        <p class="game-platform">🎮 {xfvalue_platform}</p>
        <p class="game-date">{date}</p>
    </div>
</article>
