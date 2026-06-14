<!-- ============================================================
     fullstory-video.tpl — страница ВИДЕОРОЛИКА с плеером
     Привязка: Категории → Видеоролики →
     "Шаблон full-story" = video
     ============================================================ -->
<div class="video-page">
    <div class="video-main">
        <!-- Плеер: ссылка/код видео хранится в доп. поле {xfvalue_video} -->
        <div class="video-player">
            {xfvalue_video}
            [not-xfvalue_video][thumb]{thumb-storyimage}[/thumb][/not-xfvalue_video]
        </div>

        <h1 class="video-page-title">{title}</h1>
        <p class="video-page-stats">{news-views} просмотров · {date}</p>

        <!-- Канал + подписка -->
        <div class="video-channel-bar">
            <div class="author-info">
                <div class="author-avatar">{author}</div>
                <div>
                    <div class="author-name">{author}</div>
                    <div class="author-date">Автор</div>
                </div>
            </div>
            <div class="article-tools">
                [rating]<div class="rating-btn"><span class="arrow">↑</span><span>{rating}</span></div>[/rating]
                <button type="button" class="tool-btn" title="Поделиться" onclick="if(navigator.share){navigator.share({title:document.title,url:location.href})}else{navigator.clipboard.writeText(location.href)}">↗</button>
            </div>
        </div>

        <!-- Описание -->
        <div class="video-description">{full-story}</div>

        <!-- Комментарии DLE -->
        <section class="comments-section">
            {addcomments}
            {comments}
        </section>
    </div>

    <!-- Смотреть далее -->
    <aside class="video-aside">
        <h3 class="side-block-title">Смотреть далее</h3>
        {related-news}
    </aside>
</div>
