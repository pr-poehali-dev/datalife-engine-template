<!-- ============================================================
     login.tpl — форма входа DLE (дизайн Digg)
     Подставляется движком на index.php?do=register (вкладка входа)
     ============================================================ -->
<div class="auth-wrap">
    <div class="auth-tabs">
        <a href="{HOME}index.php?do=register" class="active">Вход</a>
        <a href="{HOME}index.php?do=register&doaction=newuser">Регистрация</a>
    </div>

    <h1>С возвращением</h1>
    <p class="auth-sub">Войдите, чтобы продолжить чтение</p>

    <form method="post" name="loginform" action="">
        <div class="auth-field">
            <label>Логин или Email</label>
            <input type="text" name="login_name" value="" autocomplete="username">
        </div>
        <div class="auth-field">
            <label>Пароль</label>
            <input type="password" name="login_password" autocomplete="current-password">
        </div>

        <input type="hidden" name="login" value="submit">
        <button type="submit" name="submit" class="auth-submit">Войти</button>
    </form>

    <div class="auth-divider"><span>или</span></div>

    <!-- Социальная авторизация DLE (если включена) -->
    {socialauth}

    <p class="auth-note">
        Продолжая, вы соглашаетесь с
        <a href="{HOME}index.php?do=rules">правилами</a> и
        <a href="{HOME}index.php?do=pm">политикой конфиденциальности</a>.
    </p>
</div>
