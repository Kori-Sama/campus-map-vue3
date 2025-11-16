<template>
    <aside class="left-panel">
        <!-- 搜索栏 -->
        <div class="search-wrapper" ref="searchWrapper">
            <div class="search-small">
                <input v-model="searchKeyword" placeholder="搜索位置" @keyup.enter="performSearch" @focus="onSearchFocus"
                    ref="searchInput" class="search-input" />
                <button @click="performSearch" class="search-btn">🔍</button>
            </div>

        </div>

        <!-- 全景模块 - 苹果风格卡片（可折叠） -->
        <div class="panorama-section">
            <div class="section-title section-toggle" @click="togglePanorama">
                <span>🗺️ 校园全景</span>
                <span class="toggle-chev">{{ showPanorama ? '▾' : '▸' }}</span>
            </div>
            <div v-show="showPanorama" class="panorama-grid">
                <a v-for="item in panoramaItems" :key="item.id" :href="item.link" target="_blank" class="panorama-card">
                    <div class="panorama-image" :style="{ backgroundImage: `url(${item.image})` }">
                        <div class="panorama-overlay">
                            <span class="panorama-icon">🔗</span>
                        </div>
                    </div>
                    <div class="panorama-info">
                        <div class="panorama-title">{{ item.title }}</div>
                        <div class="panorama-subtitle">{{ item.subtitle }}</div>
                    </div>
                </a>
            </div>
        </div>

        <!-- 学院事务 - 卡片式入口（可折叠） -->
        <div class="affairs-section">
            <div class="section-title section-toggle" @click="toggleAffairs">
                <span>🎓 学生事务</span>
                <span class="toggle-chev">{{ showAffairs ? '▾' : '▸' }}</span>
            </div>
            <div v-show="showAffairs" class="affairs-card-entry" @click="showAffairsModal = true">
                <div class="entry-icon">📋</div>
                <div class="entry-info">
                    <div class="entry-title">计算机与人工智能学院</div>
                    <div class="entry-subtitle">学业、就业、奖学金等服务</div>
                </div>
                <div class="entry-arrow">›</div>
            </div>
        </div>
    </aside>

    <!-- 搜索结果弹窗 - Teleport 到 body -->
    <Teleport to="body">
        <div v-if="showSearchModal" class="search-modal">
            <div class="modal-overlay" @click="showSearchModal = false"></div>
            <div class="search-modal-content">
                <div class="search-modal-header">
                    <h3>{{ searchKeyword }}</h3>
                    <button class="close-btn" @click="showSearchModal = false">✕</button>
                </div>
                <div class="search-modal-body">
                    <div v-if="searchResults.length" class="results-list">
                        <div v-for="(r, idx) in searchResults" :key="idx" class="result-item" @click="selectResult(r)">
                            <div class="result-left">
                                <div class="result-icon">📍</div>
                                <div class="result-info">
                                    <div class="result-title">{{ r.title }}</div>
                                    <div class="result-address">{{ r.address }}</div>
                                </div>
                            </div>
                            <div class="result-arrow">›</div>
                        </div>
                    </div>
                    <div v-else class="empty-state">
                        <div class="empty-icon">🔍</div>
                        <div class="empty-text">搜索中...</div>
                    </div>
                </div>
                <div v-if="searchResults.length" class="search-modal-footer">
                    <span class="results-count">共找到 {{ searchResults.length }} 个结果</span>
                </div>
            </div>
        </div>
    </Teleport>

    <!-- 学院事务弹窗 - Teleport 到 body -->
    <Teleport to="body">
        <div v-if="showAffairsModal" class="affairs-modal">
            <div class="modal-overlay" @click="showAffairsModal = false"></div>
            <div class="affairs-modal-content">
                <div class="affairs-modal-header">
                    <h3>🎓 学生事务中心</h3>
                    <button class="close-btn" @click="showAffairsModal = false">✕</button>
                </div>
                <div class="affairs-modal-body">
                    <div class="affairs-section-block">
                        <div class="affairs-section-title">📋 常见事务</div>
                        <div class="affairs-grid">
                            <div v-for="item in affairItems" :key="item.type" class="affair-card-item"
                                @click="showAffairDetail(item.type)">
                                <div class="affair-card-icon">{{ item.icon }}</div>
                                <div class="affair-card-title">{{ item.title }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="affairs-section-block">
                        <div class="affairs-section-title">🏢 办公信息</div>
                        <div class="office-info-card">
                            <div class="info-item">
                                <span class="info-label">办公室</span>
                                <span class="info-value">学院楼302室</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">电话</span>
                                <span class="info-value">(028) 1234-5678</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">工作时间</span>
                                <span class="info-value">周一至周五 9:00-17:00</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">负责老师</span>
                                <span class="info-value">张老师、王老师</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>

    <!-- 事务详情弹窗 - Teleport 到 body -->
    <Teleport to="body">
        <div v-if="showAffairModal" class="affair-detail-modal">
            <div class="modal-overlay" @click="showAffairModal = false"></div>
            <div class="affair-detail-content">
                <button class="close-btn" @click="showAffairModal = false">✕</button>
                <div class="detail-icon">{{ currentAffairIcon }}</div>
                <h3>{{ affairDetails.title }}</h3>
                <div class="detail-description">{{ affairDetails.description }}</div>
                <div class="detail-info">
                    <div class="detail-info-item">
                        <div class="detail-label">📞 联系方式</div>
                        <div class="detail-value">{{ affairDetails.contact }}</div>
                    </div>
                    <div class="detail-info-item">
                        <div class="detail-label">📄 所需材料</div>
                        <div class="detail-value">{{ affairDetails.materials }}</div>
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';

// 事件：向父组件发出定位请求
const emit = defineEmits(['locate']);

const searchKeyword = ref('');
const showAffairModal = ref(false);
const showAffairsModal = ref(false);
const searchResults = ref([]);
const showSearchDropdown = ref(false);
const showSearchModal = ref(false);
const showPanorama = ref(1);
const showAffairs = ref(1);
const currentAffairIcon = ref('');

const searchInput = ref(null);
const searchWrapper = ref(null);

// 全景链接数据
const panoramaItems = ref([
    {
        id: 1,
        title: '校门口全景',
        subtitle: '360°虚拟漫游',
        image: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
        link: 'https://map.baidu.com/poi/%E8%A5%BF%E5%8D%97%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A6(%E7%8A%80%E6%B5%A6%E6%A0%A1%E5%8C%BA)/@11576574,3580924,21z,87t,-72.82h#panoid=2302150012230227210805392OI&panotype=street&heading=72.81&pitch=0&l=21&tn=B_NORMAL_MAP&sc=0&newmap=1&shareurl=1&pid=2302150012230227210805392OI&psp=%7B%22PanoModule%22%3A%7B%22markerUid%22%3A%221d4e623c6dd73505c356acca%22%7D%7D'
    },
    {
        id: 2,
        title: '教学楼全景',
        subtitle: '沉浸式体验',
        image: '/canteen.png',
        link: 'https://map.baidu.com/poi/%E8%A5%BF%E5%8D%97%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A6(%E7%8A%80%E6%B5%A6%E6%A0%A1%E5%8C%BA)/@11576574,3580924,21z,87t,-72.82h#panoid=98f72143566eb257fea77817&panotype=inter&heading=18.84&pitch=-17.15&l=13&tn=B_NORMAL_MAP&sc=0&newmap=1&shareurl=1&pid=1001920000141129181322385IN&iid=98f72143566eb257fea77817&psp=%7B%22PanoIndoorPoiModule%22%3A%7B%22uid%22%3A%221d4e623c6dd73505c356acca%22%7D%7D'
    },
    {
        id: 3,
        title: '犀糊全景',
        subtitle: '神秘',
        image: '/canteen.png',
        link: 'https://map.baidu.com/poi/%E8%A5%BF%E5%8D%97%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A6(%E7%8A%80%E6%B5%A6%E6%A0%A1%E5%8C%BA)/@11576574,3580924,21z,87t,-72.82h#panoid=98f72143566eb257fea77817&panotype=inter&heading=149.29&pitch=-16.48&l=13&tn=B_NORMAL_MAP&sc=0&newmap=1&shareurl=1&pid=1001920000141129181332502IN&iid=98f72143566eb257fea77817&psp=%7B%22PanoIndoorPoiModule%22%3A%7B%22uid%22%3A%221d4e623c6dd73505c356acca%22%7D%7D'
    },
    {
        id: 4,
        title: '神秘小路全景',
        subtitle: '神秘',
        image: '/canteen.png',
        link: 'https://map.baidu.com/poi/%E8%A5%BF%E5%8D%97%E4%BA%A4%E9%80%9A%E5%A4%A7%E5%AD%A6(%E7%8A%80%E6%B5%A6%E6%A0%A1%E5%8C%BA)/@11576574,3580924,21z,87t,-72.82h#panoid=98f72143566eb257fea77817&panotype=inter&heading=130.58&pitch=-15.12&l=13&tn=B_NORMAL_MAP&sc=0&newmap=1&shareurl=1&pid=1001920000141117212144092IN&iid=98f72143566eb257fea77817&psp=%7B%22PanoIndoorPoiModule%22%3A%7B%22uid%22%3A%221d4e623c6dd73505c356acca%22%7D%7D'
    }
]);

const affairItems = ref([
    { type: 'academic', icon: '📝', title: '学业辅导与咨询' },
    { type: 'career', icon: '🎯', title: '就业创业指导' },
    { type: 'scholarship', icon: '🏆', title: '奖学金评选' },
    { type: 'degree', icon: '🎓', title: '学位申请' },
    { type: 'textbook', icon: '📚', title: '教材领取' },
    { type: 'competition', icon: '🎨', title: '学科竞赛报名' }
]);

const affairDetails = reactive({
    title: '',
    description: '',
    contact: '',
    materials: ''
});

const affairDetailsMap = {
    academic: {
        title: '学业辅导与咨询',
        description: '提供学业规划、课程咨询、学习困难援助等服务。学生可预约与辅导员或专业老师交流。',
        contact: '学院楼302室 张老师 (028) 1234-5678',
        materials: '学生证、选课单据'
    },
    career: {
        title: '就业创业指导',
        description: '为学生提供职业生涯规划、求职技能培训、创业项目孵化等全方位支持。定期举办招聘会和讲座。',
        contact: '学院楼303室 王老师 (028) 1234-5679',
        materials: '简历、获奖证书'
    },
    scholarship: {
        title: '奖学金评选',
        description: '组织国家奖学金、学校奖学金、企业奖学金评选。要求成绩优异，综合测评排名靠前。每年9月开始报名。',
        contact: '学院楼302室 (028) 1234-5678',
        materials: '成绩单、获奖证书、推荐信'
    },
    degree: {
        title: '学位申请',
        description: '办理学士学位申请、学位论文提交、答辩安排等相关事宜。须满足学位授予条件。',
        contact: '学院楼305室 (028) 1234-5680',
        materials: '学位申请表、论文、成绩单'
    },
    textbook: {
        title: '教材领取',
        description: '每学期开学前一周发放教材。学生凭学生证领取本学期选修课程的教材。遗失可补办。',
        contact: '学院楼一楼 (028) 1234-5681',
        materials: '学生证'
    },
    competition: {
        title: '学科竞赛报名',
        description: '组织参加ACM程序设计竞赛、挑战杯创新创业大赛、全国大学生数学建模竞赛等多项赛事。',
        contact: '学院楼304室 李老师 (028) 1234-5682',
        materials: '参赛声明、队伍信息表'
    }
};

function performSearch() {
    const q = (searchKeyword.value || '').trim();
    if (!q) {
        alert('请输入搜索关键词');
        return;
    }

    // 显示搜索弹窗
    showSearchModal.value = true;
    searchResults.value = [];

    // 通过 document 事件将搜索请求发送给父组件（Map）执行真正的 LocalSearch
    const ev = new CustomEvent('sidebar-search', { detail: { keyword: q } });
    document.dispatchEvent(ev);
}

function onSearchFocus() {
    // 仅在已有结果时显示下拉；如果正在搜索（已触发），performSearch 会设置为 true
    if (searchResults.value && searchResults.value.length > 0) {
        showSearchDropdown.value = true;
    }
}

function selectResult(r) {
    if (!r || !r.point) return;
    emit('locate', { title: r.title, address: r.address, point: r.point });
    // 选择后关闭弹窗
    showSearchModal.value = false;
    searchKeyword.value = '';
}

function togglePanorama() {
    showPanorama.value = !showPanorama.value;
}

function toggleAffairs() {
    showAffairs.value = !showAffairs.value;
}

function showAffairDetail(type) {
    const item = affairItems.value.find(i => i.type === type);
    currentAffairIcon.value = item ? item.icon : '📋';
    const detail = affairDetailsMap[type];
    if (detail) {
        Object.assign(affairDetails, detail);
        showAffairModal.value = true;
    }
}

let onResults = null;

onMounted(() => {
    // 监听 Map 返回的搜索结果（document 事件回填）
    onResults = (e) => {
        try {
            const data = e.detail && e.detail.results ? e.detail.results : [];
            searchResults.value = Array.isArray(data) ? data : [];
        } catch (err) {
            console.warn('处理 sidebar-search-results 失败', err);
        }
    };
    document.addEventListener('sidebar-search-results', onResults);
});

onBeforeUnmount(() => {
    if (onResults) document.removeEventListener('sidebar-search-results', onResults);
});
</script>
<style scoped>
:root {
    --glass-bg: rgba(255, 255, 255, 0.6);
    --accent: linear-gradient(90deg, #7b4cff, #6db0ff);
    --border-color: rgba(0, 0, 0, 0.08);
}

.left-panel {
    width: 320px;
    background: rgba(255, 255, 255, 0.6);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border-radius: 14px;
    margin: 20px;
    padding: 14px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    z-index: 50;
    display: flex;
    flex-direction: column;
    max-height: calc(100vh - 112px);
    overflow-y: auto;
}

/* 搜索栏 */
.search-small {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
}

.search-input {
    flex: 1;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    outline: none;
    font-size: 13px;
    transition: border 0.18s;
}

.search-input:focus {
    border-color: #0066ff;
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
}

.search-btn {
    padding: 8px 12px;
    border-radius: 10px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    cursor: pointer;
    font-size: 14px;
    transition: all 0.18s;
}

.search-btn:hover {
    background: #f5f5f5;
    border-color: rgba(0, 0, 0, 0.12);
}

/* 搜索容器与覆盖下拉 */
.search-wrapper {
    position: relative;
}

.search-dropdown {
    position: absolute;
    left: 0;
    right: 0;
    top: 46px;
    background: rgba(255, 255, 255, 0.95);
    -webkit-backdrop-filter: blur(6px);
    backdrop-filter: blur(6px);
    border-radius: 12px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.12);
    padding: 10px;
    z-index: 200;
    max-height: 320px;
    overflow: auto;
}

.search-dropdown .menu-list .menu-item {
    background: transparent;
    margin-bottom: 6px;
    padding: 10px;
}

.section-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
}

