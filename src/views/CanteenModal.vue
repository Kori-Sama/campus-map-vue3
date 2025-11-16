<template>
    <div v-if="show" class="canteen-modal-overlay" @click="closeModal">
        <div class="canteen-modal" @click.stop>
            <button class="modal-close" @click="closeModal">✕</button>

            <div class="modal-header">
                <h2>🍽️ 西南交通大学食堂</h2>
                <div class="tab-container">
                    <div class="tab-item" :class="{ active: activeTab === 'rules' }" @click="handleTabSwitch('rules')">
                        食堂使用规则
                    </div>
                    <div class="tab-item" :class="{ active: activeTab === 'data' }" @click="handleTabSwitch('data')">
                        数据可视化大屏
                    </div>
                </div>
            </div>

            <div class="modal-body">
                <!-- 使用规则 -->
                <div v-if="activeTab === 'rules'">
                    <div class="info-section">
                        <h3>基本信息</h3>
                        <div class="info-item">
                            <span class="label">📍 位置：</span>
                            <span>校园中心区（近第一教学楼，从北门步行约5分钟）</span>
                        </div>
                        <div class="info-item">
                            <span class="label">⏰ 营业时间：</span>
                            <span>早餐 7:00-9:00 | 午餐 11:00-14:00 | 晚餐 17:00-20:00</span>
                        </div>
                        <div class="info-item">
                            <span class="label">📞 联系电话：</span>
                            <span>服务台 028-66367777 | 投诉建议 028-66367788</span>
                        </div>
                    </div>

                    <div class="info-section">
                        <h3>就餐规则</h3>
                        <ul class="facilities-list">
                            <li>🥗 刷卡入场：持校园卡刷卡进入，保持秩序排队</li>
                            <li>🍴 自带餐具：鼓励自带餐具，减少一次性用品</li>
                            <li>🚫 占位限制：禁止占座用餐完毕后及时离开</li>
                            <li>⚠️ 食物安全：食品保质期内，禁止携带外卖入内</li>
                            <li>🧹 环境维护：就餐后请将餐盘放回回收台，保持环境卫生</li>
                        </ul>
                    </div>

                    <div class="info-section">
                        <h3>餐厅设施</h3>
                        <ul class="facilities-list">
                            <li>🍽️ 主食区：提供米饭、面条、馒头等基础主食</li>
                            <li>🥘 热菜区：工科楼食堂供应20+款热菜，按餐次轮换</li>
                            <li>🥗 小吃区：沙拉、凉菜、水果供应</li>
                            <li>☕ 饮品区：豆浆、咖啡、奶茶等</li>
                            <li>💻 自习区：餐厅二楼部分区域提供座位可用作临时学习</li>
                        </ul>
                    </div>

                    <div class="info-section">
                        <h3>交通指引</h3>
                        <p>
                            校内路线：从校大门步行约10分钟即可到食堂；各教学楼至食堂有明显指示牌。<br>
                            校外路线：地铁2号线「交大站」D口出，步行12分钟至校园东门，进入后直行500米；自驾可停至食堂地下停车场（凭校园卡免费1小时）。
                        </p>
                    </div>
                </div>

                <!-- 大屏数据可视化 -->
                <div v-if="activeTab === 'data'" class="data-visual-section">
                    <div class="data-cards">
                        <div class="data-card">
                            <div class="data-title">今日就餐人数</div>
                            <div class="data-value">{{ todayVisitors }}</div>
                            <div class="data-trend up">↑10% 较昨日</div>
                        </div>
                        <div class="data-card">
                            <div class="data-title">当前在餐人数</div>
                            <div class="data-value">{{ currentVisitors }}</div>
                            <div class="data-trend down">↓5% 较上小时</div>
                        </div>
                        <div class="data-card">
                            <div class="data-title">今日销售额</div>
                            <div class="data-value">¥{{ todayRevenue }}</div>
                            <div class="data-trend up">↑8% 较昨日</div>
                        </div>
                        <div class="data-card">
                            <div class="data-title">餐桌使用率</div>
                            <div class="data-value">{{ tableUsage }}%</div>
                            <div class="data-trend up">↑12% 较上周</div>
                        </div>
                    </div>

                    <div class="chart-tabs">
                        <button class="chart-tab-btn" :class="{ active: currentChart === 'line' }"
                            @click="switchChart('line')">
                            📈 餐桌使用率
                        </button>
                        <button class="chart-tab-btn" :class="{ active: currentChart === 'pie' }"
                            @click="switchChart('pie')">
                            🍱 菜品分类销售
                        </button>
                        <button class="chart-tab-btn" :class="{ active: currentChart === 'bar' }"
                            @click="switchChart('bar')">
                            ⏰ 就餐高峰时段
                        </button>
                        <button class="chart-tab-btn" :class="{ active: currentChart === 'wordCloud' }"
                            @click="switchChart('wordCloud')">
                            ☁️ 热门菜品
                        </button>
                    </div>

                    <div class="charts-container">
                        <div v-show="currentChart === 'line'" class="chart-item">
                            <h4>📈 近7天餐桌使用率趋势</h4>
                            <div ref="lineChart" class="chart-canvas"></div>
                        </div>
                        <div v-show="currentChart === 'pie'" class="chart-item">
                            <h4>🍱 菜品分类销售占比</h4>
                            <div ref="pieChart" class="chart-canvas"></div>
                        </div>
                        <div v-show="currentChart === 'bar'" class="chart-item">
                            <h4>⏰ 每日就餐高峰时段</h4>
                            <div ref="barChart" class="chart-canvas"></div>
                        </div>
                        <div v-show="currentChart === 'wordCloud'" class="chart-item">
                            <h4>☁️ 热门菜品关键词</h4>
                            <div ref="wordCloudChart" class="chart-canvas"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-secondary" @click="closeModal">关闭</button>
                <button class="btn btn-primary" @click="navigateToCanteen">🗺️ 导航到此</button>
                <button class="btn btn-info" @click="openFullScreenData" v-if="activeTab === 'data'">
                    📊 查看完整大屏
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick, getCurrentInstance } from 'vue';

