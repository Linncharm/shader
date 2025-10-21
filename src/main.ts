import { startDemo1ThreeJS } from './demo1-threejs-gradient.js'

function main() {
  console.log('🎨 Shader 学习项目启动! (Three.js版本)')
  
  // 启动Demo 1: 颜色渐变 (Three.js版本)
  const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement
  if (canvas1) {
    startDemo1ThreeJS(canvas1)
  } else {
    console.error('Canvas1 not found!')
  }
}

// 等待DOM加载完成
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main)
} else {
  main()
}