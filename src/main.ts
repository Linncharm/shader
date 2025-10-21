import { startDemo1ThreeJS } from './demo1-threejs-gradient.js'
import { startDemo2TimeAnimation } from './demo2-time-animation.js'
import { startDemo3SDFShapes } from './demo3-sdf-shapes.js'
import { startDemo4WaveEffects } from './demo4-wave-effects.js'
import { startDemo5AdvancedSDF } from './demo5-advanced-sdf.js'

function main() {
  console.log('🎨 Shader 学习项目启动! (Three.js版本)')
  console.log('阶段2和阶段3的所有demo已完成')
  
  // 启动Demo 1: 颜色渐变
  const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement
  if (canvas1) {
    startDemo1ThreeJS(canvas1)
  } else {
    console.error('Canvas1 not found!')
  }
  
  // 启动Demo 2: 时间动画
  const canvas2 = document.getElementById('canvas2') as HTMLCanvasElement
  if (canvas2) {
    startDemo2TimeAnimation(canvas2)
  } else {
    console.error('Canvas2 not found!')
  }
  
  // 启动Demo 3: SDF图形绘制
  const canvas3 = document.getElementById('canvas3') as HTMLCanvasElement
  if (canvas3) {
    startDemo3SDFShapes(canvas3)
  } else {
    console.error('Canvas3 not found!')
  }
  
  // 启动Demo 4: 波浪效果
  const canvas4 = document.getElementById('canvas4') as HTMLCanvasElement
  if (canvas4) {
    startDemo4WaveEffects(canvas4)
  } else {
    console.error('Canvas4 not found!')
  }
  
  // 启动Demo 5: 高级SDF技术
  const canvas5 = document.getElementById('canvas5') as HTMLCanvasElement
  if (canvas5) {
    startDemo5AdvancedSDF(canvas5)
  } else {
    console.error('Canvas5 not found!')
  }
}

// 等待DOM加载完成
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main)
} else {
  main()
}