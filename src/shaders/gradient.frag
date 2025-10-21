uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  // 基于位置创建颜色渐变
  // x坐标 (-1到1) 映射到红色分量 (0到1)  
  float r = uv.x;
  // y坐标 (-1到1) 映射到绿色分量 (0到1)
  float g = uv.y;
  // 蓝色固定为0.8
  float b = 0.8;
  
  gl_FragColor = vec4(r, g, b, 1.0);
}