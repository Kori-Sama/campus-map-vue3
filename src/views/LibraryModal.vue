<template>
    <div v-if="show" class="library-modal-overlay" @click="closeModal">
        <div class="library-modal" @click.stop>
            <button class="modal-close" @click="closeModal">✕</button>

            <div class="modal-header">
                <h2>📚 西南交通大学图书馆</h2>
                <div class="tab-container">
                    <div class="tab-item" :class="{ active: activeTab === 'rules' }" @click="handleTabSwitch('rules')">
                        图书馆使用规则
                    </div>
                    <div class="tab-item" :class="{ active: activeTab === 'data' }" @click="handleTabSwitch('data')">
                        数据可视化大屏
                    </div>
                </div>
            </div>

            <div class="modal-body">
                <!-- 使用规则 -->
                <div v-if="activeTab === 'rules'">
                    <!-- 1. 图书馆使用规则（完整保留原功能，补充细节） -->
                    <div v-if="activeTab === 'rules'">
                        <div class="info-section">
                            <h3>基本信息</h3>
                            <div class="info-item">
                                <span class="label">📍 位置：</span>
                                <span>校园中心区（近第一教学楼，从北门步行约8分钟）</span>
                            </div>
                            <div class="info-item">
                                <span class="label">⏰ 开放时间：</span>
                                <span>周一至周五 8:00-22:00 | 周末 9:00-20:00（法定节假日见公告）</span>
                            </div>
                            <div class="info-item">
                                <span class="label">📞 联系电话：</span>
                                <span>服务台 028-66366888 | 技术支持 028-66366999</span>
                            </div>
                        </div>

                        <div class="info-section">
                            <h3>借阅规则</h3>
                            <ul class="facilities-list">
                                <li>📚 借阅额度：本科生10册/30天，研究生20册/60天，教师30册/90天</li>
                                <li>🔄 续借规则：可续借1次（续借期限同首借），需在到期前3天通过APP/官网操作</li>
                                <li>⚠️ 逾期处罚：每册每天0.1元，累计超30天暂停借阅权限1周，超60天列入黑名单</li>
                                <li>🔍 预约服务：热门图书可在线预约，到馆后保留3天取书时间（短信通知）</li>
                                <li>📖 特殊文献：古籍、孤本、特藏图书仅限馆内阅览，不可外借（需登记身份证）</li>
                            </ul>
                        </div>

                        <div class="info-section">
                            <h3>自习区使用规则</h3>
                            <ul class="facilities-list">
                                <li>🪑 座位预约：通过“西南交大图书馆”APP预约，单次最长4小时，超时未到自动释放</li>
                                <li>📱 占座禁止：禁止用书包、书籍等物品占座，离开超30分钟视为放弃座位</li>
                                <li>🔇 安静要求：保持低声交流，电子设备音量≤30%，禁止外放视频/音乐</li>
                                <li>🚫 饮食限制：仅允许携带密封水杯，禁止食用零食、外卖（咖啡厅区域除外）</li>
                                <li>⏰ 闭馆提醒：闭馆前30分钟停止进入，前10分钟清场，需及时整理个人物品</li>
                            </ul>
                        </div>

                        <div class="info-section">
                            <h3>设施服务</h3>
                            <ul class="facilities-list">
                                <li>📖 自习室：1-3楼（1000+座位，支持线上预约，配备空调和护眼灯）</li>
                                <li>💻 电子阅览室：2楼（200+台电脑，免费使用，需刷校园卡登录）</li>
                                <li>☕ 学术咖啡厅：1楼（提供简餐、咖啡，支持无线充电，消费区需保持安静）</li>
                                <li>🔌 充电区：各楼层走廊（支持Type-C/USB-A快充，部分座位配备插座）</li>
                                <li>📚 馆藏资源：150万+册纸质书，500万+册电子书，2000+种中外文期刊</li>
                                <li>🎥 学术报告厅：4楼（可预约举办讲座、研讨会，容量200人，需提前3天申请）</li>
                            </ul>
                        </div>

                        <div class="info-section">
                            <h3>交通指引</h3>
                            <p>
                                校内路线：从校大门步行约15分钟；乘坐校内摆渡车（1号线）至「图书馆站」下车即达；各教学楼至图书馆均有指示牌；<br>
                                校外路线：地铁2号线「交大站」D口出，步行10分钟至校园东门，进入后直行800米；自驾可停至图书馆地下停车场（凭校园卡免费2小时）。
                            </p>
                        </div>
                    </div>
                </div>

                <!-- 2. 大屏大数据可视化模块（基于ECharts） -->
                <div v-if="activeTab === 'data'" class="data-visual-section">
                    <!-- 数据概览卡片（顶部关键指标） -->
                    <div class="data-cards">
                        <div class="data-card">
                            <div class="data-title">今日到馆人数</div>
                            <div class="data-value">{{ todayVisitors }}</div>
                            <div class="data-trend up">↑12% 较昨日</div>
                        </div>
                        <div class="data-card">
                            <div class="data-title">当前在馆人数</div>
                            <div class="data-value">{{ currentVisitors }}</div>
                            <div class="data-trend down">↓5% 较上小时</div>
                        </div>
                        <div class="data-card">
                            <div class="data-title">今日借阅量</div>
                            <div class="data-value">{{ todayBorrows }}</div>
                            <div class="data-trend up">↑8% 较昨日</div>
                        </div>
                        <div class="data-card">
                            <div class="data-title">座位使用率</div>
                            <div class="data-value">{{ seatUsage }}%</div>
                            <div class="data-trend up">↑15% 较上周</div>
                        </div>
                    </div>

                    <!-- 图表切换按钮 -->
                    <div class="chart-tabs">
                        <button class="chart-tab-btn" :class="{ active: currentChart === 'line' }"
                            @click="switchChart('line')">
                            📈 座位使用率
                        </button>
                        <button class="chart-tab-btn" :class="{ active: currentChart === 'pie' }"
                            @click="switchChart('pie')">
                            📊 图书分类
                        </button>
                        <button class="chart-tab-btn" :class="{ active: currentChart === 'bar' }"
                            @click="switchChart('bar')">
                            ⏰ 借阅时段
                        </button>
                        <button class="chart-tab-btn" :class="{ active: currentChart === 'wordCloud' }"
                            @click="switchChart('wordCloud')">
                            ☁️ 热门关键词
                        </button>
                    </div>

                    <!-- 核心图表区域(使用ECharts) -->
                    <div class="charts-container">
                        <!-- 图表1:近7天座位使用率趋势(折线图) -->
                        <div v-show="currentChart === 'line'" class="chart-item">
                            <h4>📈 近7天座位使用率趋势</h4>
                            <div ref="lineChart" class="chart-canvas"></div>
                        </div>

                        <!-- 图表2:图书分类借阅占比(饼图) -->
                        <div v-show="currentChart === 'pie'" class="chart-item">
                            <h4>📊 图书分类借阅占比</h4>
                            <div ref="pieChart" class="chart-canvas"></div>
                        </div>

                        <!-- 图表3:每日借阅高峰时段(柱状图) -->
                        <div v-show="currentChart === 'bar'" class="chart-item">
                            <h4>⏰ 每日借阅高峰时段</h4>
                            <div ref="barChart" class="chart-canvas"></div>
                        </div>

                        <!-- 图表4:热门搜索词云 -->
                        <div v-show="currentChart === 'wordCloud'" class="chart-item">
                            <h4>☁️ 热门搜索关键词</h4>
                            <div ref="wordCloudChart" class="chart-canvas"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-secondary" @click="closeModal">关闭</button>
                <button class="btn btn-primary" @click="navigateToLibrary">🗺️ 导航到此</button>
                <button class="btn btn-info" @click="openFullScreenData" v-if="activeTab === 'data'">
                    📊 查看完整大屏
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, getCurrentInstance } from 'vue';

