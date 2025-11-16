<template>
    <div v-if="show" class="gym-modal-overlay" @click="closeModal">
        <div class="gym-modal" @click.stop>
            <button class="modal-close" @click="closeModal">✕</button>

            <div class="modal-header">
                <h2>🏟️ 西南交通大学体育馆</h2>
                <div class="tab-container">
                    <div class="tab-item" :class="{ active: activeTab === 'rules' }" @click="handleTabSwitch('rules')">
                        体育馆使用规则
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
                            <span>校园东南区（近操场，从东门步行约10分钟）</span>
                        </div>
                        <div class="info-item">
                            <span class="label">⏰ 开放时间：</span>
                            <span>周一至周日 6:00-22:00（节假日正常开放）</span>
                        </div>
                        <div class="info-item">
                            <span class="label">📞 联系电话：</span>
                            <span>服务台 028-66368888 | 场地预约 028-66368899</span>
                        </div>
                    </div>

                    <div class="info-section">
                        <h3>使用规则</h3>
                        <ul class="facilities-list">
                            <li>🏀 场地预约：通过"智慧体育"APP预约，提前1-7天，单次最长2小时</li>
                            <li>👕 着装要求：必须穿运动服、运动鞋，禁止穿拖鞋、皮鞋入场</li>
                            <li>🎫 入场方式：刷校园卡或扫码入场，非本校人员需登记并缴纳场地费</li>
                            <li>⚠️ 安全规范：禁止携带玻璃器皿、危险物品，使用器械需遵守安全说明</li>
                            <li>🧹 文明使用：运动后归还器材，保持场地整洁，禁止吸烟、大声喧哗</li>
                        </ul>
                    </div>

                    <div class="info-section">
                        <h3>场馆设施</h3>
                        <ul class="facilities-list">
                            <li>🏀 篮球馆：2层，4片标准场地，配备LED记分板和专业地板</li>
                            <li>🏋️ 健身房：1层，150+台器械，含力量区、有氧区、自由重量区</li>
                            <li>🏊 游泳馆：地下1层，50米标准泳池，恒温28℃，配救生员</li>
                            <li>⚽ 足球场：室外天然草坪，可承办校级比赛，配更衣室</li>
                            <li>🎾 羽毛球馆：1层，12片场地，智能照明系统，可线上预约</li>
                            <li>🏓 乒乓球馆：2层，20张球台，提供球拍租赁服务</li>
                        </ul>
                    </div>

                    <div class="info-section">
                        <h3>交通指引</h3>
                        <p>
                            校内路线：从校大门步行约20分钟；乘坐校内摆渡车（2号线）至「体育中心站」下车；各宿舍楼至体育馆均有指示牌。<br>
                            校外路线：地铁2号线「交大站」C口出，步行15分钟至校园南门，进入后沿主干道前行600米；自驾可停至体育馆专用停车场（前2小时免费）。
                        </p>
                    </div>
                </div>

                <!-- 大屏数据可视化 -->
                <div v-if="activeTab === 'data'" class="data-visual-section">
                    <div class="data-cards">
                        <div class="data-card">
                            <div class="data-title">今日运动人数</div>
                            <div class="data-value">{{ todayVisitors }}</div>
                            <div class="data-trend up">↑15% 较昨日</div>
                        </div>
                        <div class="data-card">
                            <div class="data-title">当前在场人数</div>
                            <div class="data-value">{{ currentVisitors }}</div>
                            <div class="data-trend down">↓3% 较上小时</div>
                        </div>
                        <div class="data-card">
                            <div class="data-title">今日预约场次</div>
                            <div class="data-value">{{ todayBookings }}</div>
                            <div class="data-trend up">↑20% 较昨日</div>
                        </div>
                        <div class="data-card">
                            <div class="data-title">场地使用率</div>
                            <div class="data-value">{{ fieldUsage }}%</div>
                            <div class="data-trend up">↑18% 较上周</div>
                        </div>
                    </div>

                    <div class="chart-tabs">
                        <button class="chart-tab-btn" :class="{ active: currentChart === 'line' }"
                            @click="switchChart('line')">
                            📈 场地使用率
                        </button>
                        <button class="chart-tab-btn" :class="{ active: currentChart === 'pie' }"
                            @click="switchChart('pie')">
                            🏅 运动项目分布
                        </button>
                        <button class="chart-tab-btn" :class="{ active: currentChart === 'bar' }"
                            @click="switchChart('bar')">
                            ⏰ 运动高峰时段
                        </button>
                        <button class="chart-tab-btn" :class="{ active: currentChart === 'wordCloud' }"
                            @click="switchChart('wordCloud')">
                            ☁️ 热门运动项目
                        </button>
                    </div>

                    <div class="charts-container">
                        <div v-show="currentChart === 'line'" class="chart-item">
                            <h4>📈 近7天场地使用率趋势</h4>
                            <div ref="lineChart" class="chart-canvas"></div>
                        </div>
                        <div v-show="currentChart === 'pie'" class="chart-item">
                            <h4>🏅 运动项目参与占比</h4>
                            <div ref="pieChart" class="chart-canvas"></div>
                        </div>
                        <div v-show="currentChart === 'bar'" class="chart-item">
                            <h4>⏰ 每日运动高峰时段</h4>
                            <div ref="barChart" class="chart-canvas"></div>
                        </div>
                        <div v-show="currentChart === 'wordCloud'" class="chart-item">
                            <h4>☁️ 热门运动项目关键词</h4>
                            <div ref="wordCloudChart" class="chart-canvas"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-secondary" @click="closeModal">关闭</button>
                <button class="btn btn-primary" @click="navigateToGym">🗺️ 导航到此</button>
                <button class="btn btn-info" @click="openFullScreenData" v-if="activeTab === 'data'">
                    📊 查看完整大屏
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick, getCurrentInstance } from 'vue';

