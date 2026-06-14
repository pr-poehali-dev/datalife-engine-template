<!-- ============================================================
     fullstory-video.tpl — страница ВИДЕОРОЛИКА с плеером
     Привязка: Категории → Видеоролики →
     "Шаблон full-story" = video
     Сайдбар убран. По бокам — переходы на пред./след. ролик.
     ============================================================ -->
<div class="video-page-single">
    <!-- Предыдущее видео (кнопка-минипревью слева) -->
    <div class="video-nav-side video-nav-prev">
        {prev-news}
    </div>

    <!-- Центральная колонка -->
    <div class="video-center">
        <!-- Плеер с амбиентным свечением (как на YouTube) -->
        <div class="video-stage">
            <!-- Размытая копия превью создаёт цветное свечение за плеером -->
            [thumb]<div class="video-glow" style="background-image:url({thumb-url})"></div>[/thumb]
            <div class="video-player">
                {xfvalue_video}
                [not-xfvalue_video][thumb]{thumb-storyimage}[/thumb][/not-xfvalue_video]
            </div>
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

        <!-- Мобильная навигация пред./след. -->
        <div class="video-nav-mobile">
            <div class="video-nav-m-prev">{prev-news}</div>
            <div class="video-nav-m-next">{next-news}</div>
        </div>

        <!-- Комментарии DLE -->
        <section class="comments-section">
            {addcomments}
            {comments}
        </section>
    </div>

    <!-- Следующее видео (кнопка-минипревью справа) -->
    <div class="video-nav-side video-nav-next">
        {next-news}
    </div>
</div>