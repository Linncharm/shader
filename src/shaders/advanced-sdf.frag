uniform vec2 u_resolution;
uniform float u_time;

// 基础SDF函数
float sdCircle(vec2 p, float r) {
  return length(p) - r;
}

float sdBox(vec2 p, vec2 b) {
  vec2 d = abs(p) - b;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdHexagon(vec2 p, float r) {
  const vec3 k = vec3(-0.866025404, 0.5, 0.577350269);
  p = abs(p);
  p -= 2.0 * min(dot(k.xy, p), 0.0) * k.xy;
  p -= vec2(clamp(p.x, -k.z * r, k.z * r), r);
  return length(p) * sign(p.y);
}

float sdStar(vec2 p, float r, int n, float m) {
  float an = 3.141592653 / float(n);
  float en = 3.141592653 / m;
  vec2 acs = vec2(cos(an), sin(an));
  vec2 ecs = vec2(cos(en), sin(en));
  
  float bn = mod(atan(p.x, p.y), 2.0 * an) - an;
  p = length(p) * vec2(cos(bn), abs(sin(bn)));
  p -= r * acs;
  p += ecs * clamp(-dot(p, ecs), 0.0, r * acs.y / ecs.y);
  return length(p) * sign(p.x);
}

// SDF操作函数
float opUnion(float d1, float d2) {
  return min(d1, d2);
}

float opSubtraction(float d1, float d2) {
  return max(-d1, d2);
}

float opIntersection(float d1, float d2) {
  return max(d1, d2);
}

float opSmoothUnion(float d1, float d2, float k) {
  float h = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
  return mix(d2, d1, h) - k * h * (1.0 - h);
}

float opSmoothSubtraction(float d1, float d2, float k) {
  float h = clamp(0.5 - 0.5 * (d2 + d1) / k, 0.0, 1.0);
  return mix(d2, -d1, h) + k * h * (1.0 - h);
}

// 重复操作
vec2 opRep(vec2 p, vec2 c) {
  return mod(p + 0.5 * c, c) - 0.5 * c;
}

// 扭曲操作
vec2 opTwist(vec2 p, float k) {
  float c = cos(k * p.y);
  float s = sin(k * p.y);
  mat2 m = mat2(c, -s, s, c);
  return m * p;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - u_resolution.xy * 0.5) / min(u_resolution.x, u_resolution.y);
  
  float time = u_time * 0.5;
  
  // 创建复杂的SDF组合
  vec2 p = uv;
  
  // 主要图形：扭曲的六边形
  vec2 twistedP = opTwist(p * 2.0, sin(time) * 2.0);
  float mainShape = sdHexagon(twistedP, 0.3);
  
  // 重复的小圆形作为装饰
  vec2 repP = opRep(p * 6.0 + vec2(sin(time * 0.7), cos(time * 0.5)), vec2(1.0));
  float dots = sdCircle(repP, 0.1);
  
  // 旋转的星形
  float angle = time * 0.8;
  vec2 rotatedP = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * (p + vec2(0.3, 0.2));
  float star = sdStar(rotatedP, 0.15, 5, 2.5);
  
  // 动态框架
  vec2 frameP = p + vec2(sin(time * 1.2) * 0.1, cos(time * 0.9) * 0.1);
  float frame = opSubtraction(sdBox(frameP, vec2(0.35)), sdBox(frameP, vec2(0.45)));
  
  // 组合所有形状
  float shape = mainShape;
  
  // 从主形状中减去点阵
  shape = opSmoothSubtraction(dots, shape, 0.05);
  
  // 添加星形
  shape = opSmoothUnion(shape, star, 0.08);
  
  // 添加框架
  shape = opUnion(shape, frame);
  
  // 颜色计算
  vec3 color = vec3(0.1, 0.1, 0.2); // 背景色
  
  // 主形状颜色
  vec3 shapeColor = vec3(
    0.6 + 0.4 * sin(time + uv.x * 2.0),
    0.7 + 0.3 * cos(time * 1.3 + uv.y * 1.5),
    0.8 + 0.2 * sin(time * 0.7 + length(uv))
  );
  
  // 边缘检测
  float edge = abs(shape);
  
  // 内部填充
  color = mix(color, shapeColor, 1.0 - smoothstep(-0.01, 0.01, shape));
  
  // 边缘发光
  float glow = exp(-edge * 12.0) * 0.6;
  vec3 glowColor = vec3(0.9, 0.5, 1.0);
  color += glowColor * glow;
  
  // 边缘高光
  color += vec3(1.0) * (1.0 - smoothstep(0.0, 0.02, edge)) * 0.4;
  
  // 添加噪声纹理
  float noise = fract(sin(dot(uv * 20.0, vec2(12.9898, 78.233))) * 43758.5453);
  color += vec3(noise) * 0.05;
  
  // 径向渐变背景
  float radial = 1.0 - length(uv) * 0.8;
  color *= radial;
  
  gl_FragColor = vec4(color, 1.0);
}