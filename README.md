# 🗺️ 西南交通大学智慧校园地图系统

一个基于 Vue 3 + 百度地图 API 的智能校园导航与信息查询系统，集成了 3D 地图展示、场馆信息查询、数据可视化大屏等功能。

## ✨ 功能特性

### 🗺️ 地图核心功能
- **3D/2D 地图切换**：支持平面与立体视图自由切换
- **实时定位**：获取用户当前位置并在地图上标注
- **智能搜索**：支持校园建筑、POI 点位搜索
- **路线导航**：提供步行/驾车两种导航模式
- **场地预约**：集成场地预约与信息查询

### 🏛️ 校园场馆系统
#### 📚 图书馆模块
- 开放时间、借阅规则、座位预约
- 近7天座位使用率趋势图
- 图书分类借阅占比统计
- 借阅高峰时段分析
- 热门搜索关键词云

#### 🍽️ 食堂模块
- 营业时间、就餐规则、餐厅设施
- 餐桌使用率实时监控
- 菜品分类销售占比
- 就餐高峰时段统计
- 热门菜品关键词云

#### 🏟️ 体育馆模块
- 场地开放时间、使用规则
- 场地使用率趋势分析
- 运动项目参与占比
- 运动高峰时段统计
- 热门运动项目词云

### 📊 数据可视化
- **ECharts 图表**：折线图、饼图、柱状图、词云图
- **全屏大屏模式**：支持独立窗口展示完整数据看板
- **实时数据更新**：模拟真实场景的动态数据展示

## 🛠️ 技术栈

- **前端框架**：Vue 3 (Composition API)
- **构建工具**：Vite 5.x
- **地图服务**：百度地图 GL API
- **数据可视化**：Apache ECharts 5.4.3
- **词云插件**：echarts-wordcloud 2.1.0
- **样式方案**：原生 CSS (Scoped)

## 📦 环境配置

### 前置要求
- **Node.js**：>= 16.0.0（推荐 18.x 或 20.x LTS 版本）
- **npm**：>= 8.0.0 或 **pnpm**：>= 8.0.0
- **浏览器**：Chrome 90+、Edge 90+、Firefox 88+、Safari 14+

### 依赖版本
```json
{
  "vue": "^3.4.21",
  "vite": "^5.2.0",
  "echarts": "^5.4.3",
  "echarts-wordcloud": "^2.1.0"
}
```

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd VueCode
```

### 2. 安装依赖
使用 npm：
```bash
npm install
```

或使用 pnpm（推荐，更快）：
```bash
pnpm install
```

### 3. 配置百度地图 API

#### 3.1 复制环境变量模板
```bash
cp .env.example .env
```

或在 Windows PowerShell 中：
```powershell
Copy-Item .env.example .env
```

#### 3.2 配置你的百度地图 AK
在 `.env` 文件中填入你的百度地图 AK：
```env
VITE_BAIDU_MAP_AK=你的百度地图AK
```

> 💡 **获取百度地图 AK**：
> 1. 访问 [百度地图开放平台](https://lbsyun.baidu.com/)
> 2. 注册/登录账号
> 3. 进入"控制台" → "应用管理" → "我的应用"
> 4. 点击"创建应用"，选择"浏览器端"类型
> 5. 复制生成的 AK 密钥并粘贴到 `.env` 文件中

> ⚠️ **重要提示**：
> - `.env` 文件包含敏感信息，已被 `.gitignore` 忽略，不会提交到 Git
> - 请勿将你的 AK 密钥分享给他人或提交到公开仓库
> - 如果 AK 泄露，请立即在百度地图控制台重新生成

### 4. 启动开发服务器
```bash
npm run dev
```

或使用 pnpm：
```bash
pnpm dev
```

访问：http://localhost:5173

### 5. 构建生产版本
```bash
npm run build
```

构建产物将生成在 `dist/` 目录下。

### 6. 预览生产构建
```bash
npm run preview
```

## 📂 项目结构

```
VueCode/
├── public/                 # 静态资源
│   ├── p1.png             # 当前位置图标
│   ├── 图书馆.jpg          # 图书馆标记
│   ├── gym.png            # 体育馆标记
│   └── canteen.png        # 食堂标记
├── src/
│   ├── components/        # 组件目录
│   │   ├── Map.vue       # 地图主组件
│   │   ├── Sidebar.vue   # 侧边栏搜索组件
│   │   └── Topbar.vue    # 顶部导航栏
│   ├── views/            # 页面视图
│   │   ├── LibraryModal.vue  # 图书馆信息弹窗
│   │   ├── GymModal.vue      # 体育馆信息弹窗
│   │   └── CanteenModal.vue  # 食堂信息弹窗
│   ├── App.vue           # 根组件
│   └── main.js           # 入口文件
├── index.html            # HTML 模板
├── vite.config.js        # Vite 配置
├── package.json          # 项目依赖
└── README.md             # 项目说明
```

## 🎨 核心组件说明

### Map.vue
地图核心组件，负责：
- 百度地图初始化（3D/2D 模式）
- POI 标记点管理
- 路线规划与导航
- 用户定位与交互

### LibraryModal.vue / GymModal.vue / CanteenModal.vue
场馆信息弹窗组件，包含：
- 基本信息展示
- 使用规则说明
- ECharts 数据可视化
- 全屏大屏模式

### Sidebar.vue
侧边栏搜索组件：
- 地点搜索
- 搜索结果展示
- 地图定位联动

## 🔧 配置说明

### Vite 配置 (vite.config.js)
```javascript
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,        // 开发服务器端口
    open: true,        // 自动打开浏览器
    host: '0.0.0.0'    // 允许局域网访问
  },
  build: {
    outDir: 'dist',    // 构建输出目录
    assetsDir: 'assets',
    sourcemap: false   // 生产环境不生成 sourcemap
  }
})
```

### ECharts 全局注册 (main.js)
```javascript
import * as echarts from 'echarts';
import 'echarts-wordcloud';

