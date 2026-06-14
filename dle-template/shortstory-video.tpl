<!-- ============================================================
     shortstory-video.tpl — карточка ВИДЕОРОЛИКА (плитка с play)
     Привязывается к категории "Видеоролики" в админке DLE
     (Категории → правка категории → "Шаблон short-story" = video)
     ============================================================ -->
<article class="video-card" data-tag="{xfvalue_tag}">
    <a href="{full-link}" class="video-thumb">
        [thumb]{thumb-storyimage}[/thumb]
        <span class="video-play">▶</span>
        <!-- Длительность хранится в доп. поле {xfvalue_duration} -->
        <span class="video-duration">{xfvalue_duration}</span>
    </a>
    <a href="{full-link}"><h2 class="video-title">{title}</h2></a>
    <p class="video-channel">{author}</p>
    <p class="video-stats">{news-views} просмотров · {date}</p>
</article>