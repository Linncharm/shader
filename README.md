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
│   ├── three-utils.ts           # Three.js工具类
│   ├── demo1-threejs-gradient.ts # Demo 1 Three.js实现
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
2. **ShaderMaterial**: 理解Three.js的自定义着色器材质系统
3. **Uniform系统**: 掌握如何向shader传递参数
4. **实践为主**: 修改shader代码，观察效果变化
5. **循序渐进**: 按照学习路线逐步深入

## 🎓 Three.js vs 原生WebGL

- **Three.js版本**: 代码更简洁，专注shader逻辑，易于扩展
- **原生WebGL版本**: 保留在项目中供对比学习，理解底层原理

开始你的Shader学习之旅吧! 🚀