.toggle-chev {
    color: #666;
    font-size: 12px;
}

/* 标签页导航 */
.tab-navigation {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border-color);
}

.tab-btn {
    flex: 1;
    padding: 8px 10px;
    border-radius: 8px;
    background: #f5f5f5;
    border: none;
    font-size: 12px;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.tab-btn:hover {
    background: #efefef;
}

.tab-btn.active {
    background: #0066ff;
    color: white;
    font-weight: 600;
}

/* 标签内容 */
.tab-content {
    flex: 1;
    overflow-y: auto;
    padding-right: 4px;
}

.tab-content::-webkit-scrollbar {
    width: 6px;
}

.tab-content::-webkit-scrollbar-track {
    background: transparent;
}

.tab-content::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
}

.tab-content::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
}

/* 菜单列表 */
.menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    margin-bottom: 10px;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.18s;
}

.menu-item:hover {
    background: rgba(0, 0, 0, 0.04);
}

.menu-item .icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    font-size: 18px;
}

.menu-item .text {
    flex: 1;
    font-weight: 500;
    color: #333;
    font-size: 13px;
}

.menu-item .chev {
    color: #ccc;
    font-size: 16px;
}

/* 自行车内容 */
.bike-content {
    padding-bottom: 8px;
}

.section-title {
    font-weight: 700;
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
    padding: 8px 0;
    border-bottom: 2px solid #0066ff;
}

