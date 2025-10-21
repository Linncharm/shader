import * as THREE from 'three'
import { ShaderScene } from './three-utils.js'
import { loadVertexShader, loadFragmentShader } from './shader-loader.js'

export async function startDemo2TimeAnimation(canvas: HTMLCanvasElement) {
  const shaderScene = new ShaderScene(canvas)
  
  // 设置uniforms，包含时间参数
  const uniforms = {
    u_resolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
    u_time: { value: 0.0 }
  }
  
  // 加载shader文件
  const vertexShader = await loadVertexShader('basic')
  const fragmentShader = await loadFragmentShader('timeAnimation')
  
  shaderScene.createShaderMaterial(vertexShader, fragmentShader, uniforms)
  
  // 处理窗口大小调整
  function handleResize() {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    shaderScene.setSize(width, height)
  }
  
  window.addEventListener('resize', handleResize)
  
  // 渲染循环 - 更新时间
  function animate() {
    // 更新时间uniform
    if (shaderScene.material && shaderScene.material.uniforms.u_time) {
      shaderScene.material.uniforms.u_time.value = performance.now() * 0.001
    }
    
    shaderScene.render()
    requestAnimationFrame(animate)
  }
  
  animate()
  
  console.log('Demo 2: 时间动画 - 已启动!')
  console.log('波浪图案随时间变化，颜色在三种色彩间循环')
  
  return () => {
    window.removeEventListener('resize', handleResize)
    shaderScene.dispose()
  }
}