// 1. 接收父组件参数
const props = defineProps({
    show: {
        type: Boolean,
        default: false,
        required: true
    }
});

// 2. 定义触发事件
const emit = defineEmits(['close', 'navigate', 'open-full-screen-data']);

// 3. 内部状态管理
const activeTab = ref('rules');
const currentChart = ref('line'); // 当前显示的图表

// 模拟图书馆核心数据
const todayVisitors = ref(1286);
const currentVisitors = ref(842);
const todayBorrows = ref(356);
const seatUsage = ref(78);

// 4. ECharts 实例引用
const lineChart = ref(null);
const pieChart = ref(null);
const barChart = ref(null);
const wordCloudChart = ref(null);
let lineChartInstance = null;
let pieChartInstance = null;
let barChartInstance = null;
let wordCloudChartInstance = null;

// 5. ECharts 配置
// 折线图配置 - 座位使用率趋势
const lineChartOption = ref({
    backgroundColor: 'transparent',
    grid: {
        top: '15%',
        left: '10%',
        right: '10%',
        bottom: '15%'
    },
    xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLine: {
            lineStyle: { color: '#00d4ff' }
        },
        axisLabel: {
            color: '#00d4ff'
        }
    },
    yAxis: {
        type: 'value',
        max: 100,
        axisLine: {
            lineStyle: { color: '#00d4ff' }
        },
        axisLabel: {
            color: '#00d4ff',
            formatter: '{value}%'
        },
        splitLine: {
            lineStyle: { color: 'rgba(0, 212, 255, 0.2)' }
        }
    },
    series: [{
        data: [65, 72, 88, 76, 92, 45, 38],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
            width: 3,
            color: {
                type: 'linear',
                x: 0, y: 0, x2: 1, y2: 0,
                colorStops: [{
                    offset: 0, color: '#2575fc'
                }, {
                    offset: 1, color: '#00d4ff'
                }]
            }
        },
        itemStyle: {
            color: '#00d4ff',
            shadowColor: '#00d4ff',
            shadowBlur: 10
        },
        areaStyle: {
            color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [{
                    offset: 0, color: 'rgba(37, 117, 252, 0.3)'
                }, {
                    offset: 1, color: 'rgba(0, 212, 255, 0.1)'
                }]
            }
        }
    }]
});

