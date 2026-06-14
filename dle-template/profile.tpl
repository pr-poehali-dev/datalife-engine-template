<!-- ============================================================
     profile.tpl — настройки аккаунта DLE (вкладка "Настройки")
     Подставляется движком на index.php?do=cp (изменение профиля)
     ============================================================ -->
<div class="profile-wrap">
    <div class="profile-head" style="padding-bottom:24px;">
        <div class="profile-avatar">[avatar]<img src="{foto}" alt="{login}">[/avatar][not-avatar]{login-first-char}[/not-avatar]</div>
        <div class="profile-info">
            <h1>Настройки аккаунта</h1>
            <div class="profile-username">@{login}</div>
        </div>
    </div>

    <div class="profile-tabs">
        <a href="{HOME}user/{login}/news/">📄 Мои публикации</a>
        <a href="{HOME}index.php?do=favorites">🔖 Закладки</a>
        <a href="{HOME}index.php?do=cp" class="active">⚙️ Настройки</a>
    </div>

    <form method="post" enctype="multipart/form-data" action="" style="max-width:480px;">
        <div class="auth-field">
            <label>Имя</label>
            <input type="text" name="name" value="{login}">
        </div>
        <div class="auth-field">
            <label>Email</label>
            <input type="email" name="email" value="{email}">
        </div>
        <div class="auth-field">
            <label>О себе</label>
            <input type="text" name="info" value="{info}">
        </div>
        <div class="auth-field">
            <label>Аватар</label>
            <input type="file" name="image">
        </div>
        <div class="auth-field">
            <label>Новый пароль</label>
            <input type="password" name="password" autocomplete="new-password">
        </div>

        <div style="display:flex;align-items:center;gap:12px;margin-top:8px;">
            <button type="submit" name="submit" class="auth-submit" style="width:auto;padding:10px 20px;">Сохранить изменения</button>
            <a href="{HOME}index.php?action=logout" class="logout-btn">⎋ Выйти</a>
        </div>
    </form>
</div>
