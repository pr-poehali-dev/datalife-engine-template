<!-- ============================================================
     fullstory.tpl — полная новость (статья) в стиле Digg
     ============================================================ -->
<article class="article">
    <!-- Хлебные крошки -->
    <nav class="breadcrumb">
        <a href="{HOME}">Главная</a>
        <span>›</span>
        <span class="category-tag cat-default">[category]{category}[/category]</span>
    </nav>

    <!-- Заголовок и лид -->
    <h1>{title}</h1>
    <p class="article-lead">{description}</p>

    <!-- Панель: автор + рейтинг + инструменты -->
    <div class="article-meta">
        <div class="author-info">
            <div class="author-avatar">{author}</div>
            <div>
                <div class="author-name">{author}</div>
                <div class="author-date">{date} · {news-views} просмотров</div>
            </div>
        </div>

        <div class="article-tools">
            <!-- Рейтинг DLE (замена кнопки Digg) -->
            [rating]
            <div class="rating-btn">
                <span class="arrow">↑</span>
                <span>{rating}</span>
            </div>
            [/rating]
            [favorites]<a href="#" class="tool-btn" title="В закладки" onclick="{favorites-link}">🔖</a>[/favorites]
            <button type="button" class="tool-btn" title="Поделиться" onclick="if(navigator.share){navigator.share({title:document.title,url:location.href})}else{navigator.clipboard.writeText(location.href)}">↗</button>
        </div>
    </div>

    <!-- Обложка -->
    [thumb]<div class="article-cover">{thumb-storyimage}</div>[/thumb]

    <!-- Текст новости -->
    <div class="article-body">{full-story}</div>

    <!-- Теги новости -->
    [tags]<div class="tag-cloud" style="margin-bottom:32px;">{tags}</div>[/tags]
</article>

<!-- Похожие материалы -->
{related-news}

<!-- Блок комментариев DLE (использует comments.tpl) -->
<section class="comments-section">
    {addcomments}
    {comments}
</section>