// 饼图配置 - 图书分类占比
const pieChartOption = ref({
    backgroundColor: 'transparent',
    legend: {
        orient: 'vertical',
        left: '10%',
        top: '20%',
        textStyle: {
            color: '#00d4ff'
        }
    },
    series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
        data: [
            { name: '工科类', value: 42 },
            { name: '文学类', value: 23 },
            { name: '理学类', value: 15 },
            { name: '社科类', value: 12 },
            { name: '其他类', value: 8 }
        ],
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
        itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 2
        },
        label: {
            color: '#00d4ff',
            formatter: '{b}: {c}%'
        },
        color: ['#2575fc', '#6a11cb', '#00b42a', '#f53f3f', '#ff7d00']
    }]
});

// 柱状图配置 - 借阅高峰时段
const barChartOption = ref({
    backgroundColor: 'transparent',
    grid: {
        top: '15%',
        left: '15%',
        right: '10%',
        bottom: '20%'
    },
    xAxis: {
        type: 'category',
        data: ['8-10点', '10-12点', '12-14点', '14-16点', '16-18点', '18-20点', '20-22点'],
        axisLine: {
            lineStyle: { color: '#00d4ff' }
        },
        axisLabel: {
            color: '#00d4ff',
            rotate: 45
        }
    },
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: { color: '#00d4ff' }
        },
        axisLabel: {
            color: '#00d4ff'
        },
        splitLine: {
            lineStyle: { color: 'rgba(0, 212, 255, 0.2)' }
        }
    },
    series: [{
        data: [45, 82, 38, 95, 120, 78, 62],
        type: 'bar',
        barWidth: '60%',
        itemStyle: {
            color: {
                type: 'linear',
                x: 0, y: 0, x2: 0, y2: 1,
                colorStops: [{
                    offset: 0, color: '#00d4ff'
                }, {
                    offset: 1, color: '#2575fc'
                }]
            },
            borderRadius: [4, 4, 0, 0],
            shadowColor: '#2575fc',
            shadowBlur: 10,
            shadowOffsetY: 5
        }
    }]
});

