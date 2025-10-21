uniform vec2 u_resolution;
uniform float u_time;

// SDF距离函数
float sdCircle(vec2 p, float r) {
  return length(p) - r;
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdRoundedBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
}

// 平滑最小值函数 - 用于图形混合
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution.xy * 0.5) / min(u_resolution.x, u_resolution.y);
  
  float time = u_time * 0.8;
  
  // 创建多个动态图形
  vec2 center1 = vec2(sin(time) * 0.3, cos(time * 1.2) * 0.2);
  vec2 center2 = vec2(cos(time * 0.8) * 0.4, sin(time * 0.6) * 0.3);
  vec2 center3 = vec2(sin(time * 1.5) * 0.2, cos(time * 0.9) * 0.4);
  
  // 圆形
  float circle = sdCircle(uv - center1, 0.15);
  
  // 旋转的矩形
  float angle = time;
  vec2 rotatedUV = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * (uv - center2);
  float box = sdRoundedBox(rotatedUV, vec2(0.12, 0.08), 0.02);
  
  // 缩放的圆角矩形
  float scale = 0.8 + 0.4 * sin(time * 2.0);
  float roundedBox = sdRoundedBox((uv - center3) / scale, vec2(0.1, 0.15), 0.03) * scale;
  
  // 使用平滑最小值混合图形
  float shape = smin(circle, box, 0.1);
  shape = smin(shape, roundedBox, 0.08);
  
  // 创建渐变背景
  vec3 bgColor = vec3(0.1, 0.1, 0.2);
  
  // 图形颜色
  vec3 shapeColor = vec3(
    0.8 + 0.2 * sin(time + uv.x * 3.0),
    0.6 + 0.3 * cos(time * 1.3 + uv.y * 2.0),
    0.9 + 0.1 * sin(time * 0.7)
  );
  
  // 边缘光晕效果
  float glow = exp(-abs(shape) * 8.0) * 0.5;
  vec3 glowColor = vec3(0.3, 0.7, 1.0);
  
  // 最终颜色混合
  vec3 color = bgColor;
  
  // 内部填充
  color = mix(color, shapeColor, 1.0 - smoothstep(-0.01, 0.01, shape));
  
  // 添加光晕
  color += glowColor * glow;
  
  // 边缘高光
  float edge = abs(shape);
  color += vec3(1.0) * (1.0 - smoothstep(0.0, 0.02, edge)) * 0.3;
  
  gl_FragColor = vec4(color, 1.0);
}