.route-card {
    background: rgba(0, 102, 255, 0.08);
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 12px;
    border-left: 3px solid #0066ff;
}

.route-header {
    font-weight: 600;
    font-size: 13px;
    color: #0066ff;
    margin-bottom: 10px;
}

.route-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.route-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 0;
    font-size: 12px;
    color: #666;
    border-bottom: 1px solid rgba(0, 102, 255, 0.1);
}

.route-item:last-child {
    border-bottom: none;
}

.route-icon {
    font-size: 14px;
    min-width: 16px;
}

.route-name {
    flex: 1;
    color: #333;
}

.route-time {
    font-size: 11px;
    color: #999;
    background: rgba(0, 102, 255, 0.15);
    padding: 2px 6px;
    border-radius: 4px;
}

.route-tips {
    background: rgba(255, 152, 0, 0.08);
    border-radius: 10px;
    padding: 12px;
    border-left: 3px solid #ff9800;
    margin-top: 12px;
}

.tip-title {
    font-weight: 600;
    font-size: 13px;
    color: #ff9800;
    margin-bottom: 8px;
}

.tips-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.tips-list li {
    font-size: 12px;
    color: #666;
    padding: 4px 0;
    line-height: 1.4;
}

/* 学院事务内容 */
.college-content {
    padding-bottom: 8px;
}

