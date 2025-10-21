import { createShader, createProgram, resizeCanvasToDisplaySize } from './webgl-utils.js'

// 顶点着色器 - 定义几何形状
const vertexShaderSource = `
attribute vec4 a_position;
varying vec2 v_position;

void main() {
  gl_Position = a_position;
  v_position = a_position.xy;
}
`

// 片段着色器 - 定义颜色
const fragmentShaderSource = `
precision mediump float;
varying vec2 v_position;

void main() {
  // 基于位置创建颜色渐变
  // x坐标 (-1到1) 映射到红色分量 (0到1)  
  float r = (v_position.x + 1.0) * 0.5;
  // y坐标 (-1到1) 映射到绿色分量 (0到1)
  float g = (v_position.y + 1.0) * 0.5;
  // 蓝色固定为0.8
  float b = 0.8;
  
  gl_FragColor = vec4(r, g, b, 1.0);
}
`

export function startDemo1(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl')
  if (!gl) {
    console.error('WebGL not supported')
    return
  }

  // 创建着色器
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
  
  if (!vertexShader || !fragmentShader) return

  // 创建程序
  const program = createProgram(gl, vertexShader, fragmentShader)
  if (!program) return

  // 创建全屏四边形的顶点数据
  const positions = new Float32Array([
    -1, -1,  // 左下
     1, -1,  // 右下
    -1,  1,  // 左上
    -1,  1,  // 左上
     1, -1,  // 右下
     1,  1,  // 右上
  ])

  // 创建缓冲区
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

  // 渲染函数
  function render() {
    resizeCanvasToDisplaySize(canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)

    // 设置位置属性
    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // 绘制
    gl.drawArrays(gl.TRIANGLES, 0, 6)
  }

  render()
  console.log('Demo 1: 颜色渐变 - 已启动!')
  console.log('红色从左到右渐变，绿色从下到上渐变')
}