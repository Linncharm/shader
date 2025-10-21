import * as THREE from 'three'
import { ShaderScene } from './three-utils.js'

// 顶点着色器 - Three.js会自动处理position等属性
const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// 片段着色器 - 基于屏幕坐标创建颜色渐变
const fragmentShader = `
uniform vec2 u_resolution;

void main() {
  // 将屏幕坐标归一化到 0-1 范围
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  // 创建颜色渐变
  // 红色从左到右渐变
  float r = uv.x;
  // 绿色从下到上渐变  
  float g = uv.y;
  // 蓝色固定
  float b = 0.8;
  
  gl_FragColor = vec4(r, g, b, 1.0);
}
`

export function startDemo1ThreeJS(canvas: HTMLCanvasElement) {
  // 创建Three.js场景
  const shaderScene = new ShaderScene(canvas)
  
  // 设置uniforms
  const uniforms = {
    u_resolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) }
  }
  
  // 创建shader材质
  shaderScene.createShaderMaterial(vertexShader, fragmentShader, uniforms)
  
  // 处理窗口大小调整
  function handleResize() {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    shaderScene.setSize(width, height)
  }
  
  // 监听窗口大小变化
  window.addEventListener('resize', handleResize)
  
  // 渲染循环
  function animate() {
    shaderScene.render()
    requestAnimationFrame(animate)
  }
  
  // 开始渲染
  animate()
  
  console.log('Demo 1 (Three.js): 颜色渐变 - 已启动!')
  console.log('红色从左到右渐变，绿色从下到上渐变')
  
  // 返回清理函数
  return () => {
    window.removeEventListener('resize', handleResize)
    shaderScene.dispose()
  }
}