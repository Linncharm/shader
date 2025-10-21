import * as THREE from 'three'
import { ShaderScene } from './three-utils.js'
import { loadVertexShader, loadFragmentShader } from './shader-loader.js'

export async function startDemo1ThreeJS(canvas: HTMLCanvasElement) {
  // 创建Three.js场景
  const shaderScene = new ShaderScene(canvas)
  
  // 设置uniforms
  const uniforms = {
    u_resolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) }
  }
  
  // 加载shader文件
  const vertexShader = await loadVertexShader('basic')
  const fragmentShader = await loadFragmentShader('gradient')
  
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