<!-- ============================================================
     category-video.tpl — страница категории "Видеоролики"
     Подключается в админке: Категории → Видеоролики →
     "Шаблон при просмотре категории" = category-video
     Внутри {content} DLE выводит карточки через shortstory-video.tpl
     ============================================================ -->
<div class="cat-page-title">
    <span class="ico">▶️</span>
    <h1>Видеоролики</h1>
</div>

<div class="videos-grid">
    {content}
</div>

<div class="pagination">{navigation}</div>
