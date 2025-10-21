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

### Demo 1: 颜色渐变
- **顶点着色器**: 定义全屏四边形
- **片段着色器**: 基于屏幕坐标生成颜色
- **核心概念**: 
  - 坐标系统 (-1到1)
  - 颜色分量映射
  - varying变量传递

## 📁 项目结构

```
shader/
├── src/
│   ├── webgl-utils.ts      # WebGL工具函数
│   ├── demo1-color-gradient.ts  # Demo 1实现
│   ├── main.ts             # 主入口文件
│   └── index.html          # HTML页面
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 技术栈

- **TypeScript** - 类型安全的JavaScript
- **Vite** - 快速构建工具
- **WebGL** - 底层图形API
- **pnpm** - 高效包管理器

## 💡 学习建议

1. **理解坐标系**: WebGL使用归一化设备坐标 (-1到1)
2. **掌握着色器**: 顶点着色器处理几何，片段着色器处理颜色
3. **实践为主**: 修改代码参数，观察效果变化
4. **循序渐进**: 按照学习路线逐步深入

开始你的Shader学习之旅吧! 🚀