<!-- ============================================================
     category-games.tpl — страница категории "Видеоигры" с фильтром
     Подключается в админке: Категории → Видеоигры →
     "Шаблон при просмотре категории" = category-games
     Внутри {content} DLE выводит карточки через shortstory-games.tpl
     Фильтр работает на клиенте (JS) по data-атрибутам карточек.
     ============================================================ -->
<div class="cat-page-title">
    <span class="ico">🎮</span>
    <h1>Видеоигры</h1>
    <span class="games-count" id="games-count"></span>
</div>

<!-- Панель поиска и сортировки -->
<div class="games-toolbar">
    <div class="games-search">
        <span class="games-search-ico">🔍</span>
        <input type="text" id="gf-search" placeholder="Поиск игр...">
    </div>
    <select id="gf-sort" class="games-sort">
        <option value="rating">По рейтингу</option>
        <option value="new">Новинки</option>
        <option value="name">По названию</option>
    </select>
    <button type="button" class="games-filter-toggle" id="gf-toggle">⚙ Фильтры</button>
</div>

<!-- Активные фильтры (чипы) -->
<div class="games-chips" id="gf-chips"></div>

<div class="games-layout">
    <!-- Сайдбар фильтров -->
    <aside class="games-filters" id="gf-panel">
        <div class="games-fblock">
            <h3>Жанр</h3>
            <div id="gf-genres" class="gf-checks"><!-- заполняется JS --></div>
        </div>
        <div class="games-fblock">
            <h3>Платформа</h3>
            <div id="gf-platforms" class="gf-tags"><!-- заполняется JS --></div>
        </div>
        <div class="games-fblock">
            <div class="gf-rating-head">
                <h3>Рейтинг от</h3>
                <span id="gf-rating-val">—</span>
            </div>
            <input type="range" id="gf-rating" min="0" max="9.5" step="0.5" value="0">
            <div class="gf-rating-scale"><span>Любой</span><span>9.5</span></div>
        </div>
    </aside>

    <!-- Сетка игр -->
    <div class="games-main">
        <div class="games-grid" id="gf-grid">
            {content}
        </div>
        <div class="games-empty" id="gf-empty" style="display:none;">
            По заданным фильтрам ничего не найдено.
            <button type="button" id="gf-reset-empty">Сбросить фильтры</button>
        </div>
    </div>
</div>

<div class="pagination">{navigation}</div>