// 词云图配置 - 热门搜索关键词
const wordCloudOption = ref({
    backgroundColor: 'transparent',
    series: [{
        type: 'wordCloud',
        shape: 'circle',
        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,
        sizeRange: [14, 60],
        rotationRange: [-45, 45],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        layoutAnimation: true,
        textStyle: {
            fontFamily: 'Microsoft YaHei, sans-serif',
            fontWeight: 'bold',
            color: function () {
                const colors = [
                    '#2575fc', '#00d4ff', '#6a11cb', '#00b42a',
                    '#f53f3f', '#ff7d00', '#00d4ff', '#9254de'
                ];
                return colors[Math.floor(Math.random() * colors.length)];
            }
        },
        emphasis: {
            focus: 'self',
            textStyle: {
                textShadowBlur: 10,
                textShadowColor: '#00d4ff'
            }
        },
        data: [
            { name: '数据结构', value: 1500 },
            { name: '算法导论', value: 1200 },
            { name: '机器学习', value: 1100 },
            { name: '操作系统', value: 1000 },
            { name: '计算机网络', value: 950 },
            { name: '深度学习', value: 900 },
            { name: '人工智能', value: 850 },
            { name: 'Python编程', value: 800 },
            { name: '数据库原理', value: 750 },
            { name: '软件工程', value: 700 },
            { name: 'Java编程', value: 650 },
            { name: '编译原理', value: 600 },
            { name: '高等数学', value: 550 },
            { name: '线性代数', value: 500 },
            { name: '概率论', value: 480 },
            { name: '离散数学', value: 450 },
            { name: '计算机组成', value: 420 },
            { name: 'Web开发', value: 400 },
            { name: '大数据', value: 380 },
            { name: '云计算', value: 350 },
            { name: '区块链', value: 320 },
            { name: '物联网', value: 300 },
            { name: '信息安全', value: 280 },
            { name: 'C++程序设计', value: 260 },
            { name: '数字图像处理', value: 240 }
        ]
    }]
});

// 6. 初始化图表函数
const { proxy } = getCurrentInstance();

const initCharts = () => {
    if (!lineChart.value || !pieChart.value || !barChart.value || !wordCloudChart.value) return;

    // 初始化折线图
    lineChartInstance = proxy.$echarts.init(lineChart.value);
    lineChartInstance.setOption(lineChartOption.value);

    // 初始化饼图
    pieChartInstance = proxy.$echarts.init(pieChart.value);
    pieChartInstance.setOption(pieChartOption.value);

    // 初始化柱状图
    barChartInstance = proxy.$echarts.init(barChart.value);
    barChartInstance.setOption(barChartOption.value);

    // 初始化词云图
    wordCloudChartInstance = proxy.$echarts.init(wordCloudChart.value);
    wordCloudChartInstance.setOption(wordCloudOption.value);
};

// 7. Tab切换处理函数
const handleTabSwitch = (tab) => {
    activeTab.value = tab;
    if (tab === 'data') {
        currentChart.value = 'line'; // 切到数据tab时默认显示折线图
        nextTick(() => {
            initCharts();
        });
    }
};

// 图表切换函数
const switchChart = (chartType) => {
    currentChart.value = chartType;
    // 切换后重新调整图表大小
    nextTick(() => {
        if (chartType === 'line' && lineChartInstance) {
            lineChartInstance.resize();
        } else if (chartType === 'pie' && pieChartInstance) {
            pieChartInstance.resize();
        } else if (chartType === 'bar' && barChartInstance) {
            barChartInstance.resize();
        } else if (chartType === 'wordCloud' && wordCloudChartInstance) {
            wordCloudChartInstance.resize();
        }
    });
};

// 8. 监听弹窗显示状态
watch(() => props.show, (newVal) => {
    if (newVal && activeTab.value === 'data') {
        nextTick(() => {
            initCharts();
        });
    }
});

