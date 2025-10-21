import * as THREE from 'three'
import { ShaderScene } from './three-utils.js'

// 顶点着色器
const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// 片段着色器 - 时间驱动的动态颜色
const fragmentShader = `
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  // 使用时间创建动态效果
  float time = u_time * 0.5;
  
  // 创建波浪效果
  float wave1 = sin(uv.x * 10.0 + time) * 0.5 + 0.5;
  float wave2 = cos(uv.y * 8.0 + time * 1.5) * 0.5 + 0.5;
  
  // 混合波浪创建复杂图案
  float pattern = wave1 * wave2;
  
  // 颜色随时间变化
  vec3 color1 = vec3(0.2, 0.7, 0.9); // 蓝色
  vec3 color2 = vec3(0.9, 0.4, 0.7); // 粉色
  vec3 color3 = vec3(0.3, 0.9, 0.3); // 绿色
  
  // 使用时间在三种颜色间插值
  float colorTime = sin(time) * 0.5 + 0.5;
  vec3 finalColor;
  
  if (colorTime < 0.5) {
    finalColor = mix(color1, color2, colorTime * 2.0);
  } else {
    finalColor = mix(color2, color3, (colorTime - 0.5) * 2.0);
  }
  
  // 应用图案调制
  finalColor *= (pattern * 0.7 + 0.3);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`

export function startDemo2TimeAnimation(canvas: HTMLCanvasElement) {
  const shaderScene = new ShaderScene(canvas)
  
  // 设置uniforms，包含时间参数
  const uniforms = {
    u_resolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
    u_time: { value: 0.0 }
  }
  
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