.affair-card {
    background: rgba(76, 175, 80, 0.08);
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 12px;
    border-left: 3px solid #4caf50;
}

.affair-header {
    font-weight: 600;
    font-size: 13px;
    color: #4caf50;
    margin-bottom: 10px;
}

.affair-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.affair-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 0;
    font-size: 12px;
    border-bottom: 1px solid rgba(76, 175, 80, 0.1);
}

.affair-item:last-child {
    border-bottom: none;
}

.affair-icon {
    font-size: 14px;
    min-width: 16px;
}

.affair-name {
    flex: 1;
    color: #333;
    font-size: 13px;
}

.detail-btn {
    padding: 4px 8px;
    background: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 11px;
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;
}


.office-info {
    background: rgba(158, 158, 158, 0.08);
    border-radius: 10px;
    padding: 12px;
    border-left: 3px solid #9e9e9e;
    margin-top: 12px;
}

.info-header {
    font-weight: 600;
    font-size: 13px;
    color: #666;
    margin-bottom: 8px;
}

.info-box {
    background: white;
    border-radius: 6px;
    padding: 8px;
}

.info-line {
    font-size: 12px;
    color: #666;
    padding: 4px 0;
    line-height: 1.5;
}

/* 事务详情模态框 */
.affair-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
}

.modal-content {
    position: relative;
    background: white;
    border-radius: 12px;
    padding: 24px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    z-index: 1001;
    max-height: 80vh;
    overflow-y: auto;
}

.modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    background: none;
    border: none;
    font-size: 24px;
    color: #999;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-close:hover {
    color: #333;
}

.modal-content h3 {
    margin: 0 0 12px 0;
    font-size: 18px;
    color: #333;
    font-weight: 700;
}

.modal-body {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
    margin-bottom: 16px;
}

.modal-contacts {
    padding-top: 12px;
    border-top: 1px solid var(--border-color);
}

.modal-contacts p {
    font-size: 12px;
    color: #666;
    margin: 8px 0;
    line-height: 1.5;
}

/* 搜索结果弹窗 - 苹果简约风格 */
.search-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(20px);
}

.search-modal-content {
    position: relative;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(40px);
    border-radius: 18px;
    width: 90%;
    max-width: 500px;
    max-height: 70vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    animation: modalAppear 0.3s ease-out;
}

@keyframes modalAppear {
    from {
        opacity: 0;
        transform: scale(0.9);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.search-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
}

.search-modal-header h3 {
    margin: 0;
    font-size: 17px;
    font-weight: 600;
    color: #1d1d1f;
    letter-spacing: -0.3px;
}

.close-btn {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.06);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 18px;
    color: #6e6e73;
    transition: background 0.2s;
}

.close-btn:hover {
    background: rgba(0, 0, 0, 0.1);
}

