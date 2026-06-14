<!-- ============================================================
     fullstory-games.tpl — страница ВИДЕОИГРЫ (обзор с оценкой)
     Привязка: Категории → Видеоигры →
     "Шаблон full-story" = games
     Доп. поля: rating, genre, platform, developer, pros, cons, video
     ============================================================ -->
<div class="game-page">
    <!-- Hero-обложка -->
    <div class="game-hero">
        [thumb]{thumb-storyimage}[/thumb]
        <div class="game-hero-overlay"></div>
    </div>

    <div class="game-page-inner">
        <div class="game-page-head">
            <div class="game-page-cover">[thumb]{thumb-storyimage}[/thumb]</div>
            <div class="game-page-info">
                <span class="category-tag cat-default">{xfvalue_genre}</span>
                <h1>{title}</h1>
                <p class="game-page-dev">{xfvalue_developer} · {date}</p>

                <div class="game-score-row">
                    <span class="game-score">{xfvalue_rating}</span>
                    <div>
                        <p class="game-score-label">Оценка редакции</p>
                        <p class="game-score-sub">на основе полного прохождения</p>
                    </div>
                    [xfvalue_buylink]<a href="{xfvalue_buylink}" class="btn-add" style="margin-left:auto;">🎮 Купить</a>[/xfvalue_buylink]
                </div>
            </div>
        </div>

        <!-- Характеристики -->
        <div class="game-meta-grid">
            <div class="game-meta-box"><span class="game-meta-label">Платформы</span><b>{xfvalue_platform}</b></div>
            <div class="game-meta-box"><span class="game-meta-label">Жанр</span><b>{xfvalue_genre}</b></div>
            <div class="game-meta-box"><span class="game-meta-label">Разработчик</span><b>{xfvalue_developer}</b></div>
        </div>

        <!-- Описание -->
        <section style="margin-top:32px;">
            <h2 class="side-block-title">Об игре</h2>
            <div class="article-body">{full-story}</div>
        </section>

        <!-- Плюсы / минусы (доп. поля pros / cons) -->
        <div class="game-proscons">
            [xfvalue_pros]<div class="game-pc-box pros"><h3>👍 Плюсы</h3>{xfvalue_pros}</div>[/xfvalue_pros]
            [xfvalue_cons]<div class="game-pc-box cons"><h3>👎 Минусы</h3>{xfvalue_cons}</div>[/xfvalue_cons]
        </div>

        <!-- Другие игры -->
        <section style="margin-top:40px;">
            <h2 class="side-block-title">Другие игры</h2>
            <div class="games-grid">{related-news}</div>
        </section>

        <!-- Комментарии -->
        <section class="comments-section" style="max-width:100%;padding-left:0;padding-right:0;">
            {addcomments}
            {comments}
        </section>
    </div>
</div>