const props = defineProps({
    show: Boolean
});
const emit = defineEmits(['close', 'navigate', 'open-full-screen-data']);

const activeTab = ref('rules');
const currentChart = ref('line');

// 模拟数据
const todayVisitors = ref(1520);
const currentVisitors = ref(680);
const todayBookings = ref(142);
const fieldUsage = ref(82);

const lineChart = ref(null);
const pieChart = ref(null);
const barChart = ref(null);
const wordCloudChart = ref(null);

let lineChartInstance = null;
let pieChartInstance = null;
let barChartInstance = null;
let wordCloudChartInstance = null;

const { proxy } = getCurrentInstance();

// 折线图配置 - 场地使用率趋势
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
        data: [75, 82, 78, 88, 85, 62, 58],
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

// 饼图配置 - 运动项目参与占比
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
            { name: '篮球', value: 35 },
            { name: '羽毛球', value: 25 },
            { name: '健身', value: 20 },
            { name: '游泳', value: 12 },
            { name: '其他', value: 8 }
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

// 柱状图配置 - 运动高峰时段
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
        data: ['6-8点', '8-10点', '10-12点', '14-16点', '16-18点', '18-20点', '20-22点'],
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
        data: [280, 150, 100, 180, 520, 480, 320],
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

// 词云图配置 - 热门运动项目关键词
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
            { name: '篮球', value: 1500 },
            { name: '羽毛球', value: 1200 },
            { name: '健身', value: 1100 },
            { name: '游泳', value: 1000 },
            { name: '跑步', value: 950 },
            { name: '足球', value: 900 },
            { name: '乒乓球', value: 850 },
            { name: '瑜伽', value: 800 },
            { name: '网球', value: 750 },
            { name: '排球', value: 700 },
            { name: '动感单车', value: 650 },
            { name: '力量训练', value: 600 },
            { name: '有氧运动', value: 550 },
            { name: '器械训练', value: 500 },
            { name: '自由泳', value: 480 },
            { name: '蛙泳', value: 450 },
            { name: '蝶泳', value: 420 },
            { name: '仰泳', value: 400 },
            { name: '拉伸', value: 380 },
            { name: '热身', value: 350 },
            { name: '三分球', value: 320 },
            { name: '扣球', value: 300 },
            { name: '发球', value: 280 },
            { name: '接球', value: 260 },
            { name: '传球', value: 240 }
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
        currentChart.value = 'line';
        nextTick(() => {
            initCharts();
        });
    }
};

