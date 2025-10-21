import * as THREE from 'three'
import { ShaderScene } from './three-utils.js'
import { loadVertexShader, loadFragmentShader } from './shader-loader.js'

export async function startDemo5AdvancedSDF(canvas: HTMLCanvasElement) {
  const shaderScene = new ShaderScene(canvas)
  
  const uniforms = {
    u_resolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
    u_time: { value: 0.0 }
  }
  
  // 加载shader文件
  const vertexShader = await loadVertexShader('basic')
  const fragmentShader = await loadFragmentShader('advancedSdf')
  
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
  
  console.log('Demo 5: 高级SDF技术 - 已启动!')
  console.log('六边形+星形+重复图案+扭曲变形+布尔运算的复合效果')
  
  return () => {
    window.removeEventListener('resize', handleResize)
    shaderScene.dispose()
  }
}