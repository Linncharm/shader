import * as THREE from 'three'
import { ShaderScene } from './three-utils.js'
import { loadVertexShader, loadFragmentShader } from './shader-loader.js'

export async function startDemo3SDFShapes(canvas: HTMLCanvasElement) {
  const shaderScene = new ShaderScene(canvas)
  
  const uniforms = {
    u_resolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
    u_time: { value: 0.0 }
  }
  
  // 加载shader文件
  const vertexShader = await loadVertexShader('basic')
  const fragmentShader = await loadFragmentShader('sdfShapes')
  
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
  
  console.log('Demo 3: SDF图形绘制 - 已启动!')
  console.log('动态圆形、旋转矩形和缩放圆角矩形，带有光晕效果')
  
  return () => {
    window.removeEventListener('resize', handleResize)
    shaderScene.dispose()
  }
}