// 9. 事件处理函数
const closeModal = () => {
    emit('close');
};

const navigateToLibrary = () => {
    emit('navigate');
};

const openFullScreenData = () => {
    // 创建全屏数据可视化页面
    const fullScreenWindow = window.open('', '_blank', 'width=1920,height=1080');
    const fullScreenContent = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>西南交通大学图书馆 - 数据可视化大屏</title>
        <script src="https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js"><\/script>
        <script src="https://cdn.jsdelivr.net/npm/echarts-wordcloud@2.1.0/dist/echarts-wordcloud.min.js"><\/script>
<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
    font-family: 'Microsoft YaHei', sans-serif;
    overflow: hidden;
    height: 100vh;
}

.fullscreen-container {
    width: 100vw;
    height: 100vh;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.header {
    text-align: center;
    color: #00d4ff;
    font-size: 28px;
    font-weight: bold;
    text-shadow: 0 0 20px rgba(0, 212, 255, 0.8);
    flex-shrink: 0;
}

.data-overview {
    display: flex;
    gap: 15px;
    height: 100px;
    flex-shrink: 0;
}

.data-card {
    flex: 1;
    background: linear-gradient(135deg, rgba(37, 117, 252, 0.2), rgba(106, 17, 203, 0.2));
    border: 2px solid rgba(37, 117, 252, 0.5);
    border-radius: 12px;
    padding: 12px;
    text-align: center;
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(37, 117, 252, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.data-title {
    color: #00d4ff;
    font-size: 14px;
    margin-bottom: 5px;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
}

.data-value {
    color: #ffffff;
    font-size: 32px;
    font-weight: bold;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
}

.charts-area {
    flex: 1;
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 15px;
}

.chart-container {
    background: linear-gradient(135deg, rgba(26, 26, 46, 0.8), rgba(22, 33, 62, 0.8));
    border: 2px solid rgba(37, 117, 252, 0.4);
    border-radius: 12px;
    padding: 12px;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
}

.chart-title {
    color: #00d4ff;
    font-size: 16px;
    text-align: center;
    margin-bottom: 8px;
    text-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
    flex-shrink: 0;
}

.chart-canvas {
    flex: 1;
    min-height: 0;
    width: 100%;
    height: 100%;
}
</style>
</head>

<body>
    <div class="fullscreen-container">
        <div class="header">
            📚 西南交通大学图书馆 - 数据可视化大屏
        </div>
        <div class="data-overview">
            <div class="data-card">
                <div class="data-title">今日到馆人数</div>
                <div class="data-value">${todayVisitors.value}</div>
            </div>
            <div class="data-card">
                <div class="data-title">当前在馆人数</div>
                <div class="data-value">${currentVisitors.value}</div>
            </div>
            <div class="data-card">
                <div class="data-title">今日借阅量</div>
                <div class="data-value">${todayBorrows.value}</div>
            </div>
            <div class="data-card">
                <div class="data-title">座位使用率</div>
                <div class="data-value">${seatUsage.value}%</div>
            </div>
        </div>
        <div class="charts-area">
            <div class="chart-container">
                <div class="chart-title">📈 近7天座位使用率趋势</div>
                <div id="lineChart" class="chart-canvas"></div>
            </div>
            <div class="chart-container">
                <div class="chart-title">📊 图书分类借阅占比</div>
                <div id="pieChart" class="chart-canvas"></div>
            </div>
            <div class="chart-container">
                <div class="chart-title">⏰ 每日借阅高峰时段</div>
                <div id="barChart" class="chart-canvas"></div>
            </div>
            <div class="chart-container">
                <div class="chart-title">☁️ 热门搜索关键词</div>
                <div id="wordCloudChart" class="chart-canvas"></div>
            </div>
        </div>
    </div>
    <script>
            // 初始化图表
            window.onload = function() {
                // 折线图
                const lineChart = echarts.init(document.getElementById('lineChart'));
                lineChart.setOption(${JSON.stringify(lineChartOption.value)});
                
                // 饼图
                const pieChart = echarts.init(document.getElementById('pieChart'));
                pieChart.setOption(${JSON.stringify(pieChartOption.value)});
                
                // 柱状图
                const barChart = echarts.init(document.getElementById('barChart'));
                barChart.setOption(${JSON.stringify(barChartOption.value)});
                
                // 词云图
                const wordCloudChart = echarts.init(document.getElementById('wordCloudChart'));
                wordCloudChart.setOption(${JSON.stringify(wordCloudOption.value)});
                
                // 自适应窗口大小
                window.addEventListener('resize', function() {
                    lineChart.resize();
                    pieChart.resize();
                    barChart.resize();
                    wordCloudChart.resize();
                });
            };
        <\/script>
</body>

</html>
`;
    fullScreenWindow.document.write(fullScreenContent);
    fullScreenWindow.document.close();
};
</script>

<style scoped>
/* 原有样式保留，新增Tab切换、数据可视化相关样式 */
.library-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 11000;
    backdrop-filter: blur(2px);
}

.library-modal {
    background: white;
    border-radius: 16px;
    width: 90%;
    max-width: 900px;
    /* 加宽弹窗以适配数据可视化 */
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    position: relative;
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: color 0.18s;
}

.modal-close:hover {
    color: #333;
}

.modal-header {
    padding: 24px 24px 16px;
    border-bottom: 2px solid #f0f0f0;
}

.modal-header h2 {
    margin: 0 0 16px 0;
    font-size: 22px;
    font-weight: 700;
    color: #333;
}

/* 新增：Tab切换样式 */
.tab-container {
    display: flex;
    border-radius: 8px;
    overflow: hidden;
    background: #f5f5f5;
    margin-top: 8px;
}

.tab-item {
    flex: 1;
    text-align: center;
    padding: 10px 0;
    font-size: 14px;
    font-weight: 600;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;
}

.tab-item.active {
    background: #2575fc;
    color: white;
}

.tab-item:hover:not(.active) {
    background: #e9e9e9;
}

.modal-body {
    padding: 24px;
}

.info-section {
    margin-bottom: 20px;
}

.info-section:last-child {
    margin-bottom: 0;
}

.info-section h3 {
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 700;
    color: #2575fc;
    border-bottom: 2px solid #2575fc;
    padding-bottom: 6px;
}

.info-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 14px;
    color: #333;
}

.label {
    font-weight: 600;
    margin-right: 8px;
    color: #555;
}

.facilities-list {
    list-style: none;
    margin: 0;
    padding: 0;
}

.facilities-list li {
    padding: 8px 0;
    font-size: 14px;
    color: #555;
    border-bottom: 1px solid #f0f0f0;
}

.facilities-list li:last-child {
    border-bottom: none;
}

.info-section p {
    margin: 0;
    font-size: 13px;
    line-height: 1.6;
    color: #666;
}

.modal-footer {
    display: flex;
    gap: 12px;
    padding: 16px 24px;
    border-top: 1px solid #f0f0f0;
    background: #f9f9f9;
    border-radius: 0 0 16px 16px;
}

.btn {
    flex: 1;
    padding: 12px 16px;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.18s;
}

.btn-secondary {
    background: #e0e0e0;
    color: #333;
}

.btn-secondary:hover {
    background: #d0d0d0;
}

.btn-primary {
    background: linear-gradient(90deg, #2575fc, #0d47a1);
    color: white;
}

.btn-primary:hover {
    box-shadow: 0 4px 12px rgba(37, 117, 252, 0.3);
}

/* 新增：信息按钮（查看完整大屏） */
.btn-info {
    background: linear-gradient(90deg, #6a11cb, #2575fc);
    color: white;
}

.btn-info:hover {
    box-shadow: 0 4px 12px rgba(106, 17, 203, 0.3);
}

/* 滚动条美化 */
.library-modal::-webkit-scrollbar {
    width: 6px;
}

.library-modal::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 3px;
}

.library-modal::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
}

.library-modal::-webkit-scrollbar-thumb:hover {
    background: #999;
}

/* 新增：数据可视化区域样式 */
.data-visual-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
    border-radius: 12px;
    padding: 20px;
    margin: -24px;
    margin-top: 0;
}

/* 数据卡片样式 */
.data-cards {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}

.data-card {
    flex: 1;
    min-width: 160px;
    background: linear-gradient(135deg, rgba(37, 117, 252, 0.1), rgba(106, 17, 203, 0.1));
    border: 1px solid rgba(37, 117, 252, 0.3);
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0 4px 15px rgba(37, 117, 252, 0.2);
    transition: transform 0.2s, box-shadow 0.2s;
    backdrop-filter: blur(10px);
}

.data-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(37, 117, 252, 0.4);
    border-color: rgba(37, 117, 252, 0.6);
}

.data-title {
    font-size: 14px;
    color: #00d4ff;
    margin-bottom: 8px;
    text-shadow: 0 0 5px rgba(0, 212, 255, 0.5);
}

.data-value {
    font-size: 28px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 4px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.data-trend {
    font-size: 12px;
}

.data-trend.up {
    color: #00ff88;
    text-shadow: 0 0 5px rgba(0, 255, 136, 0.5);
}

.data-trend.down {
    color: #ff4757;
    text-shadow: 0 0 5px rgba(255, 71, 87, 0.5);
}

/* 图表切换按钮 */
.chart-tabs {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.chart-tab-btn {
    flex: 1;
    min-width: 120px;
    padding: 12px 16px;
    background: linear-gradient(135deg, rgba(37, 117, 252, 0.15), rgba(106, 17, 203, 0.15));
    border: 1px solid rgba(37, 117, 252, 0.3);
    border-radius: 10px;
    color: #00d4ff;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    text-shadow: 0 0 5px rgba(0, 212, 255, 0.3);
}

.chart-tab-btn:hover {
    background: linear-gradient(135deg, rgba(37, 117, 252, 0.25), rgba(106, 17, 203, 0.25));
    border-color: rgba(37, 117, 252, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 117, 252, 0.3);
}

.chart-tab-btn.active {
    background: linear-gradient(135deg, #2575fc, #6a11cb);
    border-color: #2575fc;
    color: white;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    box-shadow: 0 6px 20px rgba(37, 117, 252, 0.5);
}

.chart-tab-btn.active:hover {
    transform: translateY(-3px);
}

/* 图表容器样式 */
.charts-container {
    display: flex;
    flex-direction: column;
    min-height: 400px;
}

.chart-item {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 12px;
    padding: 0;
    box-shadow: 0 4px 15px rgba(37, 117, 252, 0.2);
    border: 1px solid rgba(37, 117, 252, 0.3);
    overflow: hidden;
    animation: chartFadeIn 0.3s ease-out;
}

@keyframes chartFadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.chart-item h4 {
    margin: 0 0 5px 0;
    font-size: 16px;
    color: #00d4ff;
    font-weight: 600;
    text-align: center;
    padding: 15px;
    background: rgba(0, 212, 255, 0.1);
    border-bottom: 1px solid rgba(0, 212, 255, 0.3);
    text-shadow: 0 0 8px rgba(0, 212, 255, 0.6);
}

.chart-canvas {
    width: 100%;
    height: 400px;
    background: transparent;
    padding: 15px;
}

/* ECharts 图表样式 */
.chart-canvas {
    width: 100%;
    height: 280px;
}

/* 响应式适配（小屏幕优化） */
@media (max-width: 768px) {
    .library-modal {
        width: 95%;
        max-height: 90vh;
    }

    .modal-header h2 {
        font-size: 18px;
    }

    .data-cards {
        flex-direction: column;
    }

    .data-card {
        min-width: auto;
    }

    .modal-footer {
        flex-direction: column;
    }

    .chart-item {
        padding: 12px;
    }

    .chart-canvas {
        height: 200px;
    }

    .charts-container {
        gap: 15px;
    }

    .tab-item {
        font-size: 13px;
        padding: 8px 0;
    }
}
</style>