.search-modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 8px;
}

.results-list {
    display: flex;
    flex-direction: column;
    gap: 1px;
}

.result-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: white;
    cursor: pointer;
    transition: background 0.15s;
}

.result-item:first-child {
    border-radius: 12px 12px 0 0;
}

.result-item:last-child {
    border-radius: 0 0 12px 12px;
}

.result-item:only-child {
    border-radius: 12px;
}

.result-item:hover {
    background: rgba(0, 0, 0, 0.04);
}

.result-item:active {
    background: rgba(0, 0, 0, 0.08);
}

.result-left {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    min-width: 0;
}

.result-icon {
    font-size: 20px;
    flex-shrink: 0;
}

.result-info {
    flex: 1;
    min-width: 0;
}

.result-title {
    font-size: 15px;
    font-weight: 500;
    color: #1d1d1f;
    margin-bottom: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.result-address {
    font-size: 13px;
    color: #86868b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.result-arrow {
    color: #c7c7cc;
    font-size: 22px;
    font-weight: 300;
    flex-shrink: 0;
    margin-left: 8px;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
}

.empty-icon {
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.3;
}

.empty-text {
    font-size: 15px;
    color: #86868b;
}

.search-modal-body::-webkit-scrollbar {
    width: 6px;
}

.search-modal-body::-webkit-scrollbar-track {
    background: transparent;
}

.search-modal-body::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 3px;
}

.search-modal-body::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.25);
}

/* 全景卡片 - 苹果风格 */
.panorama-section {
    margin-bottom: 16px;
}

.panorama-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.panorama-card {
    display: block;
    border-radius: 12px;
    overflow: hidden;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    cursor: pointer;
}

.panorama-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.panorama-card:active {
    transform: translateY(-2px);
}

.panorama-image {
    position: relative;
    width: 100%;
    height: 120px;
    background-size: cover;
    background-position: center;
    background-color: #f5f5f7;
}

.panorama-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 8px;
    opacity: 0;
    transition: opacity 0.3s;
}

.panorama-card:hover .panorama-overlay {
    opacity: 1;
}

