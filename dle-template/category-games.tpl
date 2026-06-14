<!-- ============================================================
     category-games.tpl — страница категории "Видеоигры"
     Подключается в админке: Категории → Видеоигры →
     "Шаблон при просмотре категории" = category-games
     Внутри {content} DLE выводит карточки через shortstory-games.tpl
     ============================================================ -->
<div class="cat-page-title">
    <span class="ico">🎮</span>
    <h1>Видеоигры</h1>
</div>

<div class="games-grid">
    {content}
</div>

<div class="pagination">{navigation}</div>