app.config.globalProperties.$echarts = echarts;
```

## 📊 数据可视化说明

### 图表类型
- **折线图**：趋势分析（使用率、人流量等）
- **饼图**：占比统计（分类占比）
- **柱状图**：时段对比（高峰期分析）
- **词云图**：热度展示（关键词频率）

### 全屏大屏模式
点击"查看完整大屏"按钮，系统会在新窗口中打开完整的数据可视化看板，包含：
- 4个核心数据指标卡片
- 4个交互式图表（2x2 网格布局）
- 自适应响应式布局
- 实时数据更新

## 🌐 浏览器兼容性

| 浏览器  | 版本要求 | 说明                     |
| ------- | -------- | ------------------------ |
| Chrome  | >= 90    | ✅ 完全支持               |
| Edge    | >= 90    | ✅ 完全支持               |
| Firefox | >= 88    | ✅ 完全支持               |
| Safari  | >= 14    | ⚠️ 部分 3D 效果可能有差异 |
| IE      | ❌        | 不支持                   |

## 🐛 常见问题

### 1. 地图无法显示
- 检查百度地图 AK 是否正确配置
- 确认网络连接正常
- 查看浏览器控制台是否有跨域错误

### 2. 图表不显示
- 确认 ECharts 库已正确安装
- 检查 `main.js` 中是否正确注册了 ECharts
- 确认词云插件 `echarts-wordcloud` 已安装

### 3. 定位失败
- 检查浏览器是否允许获取地理位置权限
- 确认设备支持地理定位功能
- 尝试使用 HTTPS 协议访问

### 4. 搜索无结果
- 确认搜索关键词正确
- 检查百度地图 API 配额是否充足
- 尝试搜索更具体的地点名称

## 📝 开发建议

### 性能优化
- 使用 `v-show` 而非 `v-if` 切换图表显示
- 图表实例复用，避免重复创建
- 地图标记点使用虚拟化处理大量数据

### 代码规范
- 组件命名使用 PascalCase
- 事件命名使用 kebab-case
- CSS 类名使用 BEM 命名规范

### 调试技巧
```javascript
// 在浏览器控制台调试地图相关功能
console.log('当前地图实例:', map);
console.log('所有标记点:', allMarkers);
console.log('图表实例:', lineChartInstance);
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

## 📮 联系方式

如有问题或建议，欢迎通过以下方式联系：
- 📧 Email: your-email@example.com
- 💬 Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

**⭐ 如果觉得项目有帮助，请给个 Star 支持一下！**