.panorama-icon {
    width: 28px;
    height: 28px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.panorama-info {
    padding: 10px 12px;
}

.panorama-title {
    font-size: 14px;
    font-weight: 600;
    color: #1d1d1f;
    margin-bottom: 2px;
    letter-spacing: -0.2px;
}

.panorama-subtitle {
    font-size: 12px;
    color: #86868b;
    font-weight: 400;
}

/* 单列布局（小屏幕） */
@media (max-width: 360px) {
    .panorama-grid {
        grid-template-columns: 1fr;
    }
}

/* 学院事务卡片入口 - 苹果风格 */
.affairs-section {
    margin-bottom: 16px;
}

.affairs-card-entry {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    cursor: pointer;
    transition: all 0.3s;
}

.affairs-card-entry:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.affairs-card-entry:active {
    transform: scale(0.98);
}

.entry-icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
}

.entry-info {
    flex: 1;
    min-width: 0;
}

.entry-title {
    font-size: 15px;
    font-weight: 600;
    color: #1d1d1f;
    margin-bottom: 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.entry-subtitle {
    font-size: 12px;
    color: #86868b;
}

.entry-arrow {
    color: #c7c7cc;
    font-size: 24px;
    font-weight: 300;
}

/* 学院事务弹窗 - 苹果风格 */
.affairs-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.affairs-modal-content {
    position: relative;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(40px);
    border-radius: 20px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    overflow: hidden;
    animation: modalAppear 0.3s ease-out;
}

.affairs-modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
}

.affairs-modal-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1d1d1f;
    letter-spacing: -0.3px;
}

.affairs-modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 20px 24px;
}

.affairs-section-block {
    margin-bottom: 24px;
}

.affairs-section-block:last-child {
    margin-bottom: 0;
}

.affairs-section-title {
    font-size: 15px;
    font-weight: 600;
    color: #1d1d1f;
    margin-bottom: 12px;
}

.affairs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
}

.affair-card-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 12px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    transition: all 0.2s;
}

.affair-card-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.affair-card-item:active {
    transform: translateY(-2px);
}

.affair-card-icon {
    font-size: 32px;
    margin-bottom: 8px;
}

.affair-card-title {
    font-size: 13px;
    font-weight: 500;
    color: #1d1d1f;
    text-align: center;
    line-height: 1.3;
}

.office-info-card {
    background: white;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
}

.info-item:last-child {
    border-bottom: none;
}

.info-label {
    font-size: 14px;
    font-weight: 500;
    color: #86868b;
}

.info-value {
    font-size: 14px;
    color: #1d1d1f;
    text-align: right;
}

/* 事务详情弹窗 - 苹果风格 */
.affair-detail-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2100;
}

.affair-detail-content {
    position: relative;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(40px);
    border-radius: 20px;
    width: 90%;
    max-width: 500px;
    padding: 32px 28px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: modalAppear 0.3s ease-out;
    text-align: center;
}

.detail-icon {
    font-size: 56px;
    margin-bottom: 16px;
}

.affair-detail-content h3 {
    margin: 0 0 16px 0;
    font-size: 20px;
    font-weight: 600;
    color: #1d1d1f;
}

.detail-description {
    font-size: 15px;
    color: #6e6e73;
    line-height: 1.6;
    margin-bottom: 24px;
    text-align: left;
}

.detail-info {
    background: rgba(0, 0, 0, 0.02);
    border-radius: 12px;
    padding: 16px;
    text-align: left;
}

.detail-info-item {
    margin-bottom: 16px;
}

.detail-info-item:last-child {
    margin-bottom: 0;
}

.detail-label {
    font-size: 13px;
    font-weight: 600;
    color: #1d1d1f;
    margin-bottom: 4px;
}

.detail-value {
    font-size: 14px;
    color: #6e6e73;
    line-height: 1.5;
}

.affairs-modal-body::-webkit-scrollbar {
    width: 6px;
}

.affairs-modal-body::-webkit-scrollbar-track {
    background: transparent;
}

.affairs-modal-body::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 3px;
}

.affairs-modal-body::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.25);
}

@media (max-width: 480px) {
    .affairs-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