const props = defineProps({
    show: Boolean
});
const emit = defineEmits(['close', 'navigate', 'open-full-screen-data']);

const activeTab = ref('rules');
const currentChart = ref('line');

// 模拟数据
const todayVisitors = ref(980);
const currentVisitors = ref(420);
const todayRevenue = ref(15230);
const tableUsage = ref(65);

const lineChart = ref(null);
const pieChart = ref(null);
const barChart = ref(null);
const wordCloudChart = ref(null);

let lineChartInstance = null;
let pieChartInstance = null;
let barChartInstance = null;
let wordCloudChartInstance = null;

const { proxy } = getCurrentInstance();

// 折线图配置 - 餐桌使用率趋势
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
        data: [60, 70, 65, 80, 75, 50, 55],
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

// 饼图配置 - 菜品分类销售占比
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
            { name: '主食类', value: 40 },
            { name: '热菜类', value: 30 },
            { name: '凉菜类', value: 15 },
            { name: '饮品类', value: 10 },
            { name: '其他类', value: 5 }
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

// 柱状图配置 - 就餐高峰时段
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
        data: ['7-9点', '9-11点', '11-13点', '13-15点', '15-17点', '17-19点', '19-21点'],
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
        data: [380, 120, 450, 180, 90, 420, 150],
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

// 词云图配置 - 热门菜品关键词
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
            { name: '麻辣香锅', value: 1500 },
            { name: '红烧肉', value: 1200 },
            { name: '鱼香肉丝', value: 1100 },
            { name: '宫保鸡丁', value: 1000 },
            { name: '蛋炒饭', value: 950 },
            { name: '番茄炒蛋', value: 900 },
            { name: '酸辣土豆丝', value: 850 },
            { name: '牛肉面', value: 800 },
            { name: '担担面', value: 750 },
            { name: '煲仔饭', value: 700 },
            { name: '盖浇饭', value: 650 },
            { name: '麻婆豆腐', value: 600 },
            { name: '回锅肉', value: 550 },
            { name: '青椒肉丝', value: 500 },
            { name: '水煮鱼', value: 480 },
            { name: '毛血旺', value: 450 },
            { name: '糖醋里脊', value: 420 },
            { name: '东坡肉', value: 400 },
            { name: '可乐鸡翅', value: 380 },
            { name: '小龙虾', value: 350 },
            { name: '烤鱼', value: 320 },
            { name: '火锅', value: 300 },
            { name: '冒菜', value: 280 },
            { name: '串串香', value: 260 },
            { name: '烧烤', value: 240 }
        ]
    }]
});

