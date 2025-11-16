import { createApp } from 'vue'
import App from './App.vue'

// 引入 ECharts
import * as echarts from 'echarts'
import 'echarts-wordcloud'

// 动态加载百度地图 API
function loadBaiduMap() {
    return new Promise((resolve, reject) => {
        if (window.BMapGL) {
            resolve(window.BMapGL)
            return
        }

        const ak = import.meta.env.VITE_BAIDU_MAP_AK
        if (!ak) {
            console.error('百度地图 AK 未配置，请在 .env 文件中设置 VITE_BAIDU_MAP_AK')
            reject(new Error('百度地图 AK 未配置'))
            return
        }

        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${ak}`
        script.onerror = reject
        script.onload = () => {
            resolve(window.BMapGL)
        }
        document.head.appendChild(script)
    })
}

// 先加载百度地图，再初始化 Vue 应用
loadBaiduMap()
    .then(() => {
        const app = createApp(App)
        app.config.globalProperties.$echarts = echarts
        app.mount('#app')
    })
    .catch((error) => {
        console.error('百度地图加载失败:', error)
        alert('地图加载失败，请检查网络连接或联系管理员')
    })