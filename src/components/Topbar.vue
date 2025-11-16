<template>
    <!-- 顶栏核心结构（直接迁移原HTML，无需修改） -->
    <header class="top-bar">
        <!-- 左侧品牌区 -->
        <div class="brand">
            <div class="logo">
                <!-- 注意：图片路径需基于组件位置调整！若组件在src/components，图片在public目录，路径不变 -->
                <img src="/p1.png" alt="西南交通大学校徽" class="logo-img">
            </div>
            <div class="title">
                <div class="uni">
                    西南交通大学
                    <span class="english-name">Southwest Jiaotong University</span>
                </div>
                <div class="subtitle">可视化位置服务平台</div>
            </div>
        </div>

        <!-- 中间校训区（原代码中img标签缺少class，建议补充class便于样式控制） -->
        <img src="/p3.png" alt="校训" class="motto-img">

        <!-- 右侧功能区 -->
        <div class="actions">
            <div class="action-item">
                <img src="/p2.jpg" alt="登录" class="action-icon user-avatar">

            </div>
        </div>
    </header>
</template>

<script setup>
// 组件逻辑区：若后续需要添加交互（如登录弹窗、菜单展开），可在这里写逻辑
// 示例1：若需要点击头像触发事件，可定义函数并通过emit传递给父组件
const emit = defineEmits(['avatar-click']); // 声明要触发的事件

// 头像点击事件
const handleAvatarClick = () => {
    emit('avatar-click'); // 向父组件传递点击事件
};

// 示例2：若需要动态修改标题（如不同页面显示不同副标题），可通过props接收
const props = defineProps({
    subtitle: { // 父组件可传递自定义副标题
        type: String,
        default: '可视化位置服务平台' // 默认值（原副标题）
    }
});
</script>

<style scoped>
/* 顶栏所有样式（直接迁移原CSS，注意：.motto-img样式需补充，对应中间校训图） */
.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
    color: #ffffff;
    font-family: "Microsoft YaHei", sans-serif;
    padding: 0 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    position: sticky;
    top: 0;
    z-index: 1000;
}

/* 左侧品牌区 */
.brand {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo {
    width: 40px;
    height: 40px;
}

.logo-img {
    width: 80%;
    height: 80%;
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0px;
    /* 校徽缓慢旋转动画 */
    animation: rotateLogo 10s linear infinite;
    /* 原1s太快，建议改为10s更自然 */
    transform-style: preserve-3d;
    backface-visibility: hidden;
    will-change: transform;
    -webkit-transform-style: preserve-3d;
    -webkit-backface-visibility: hidden;
}

/* 校徽旋转动画 */
@keyframes rotateLogo {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.title {
    display: flex;
    flex-direction: column;
}

.uni {
    font-size: 30px;
    font-weight: 700;
}

.english-name {
    font-size: 25px;
    font-weight: 400;
    margin-left: 8px;
    opacity: 0.8;
}

.subtitle {
    font-size: 15px;
    opacity: 0.8;
    margin-top: 2px;
}

/* 中间校训区（补充.motto-img样式，原代码中img无class） */
.motto-img {
    /* 假设原p3.png是校训文字图，根据实际尺寸调整 */
    height: 50px;
    object-fit: contain;
    /* 保持图片比例，避免拉伸 */
    margin: 0 10px;
    /* 左右间距，避免挤压 */
}

/* 右侧功能区 */
.actions {
    display: flex;
    align-items: center;
    gap: 18px;
}

.action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 5px 8px;
    border-radius: 6px;
    transition: background-color 0.2s;
    /* 增加hover反馈，更友好 */
}

.action-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
    /* hover时淡色背景 */
}

/* 缩小后的用户头像 */
.user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.3);
    margin-bottom: 3px;
}

.action-text {
    font-size: 12px;
    letter-spacing: 0.3px;
}

/* 响应式适配（原样式完整迁移） */
@media (max-width: 992px) {
    .uni {
        font-size: 17px;
    }

    .english-name {
        font-size: 14px;
        /* 原25px在小屏幕太大，调整适配 */
    }

    .motto-img {
        height: 40px;
        /* 小屏幕缩小校训图 */
    }
}

@media (max-width: 768px) {

    .english-name,
    .subtitle {
        display: none;
    }

    .motto-img {
        height: 35px;
    }
}

@media (max-width: 576px) {
    .motto-img {
        display: none;
        /* 超小屏幕隐藏校训图 */
    }

    .top-bar {
        padding: 0 12px;
    }

    .user-avatar {
        width: 40px;
        /* 超小屏幕缩小头像 */
        height: 40px;
    }
}

/* 原隐藏媒体控件的样式，若组件内无相关元素，可保留或删除 */
.video-controls,
.audio-controls,
.media-display-bar {
    display: none !important;
}
</style>