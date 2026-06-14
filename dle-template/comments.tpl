<!-- ============================================================
     comments.tpl — один комментарий DLE (стиль Digg)
     ============================================================ -->
<div class="comment" id="comment-id-{comment-id}">
    <div class="comment-avatar">{author}</div>
    <div style="flex:1;min-width:0;">
        <div class="comment-head">
            <span class="comment-author">{author}</span>
            <span class="comment-date">{date}</span>
        </div>
        <div class="comment-text">{comment}</div>
        <div style="margin-top:8px;">
            [com-rating]
            <button type="button" class="rating-btn" onclick="{rating-plus-link}" title="Нравится">
                <span class="arrow" style="width:18px;height:18px;font-size:10px;">♥</span>
                <span>{com-rating}</span>
            </button>
            [/com-rating]
            <a href="#" onclick="{reply-id}" style="font-size:12px;color:var(--muted-foreground);margin-left:12px;">Ответить</a>
        </div>
    </div>
</div>
