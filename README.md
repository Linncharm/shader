# 🎨 Shader 学习项目

一个循序渐进的WebGL Shader学习项目，使用TypeScript + pnpm构建。

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建项目
pnpm build
```

## 📚 学习路线

### 阶段1: 基础入门 (已完成)
- [x] **Demo 1: 颜色渐变** - 基于位置的颜色变化

### 阶段2: 动画效果 (待完成)
- [ ] Demo 2: 时间动画 - 基于时间的动态颜色变化
- [ ] Demo 3: 波浪效果 - 正弦波动画

### 阶段3: 图形绘制 (待完成)
- [ ] Demo 4: 基本图形 - 圆形、矩形绘制
- [ ] Demo 5: 距离场 - SDF距离场技术

### 阶段4: 纹理与变换 (待完成)
- [ ] Demo 6: 图片纹理 - 纹理贴图应用
- [ ] Demo 7: UV操作 - 纹理坐标变换

### 阶段5: 高级效果 (待完成)
- [ ] Demo 8: 光照效果 - 基础光照模型
- [ ] Demo 9: 后处理 - 模糊、边缘检测等
- [ ] Demo 10: 粒子系统 - GPU粒子效果

## 🎯 当前Demo详解

### Demo 1: 颜色渐变 (Three.js版本)
- **ShaderMaterial**: Three.js的自定义着色器材质
- **Fragment Shader**: 使用gl_FragCoord获取屏幕坐标
- **Uniform传值**: 通过uniform传递分辨率等参数
- **核心概念**: 
  - Three.js渲染管线
  - ShaderScene工具类封装
  - 屏幕空间坐标系统
  - uniform变量系统

## 📁 项目结构

```
shader/
├── src/
│   ├── shaders/                 # GLSL着色器文件目录
│   │   ├── basic.vert           # 通用顶点着色器
│   │   ├── gradient.frag        # Demo 1: 颜色渐变片段着色器
│   │   ├── time-animation.frag  # Demo 2: 时间动画片段着色器
│   │   ├── sdf-shapes.frag      # Demo 3: SDF图形片段着色器
│   │   ├── wave-effects.frag    # Demo 4: 波浪效果片段着色器
│   │   └── advanced-sdf.frag    # Demo 5: 高级SDF片段着色器
│   ├── three-utils.ts           # Three.js工具类
│   ├── shader-loader.ts         # GLSL文件加载器
│   ├── demo1-threejs-gradient.ts # Demo 1 实现
│   ├── demo2-time-animation.ts   # Demo 2 实现
│   ├── demo3-sdf-shapes.ts       # Demo 3 实现
│   ├── demo4-wave-effects.ts     # Demo 4 实现
│   ├── demo5-advanced-sdf.ts     # Demo 5 实现
│   ├── demo1-color-gradient.ts   # Demo 1 原生WebGL实现(保留)
│   ├── webgl-utils.ts           # 原生WebGL工具函数(保留)
│   ├── main.ts                  # 主入口文件
│   └── index.html               # HTML页面
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 技术栈

- **TypeScript** - 类型安全的JavaScript
- **Three.js** - WebGL渲染引擎和工具库
- **Vite** - 快速构建工具
- **pnpm** - 高效包管理器

## 💡 学习建议

1. **Three.js优势**: 简化WebGL操作，专注于shader逻辑
2. **GLSL文件管理**: 使用独立的.glsl文件更好地组织shader代码
3. **ShaderMaterial**: 理解Three.js的自定义着色器材质系统
4. **Uniform系统**: 掌握如何向shader传递参数
5. **实践为主**: 修改shader代码，观察效果变化
6. **循序渐进**: 按照学习路线逐步深入

## 🎓 项目特色

- **模块化shader**: 每个shader都保存在独立的.glsl文件中
- **异步加载**: 使用fetch API动态加载shader文件
- **Three.js集成**: 完美结合Three.js的渲染管线
- **原生WebGL对比**: 保留原生实现供学习参考

## 🔧 Shader文件结构

- **顶点着色器(.vert)**: 处理顶点位置变换
- **片段着色器(.frag)**: 处理像素颜色计算
- **shader-loader.ts**: 统一的GLSL文件加载工具

开始你的Shader学习之旅吧! 🚀