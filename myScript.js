function myFunction() {
    const calc = function () {
        //猎取文档的元素赋值给docElement保存
        const docElement = document.documentElement;
        //如果页面的宽度大于750px ,那么让它等于750px ,否则返回页面的宽度, 最后赋值保存到定义的clientWidthhValue
        const clientWidthValue = docElement.clientWidth > 750 ? 750 : docElement.clientWidth;
        //设置字体比例
        docElement.style.fontSize = 16 * (clientWidthValue / 375) + 'px';
    }
    calc();//调用函数
    window.addEventListener('resize', calc);//全局执行事件(自定义屏幕尺寸)
}

// 显示日期并自动隐藏
function showDate(btn) {
    // 显示当前日期时间
    const now = new Date();
    btn.innerHTML = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    // 3秒后恢复原状
    setTimeout(() => {
        btn.innerHTML = '显示日期';
        btn.style.backgroundColor = '#1ec7e6'; // 恢复原背景色
    }, 3000);

    // 点击时改变按钮颜色
    btn.style.backgroundColor = '#ff4757';
}

/// 在myScript.js中添加以下代码
document.addEventListener('DOMContentLoaded', function () {
    // 初始化评论数据
    let comments = JSON.parse(localStorage.getItem('comments')) || [];

    // 渲染评论
    function renderComments() {
        const list = document.getElementById('comment-list');
        list.innerHTML = '';

        if (comments.length === 0) {
            list.innerHTML = '<p style="text-align:center; color:#666;">暂无评论，快来抢沙发吧~</p>';
            return;
        }

        comments.forEach(comment => {
            const commentEl = document.createElement('div');
            commentEl.className = 'comment';
            commentEl.innerHTML = `
                <div class="comment-author">${comment.author}</div>
                <div class="comment-content">${comment.content}</div>
                <div class="comment-meta">
                    <span class="comment-time">${comment.time}</span>
                    <div class="like-btn ${comment.liked ? 'liked' : ''}" 
                         onclick="likeComment(${comment.id})">
                        ♥ <span class="like-count">${comment.likes}</span>
                    </div>
                </div>
            `;
            list.appendChild(commentEl);
        });
    }

    // 全局函数声明
    window.addComment = function () {
        const input = document.getElementById('comment-input');
        const content = input.value.trim();

        if (!content) {
            alert('请输入评论内容');
            return;
        }

        const newComment = {
            id: Date.now(),
            author: '访客' + Math.floor(Math.random() * 1000),
            content: content,
            time: new Date().toLocaleString(),
            likes: 0,
            liked: false
        };

        comments.unshift(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));
        renderComments();
        input.value = '';
    };

    window.likeComment = function (commentId) {
        const comment = comments.find(c => c.id === commentId);
        if (comment) {
            comment.liked = !comment.liked;
            comment.likes += comment.liked ? 1 : -1;
            localStorage.setItem('comments', JSON.stringify(comments));
            renderComments();
        }
    };

    // 初始渲染
    renderComments();
});

function toggleDropdown(element) {
    element.querySelector('.dropdown-content').classList.toggle('show');
}
