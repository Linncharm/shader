import * as THREE from 'three'
import { ShaderScene } from './three-utils.js'

// 顶点着色器
const vertexShader = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// 片段着色器 - 波浪效果
const fragmentShader = `
uniform vec2 u_resolution;
uniform float u_time;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 center = vec2(0.5, 0.5);
  
  float time = u_time * 0.6;
  
  // 从中心点到当前像素的距离
  float dist = distance(uv, center);
  
  // 创建同心圆波浪
  float concentricWave = sin(dist * 20.0 - time * 8.0) * 0.5 + 0.5;
  
  // 创建水平波浪
  float horizontalWave = sin(uv.y * 15.0 + time * 3.0) * 0.3 + 0.7;
  
  // 创建垂直波浪
  float verticalWave = cos(uv.x * 12.0 + time * 2.5) * 0.3 + 0.7;
  
  // 创建对角波浪
  float diagonal = (uv.x + uv.y) * 0.5;
  float diagonalWave = sin(diagonal * 18.0 + time * 4.0) * 0.4 + 0.6;
  
  // 创建干涉图案
  vec2 pos1 = vec2(0.3 + sin(time * 0.8) * 0.1, 0.3 + cos(time * 1.2) * 0.1);
  vec2 pos2 = vec2(0.7 + sin(time * 1.1) * 0.1, 0.7 + cos(time * 0.9) * 0.1);
  
  float wave1 = sin(distance(uv, pos1) * 25.0 - time * 6.0);
  float wave2 = sin(distance(uv, pos2) * 25.0 - time * 6.0);
  float interference = (wave1 + wave2) * 0.3 + 0.4;
  
  // 混合不同的波浪效果
  float finalWave = concentricWave * 0.3 + 
                   horizontalWave * 0.2 + 
                   verticalWave * 0.2 + 
                   diagonalWave * 0.15 + 
                   interference * 0.15;
  
  // 创建基于波浪的颜色
  vec3 baseColor = vec3(0.1, 0.3, 0.6); // 深蓝色
  vec3 waveColor = vec3(0.4, 0.8, 1.0); // 浅蓝色
  vec3 peakColor = vec3(1.0, 1.0, 1.0); // 白色波峰
  
  // 根据波浪强度混合颜色
  vec3 color = mix(baseColor, waveColor, finalWave);
  
  // 添加波峰高光
  float peak = smoothstep(0.8, 1.0, finalWave);
  color = mix(color, peakColor, peak * 0.6);
  
  // 添加深度感 - 边缘稍微暗一些
  float edge = 1.0 - smoothstep(0.0, 0.3, min(distance(uv, vec2(0.0, 0.5)), 
                                               distance(uv, vec2(1.0, 0.5))));
  color *= edge * 0.3 + 0.7;
  
  // 添加微妙的彩虹效果
  float rainbow = sin(finalWave * 6.28318 + time) * 0.1;
  color.r += rainbow;
  color.g += rainbow * 0.8;
  
  gl_FragColor = vec4(color, 1.0);
}
`

export function startDemo4WaveEffects(canvas: HTMLCanvasElement) {
  const shaderScene = new ShaderScene(canvas)
  
  const uniforms = {
    u_resolution: { value: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight) },
    u_time: { value: 0.0 }
  }
  
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