<!-- ============================================================
     userinfo.tpl — профиль пользователя DLE (дизайн Digg)
     Подставляется движком на index.php?do=lastnews / userinfo
     ============================================================ -->
<div class="profile-wrap">
    <!-- Шапка профиля -->
    <div class="profile-head">
        <div class="profile-avatar">[avatar]<img src="{foto}" alt="{login}">[/avatar][not-avatar]{login-first-char}[/not-avatar]</div>

        <div class="profile-info">
            <h1>{login}</h1>
            <div class="profile-username">@{login}</div>
            [info]<div class="profile-bio">{info}</div>[/info]
            <div class="profile-joined">Регистрация: {registration}</div>
        </div>

        <div class="profile-stats">
            <div class="profile-stat"><b>{news-num}</b><span>публикаций</span></div>
            <div class="profile-stat"><b>{comments-num}</b><span>комментариев</span></div>
            <div class="profile-stat"><b>{user-rating}</b><span>рейтинг</span></div>
        </div>
    </div>

    <!-- Вкладки профиля -->
    <div class="profile-tabs">
        <a href="{HOME}user/{login}/news/" class="active">📄 Мои публикации</a>
        <a href="{HOME}index.php?do=favorites">🔖 Закладки</a>
        [own-profile]<a href="{HOME}index.php?do=pm">✉️ Сообщения</a>
        <a href="{HOME}index.php?do=cp">⚙️ Настройки</a>[/own-profile]
    </div>

    <!-- Список публикаций пользователя -->
    <div>
        {user-news-list}
    </div>

    <!-- Кнопка выхода (только для своего профиля) -->
    [own-profile]
    <div style="margin-top:24px;">
        <a href="{HOME}index.php?action=logout" class="logout-btn">⎋ Выйти из аккаунта</a>
    </div>
    [/own-profile]
</div>
