<!-- ============================================================
     registration.tpl — форма регистрации DLE (дизайн Digg)
     Подставляется движком на index.php?do=register&doaction=newuser
     ============================================================ -->
<div class="auth-wrap">
    <div class="auth-tabs">
        <a href="{HOME}index.php?do=register">Вход</a>
        <a href="{HOME}index.php?do=register&doaction=newuser" class="active">Регистрация</a>
    </div>

    <h1>Создать аккаунт</h1>
    <p class="auth-sub">Присоединяйтесь к сообществу читателей</p>

    <form method="post" name="registerform" enctype="multipart/form-data" action="">
        <div class="auth-field">
            <label>Имя пользователя</label>
            <input type="text" name="name" value="" autocomplete="username">
        </div>
        <div class="auth-field">
            <label>Email</label>
            <input type="email" name="email" value="" autocomplete="email">
        </div>
        <div class="auth-field">
            <label>Пароль</label>
            <input type="password" name="password" autocomplete="new-password">
        </div>
        <div class="auth-field">
            <label>Повторите пароль</label>
            <input type="password" name="password1" autocomplete="new-password">
        </div>

        <!-- Защита от спама (капча DLE) -->
        {sec_code}

        <input type="hidden" name="doaction" value="adduser">
        <button type="submit" name="submit" class="auth-submit">Зарегистрироваться</button>
    </form>

    <div class="auth-divider"><span>или</span></div>
    {socialauth}

    <p class="auth-note">
        Продолжая, вы соглашаетесь с
        <a href="{HOME}index.php?do=rules">правилами</a> и
        <a href="{HOME}index.php?do=pm">политикой конфиденциальности</a>.
    </p>
</div>
