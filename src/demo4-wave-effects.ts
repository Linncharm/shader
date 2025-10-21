import * as THREE from 'three'
import { ShaderScene } from './three-utils.js'
import { loadVertexShader, loadFragmentShader } from './shader-loader.js'

export async function startDemo4WaveEffects(canvas: HTMLCanvasElement) {
  const shaderScene = new ShaderScene(canvas)
  
  const uniforms = {
    u_resolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
    u_time: { value: 0.0 }
  }
  
  // 加载shader文件
  const vertexShader = await loadVertexShader('basic')
  const fragmentShader = await loadFragmentShader('waveEffects')
  
  shaderScene.createShaderMaterial(vertexShader, fragmentShader, uniforms)
  
  function handleResize() {
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    shaderScene.setSize(width, height)
  }
  
  window.addEventListener('resize', handleResize)
  
  function animate() {
    if (shaderScene.material && shaderScene.material.uniforms.u_time) {
      shaderScene.material.uniforms.u_time.value = performance.now() * 0.001
    }
    
    shaderScene.render()
    requestAnimationFrame(animate)
  }
  
  animate()
  
  console.log('Demo 4: 波浪效果 - 已启动!')
  console.log('同心圆波浪、水平/垂直波浪、干涉图案的复合效果')
  
  return () => {
    window.removeEventListener('resize', handleResize)
    shaderScene.dispose()
  }
}