<!-- Логика фильтра -->
<script>
(function () {
    var grid = document.getElementById("gf-grid");
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll(".game-card"));
    var search = document.getElementById("gf-search");
    var sortSel = document.getElementById("gf-sort");
    var ratingInp = document.getElementById("gf-rating");
    var ratingVal = document.getElementById("gf-rating-val");
    var genresBox = document.getElementById("gf-genres");
    var platBox = document.getElementById("gf-platforms");
    var chipsBox = document.getElementById("gf-chips");
    var countEl = document.getElementById("games-count");
    var emptyEl = document.getElementById("gf-empty");
    var panel = document.getElementById("gf-panel");

    var state = { search: "", genres: [], platforms: [], minRating: 0, sort: "rating" };

    // Собираем уникальные жанры и платформы из карточек
    var genres = [], platforms = [];
    cards.forEach(function (c) {
        var g = (c.dataset.genre || "").trim();
        if (g && genres.indexOf(g) === -1) genres.push(g);
        (c.dataset.platform || "").split(",").forEach(function (p) {
            p = p.trim();
            if (p && platforms.indexOf(p) === -1) platforms.push(p);
        });
    });

    genres.forEach(function (g) {
        var l = document.createElement("label");
        l.className = "gf-check";
        l.innerHTML = '<input type="checkbox" value="' + g + '"><span>' + g + '</span>';
        l.querySelector("input").addEventListener("change", function () {
            toggle(state.genres, g); apply();
        });
        genresBox.appendChild(l);
    });

    platforms.forEach(function (p) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "gf-tag";
        b.textContent = p;
        b.addEventListener("click", function () {
            toggle(state.platforms, p);
            b.classList.toggle("active");
            apply();
        });
        platBox.appendChild(b);
    });

    function toggle(arr, val) {
        var i = arr.indexOf(val);
        if (i === -1) arr.push(val); else arr.splice(i, 1);
    }

    function apply() {
        var visible = cards.filter(function (c) {
            var title = (c.dataset.title || "").toLowerCase();
            var g = (c.dataset.genre || "").trim();
            var plats = (c.dataset.platform || "").split(",").map(function (x) { return x.trim(); });
            var r = parseFloat(c.dataset.rating) || 0;
            if (state.search && title.indexOf(state.search.toLowerCase()) === -1) return false;
            if (state.genres.length && state.genres.indexOf(g) === -1) return false;
            if (state.platforms.length && !plats.some(function (p) { return state.platforms.indexOf(p) !== -1; })) return false;
            if (r < state.minRating) return false;
            return true;
        });

        visible.sort(function (a, b) {
            if (state.sort === "rating") return (parseFloat(b.dataset.rating) || 0) - (parseFloat(a.dataset.rating) || 0);
            if (state.sort === "name") return (a.dataset.title || "").localeCompare(b.dataset.title || "");
            return (parseInt(b.dataset.id) || 0) - (parseInt(a.dataset.id) || 0);
        });

        cards.forEach(function (c) { c.style.display = "none"; });
        visible.forEach(function (c) { c.style.display = ""; grid.appendChild(c); });

        countEl.textContent = "(" + visible.length + ")";
        emptyEl.style.display = visible.length ? "none" : "block";
        renderChips();
    }

    function renderChips() {
        chipsBox.innerHTML = "";
        var has = state.genres.length || state.platforms.length || state.minRating > 0 || state.search;
        function chip(label, onRemove) {
            var b = document.createElement("button");
            b.className = "games-chip";
            b.innerHTML = label + " ✕";
            b.addEventListener("click", onRemove);
            chipsBox.appendChild(b);
        }
        state.genres.forEach(function (g) { chip(g, function () {
            toggle(state.genres, g);
            var cb = genresBox.querySelector('input[value="' + g + '"]'); if (cb) cb.checked = false;
            apply();
        }); });
        state.platforms.forEach(function (p) { chip(p, function () {
            toggle(state.platforms, p);
            platBox.querySelectorAll(".gf-tag").forEach(function (t) { if (t.textContent === p) t.classList.remove("active"); });
            apply();
        }); });
        if (state.minRating > 0) chip("Рейтинг " + state.minRating + "+", function () {
            state.minRating = 0; ratingInp.value = 0; ratingVal.textContent = "—"; apply();
        });
        if (has) {
            var r = document.createElement("button");
            r.className = "games-reset";
            r.textContent = "Сбросить всё";
            r.addEventListener("click", resetAll);
            chipsBox.appendChild(r);
        }
    }

    function resetAll() {
        state = { search: "", genres: [], platforms: [], minRating: 0, sort: state.sort };
        search.value = "";
        ratingInp.value = 0; ratingVal.textContent = "—";
        genresBox.querySelectorAll("input").forEach(function (i) { i.checked = false; });
        platBox.querySelectorAll(".gf-tag").forEach(function (t) { t.classList.remove("active"); });
        apply();
    }

    search.addEventListener("input", function () { state.search = this.value; apply(); });
    sortSel.addEventListener("change", function () { state.sort = this.value; apply(); });
    ratingInp.addEventListener("input", function () {
        state.minRating = parseFloat(this.value);
        ratingVal.textContent = state.minRating > 0 ? state.minRating.toFixed(1) : "—";
        apply();
    });
    document.getElementById("gf-toggle").addEventListener("click", function () { panel.classList.toggle("open"); });
    document.getElementById("gf-reset-empty").addEventListener("click", resetAll);

    apply();
})();
</script>
