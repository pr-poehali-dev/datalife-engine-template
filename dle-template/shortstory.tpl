<!-- ============================================================
     shortstory.tpl — карточка новости в ленте (дизайн Digg)
     ============================================================ -->
<article class="news-card">
    <div class="card-row">
        <div class="card-body">
            <!-- Мета: категория + дата + время чтения -->
            <div class="card-meta">
                <span class="category-tag cat-default">[category]{category}[/category]</span>
                <time>{date}</time>
                <span class="dot">·</span>
                <span class="views">👁 {news-views}</span>
            </div>

            <!-- Заголовок (ссылка на полную новость) -->
            <a href="{full-link}">
                <h2 class="card-title">{title}</h2>
            </a>

            <!-- Краткий текст -->
            <p class="card-excerpt">{short-story}</p>

            <!-- Футер карточки: автор + рейтинг (Digg) -->
            <div class="card-footer">
                <span class="card-author">{author}</span>
                <div class="rating-btn" title="Рейтинг">
                    <span class="arrow">↑</span>
                    [rating]<span>{rating}</span>[/rating]
                </div>
            </div>
        </div>

        <!-- Превью-картинка -->
        [thumb]
        <a href="{full-link}" class="card-thumb">{thumb-storyimage}</a>
        [/thumb]
    </div>
</article>