// 初始化图表函数
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

const handleTabSwitch = (tab) => {
    activeTab.value = tab;
    if (tab === 'data') {
        nextTick(initCharts);
    }
};

const switchChart = (chartType) => {
    currentChart.value = chartType;
    nextTick(() => {
        if (chartType === 'line') lineChartInstance?.resize();
        if (chartType === 'pie') pieChartInstance?.resize();
        if (chartType === 'bar') barChartInstance?.resize();
        if (chartType === 'wordCloud') wordCloudChartInstance?.resize();
    });
};

watch(() => props.show, (val) => {
    if (val && activeTab.value === 'data') nextTick(initCharts);
});

const closeModal = () => emit('close');
const navigateToCanteen = () => emit('navigate');

const openFullScreenData = () => {
    // 创建全屏数据可视化页面
    const fullScreenWindow = window.open('', '_blank', 'width=1920,height=1080');
    const fullScreenContent = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>西南交通大学食堂 - 数据可视化大屏</title>
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
            🍽️ 西南交通大学食堂 - 数据可视化大屏
        </div>
        <div class="data-overview">
            <div class="data-card">
                <div class="data-title">今日就餐人数</div>
                <div class="data-value">${todayVisitors.value}</div>
            </div>
            <div class="data-card">
                <div class="data-title">当前在餐人数</div>
                <div class="data-value">${currentVisitors.value}</div>
            </div>
            <div class="data-card">
                <div class="data-title">今日销售额</div>
                <div class="data-value">¥${todayRevenue.value}</div>
            </div>
            <div class="data-card">
                <div class="data-title">餐桌使用率</div>
                <div class="data-value">${tableUsage.value}%</div>
            </div>
        </div>
        <div class="charts-area">
            <div class="chart-container">
                <div class="chart-title">📈 近7天餐桌使用率趋势</div>
                <div id="lineChart" class="chart-canvas"></div>
            </div>
            <div class="chart-container">
                <div class="chart-title">🍱 菜品分类销售占比</div>
                <div id="pieChart" class="chart-canvas"></div>
            </div>
            <div class="chart-container">
                <div class="chart-title">⏰ 每日就餐高峰时段</div>
                <div id="barChart" class="chart-canvas"></div>
            </div>
            <div class="chart-container">
                <div class="chart-title">☁️ 热门菜品关键词</div>
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
/* 样式完全仿照图书馆 */
.canteen-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(2px);
    z-index: 11000;
}

.canteen-modal {
    background: white;
    border-radius: 16px;
    width: 90%;
    max-width: 900px;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
    animation: slideIn 0.3s ease-out;
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

.modal-body {
    padding: 24px;
}

.info-section {
    margin-bottom: 20px;
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
    padding: 0;
    margin: 0;
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

.btn-primary {
    background: linear-gradient(90deg, #2575fc, #0d47a1);
    color: white;
}

.btn-info {
    background: linear-gradient(90deg, #6a11cb, #2575fc);
    color: white;
}

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
    backdrop-filter: blur(10px);
}

.data-title {
    font-size: 14px;
    color: #00d4ff;
    margin-bottom: 8px;
}

.data-value {
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 4px;
}

.data-trend.up {
    color: #00ff88;
}

.data-trend.down {
    color: #ff4757;
}

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
    text-shadow: 0 0 5px rgba(0, 212, 255, 0.3);
}

.chart-tab-btn.active {
    background: linear-gradient(135deg, #2575fc, #6a11cb);
    color: white;
    border-color: #2575fc;
}

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
}

.chart-item h4 {
    margin: 0;
    font-size: 16px;
    color: #00d4ff;
    font-weight: 600;
    text-align: center;
    padding: 15px;
    background: rgba(0, 212, 255, 0.1);
    border-bottom: 1px solid rgba(0, 212, 255, 0.3);
}

.chart-canvas {
    width: 100%;
    height: 280px;
}
</style>
