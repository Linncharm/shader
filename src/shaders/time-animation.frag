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