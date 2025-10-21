import { startDemo1 } from './demo1-color-gradient.js'

function main() {
  console.log('🎨 Shader 学习项目启动!')
  
  // 启动Demo 1: 颜色渐变
  const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement
  if (canvas1) {
    startDemo1(canvas1)
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