const switchChart = (chartType) => {
    currentChart.value = chartType;
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

watch(() => props.show, (newVal) => {
    if (newVal && activeTab.value === 'data') {
        nextTick(() => {
            initCharts();
        });
    }
});

const closeModal = () => emit('close');
const navigateToGym = () => emit('navigate');

const openFullScreenData = () => {
    const fullScreenWindow = window.open('', '_blank', 'width=1920,height=1080');
    const fullScreenContent = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>西南交通大学体育馆 - 数据可视化大屏</title>
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
            🏟️ 西南交通大学体育馆 - 数据可视化大屏
        </div>
        <div class="data-overview">
            <div class="data-card">
                <div class="data-title">今日运动人数</div>
                <div class="data-value">${todayVisitors.value}</div>
            </div>
            <div class="data-card">
                <div class="data-title">当前在场人数</div>
                <div class="data-value">${currentVisitors.value}</div>
            </div>
            <div class="data-card">
                <div class="data-title">今日预约场次</div>
                <div class="data-value">${todayBookings.value}</div>
            </div>
            <div class="data-card">
                <div class="data-title">场地使用率</div>
                <div class="data-value">${fieldUsage.value}%</div>
            </div>
        </div>
        <div class="charts-area">
            <div class="chart-container">
                <div class="chart-title">📈 近7天场地使用率趋势</div>
                <div id="lineChart" class="chart-canvas"></div>
            </div>
            <div class="chart-container">
                <div class="chart-title">🏅 运动项目参与占比</div>
                <div id="pieChart" class="chart-canvas"></div>
            </div>
            <div class="chart-container">
                <div class="chart-title">⏰ 每日运动高峰时段</div>
                <div id="barChart" class="chart-canvas"></div>
            </div>
            <div class="chart-container">
                <div class="chart-title">☁️ 热门运动项目关键词</div>
                <div id="wordCloudChart" class="chart-canvas"></div>
            </div>
        </div>
    </div>
    <script>
            window.onload = function() {
                const lineChart = echarts.init(document.getElementById('lineChart'));
                lineChart.setOption(${JSON.stringify(lineChartOption.value)});
                
                const pieChart = echarts.init(document.getElementById('pieChart'));
                pieChart.setOption(${JSON.stringify(pieChartOption.value)});
                
                const barChart = echarts.init(document.getElementById('barChart'));
                barChart.setOption(${JSON.stringify(barChartOption.value)});
                
                const wordCloudChart = echarts.init(document.getElementById('wordCloudChart'));
                wordCloudChart.setOption(${JSON.stringify(wordCloudOption.value)});
                
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
.gym-modal-overlay {
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

.gym-modal {
    background: white;
    border-radius: 16px;
    width: 90%;
    max-width: 900px;
    max-height: 85vh;
    overflow-y: auto;
    position: relative;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
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

.btn-info {
    background: linear-gradient(90deg, #6a11cb, #2575fc);
    color: white;
}

.btn-info:hover {
    box-shadow: 0 4px 12px rgba(106, 17, 203, 0.3);
}

.gym-modal::-webkit-scrollbar {
    width: 6px;
}

.gym-modal::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 3px;
}

.gym-modal::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
}

.gym-modal::-webkit-scrollbar-thumb:hover {
    background: #999;
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
    height: 280px;
    background: transparent;
    padding: 15px;
}

@media (max-width: 768px) {
    .gym-modal {
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
