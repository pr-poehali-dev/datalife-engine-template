<!-- ============================================================
     category-video.tpl — страница категории "Видеоролики"
     Подключается в админке: Категории → Видеоролики →
     "Шаблон при просмотре категории" = category-video
     Внутри {content} DLE выводит карточки через shortstory-video.tpl
     Над карточками — лента подкатегорий (теги, JS-фильтр по data-tag).
     ============================================================ -->
<div class="cat-page-title">
    <span class="ico">▶️</span>
    <h1>Видеоролики</h1>
</div>

<!-- Лента подкатегорий (теги) — заполняется JS из data-tag карточек -->
<div class="video-tags" id="vt-tags"></div>

<div class="videos-grid" id="vt-grid">
    {content}
</div>

<div class="video-empty" id="vt-empty" style="display:none;">
    В этой подкатегории пока нет видео.
</div>

<div class="pagination">{navigation}</div>

<!-- Фильтр по подкатегориям -->
<script>
(function () {
    var grid = document.getElementById("vt-grid");
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".video-card"));
    var tagsBox = document.getElementById("vt-tags");
    var emptyEl = document.getElementById("vt-empty");

    // Собираем уникальные подкатегории
    var tags = ["Все"];
    cards.forEach(function (c) {
        var t = (c.dataset.tag || "").trim();
        if (t && tags.indexOf(t) === -1) tags.push(t);
    });

    var active = "Все";

    function render() {
        tagsBox.innerHTML = "";
        tags.forEach(function (t) {
            var b = document.createElement("button");
            b.type = "button";
            b.className = "video-tag" + (t === active ? " active" : "");
            b.textContent = t;
            b.addEventListener("click", function () { active = t; apply(); });
            tagsBox.appendChild(b);
        });
    }

    function apply() {
        var shown = 0;
        cards.forEach(function (c) {
            var t = (c.dataset.tag || "").trim();
            var ok = active === "Все" || t === active;
            c.style.display = ok ? "" : "none";
            if (ok) shown++;
        });
        emptyEl.style.display = shown ? "none" : "block";
        render();
    }

    if (tags.length > 1) { render(); apply(); }
})();
</script>
