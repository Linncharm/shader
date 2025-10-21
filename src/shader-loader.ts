// Shader文件加载器
export async function loadShader(path: string): Promise<string> {
  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`Failed to load shader: ${path}`)
    }
    return await response.text()
  } catch (error) {
    console.error('Error loading shader:', error)
    throw error
  }
}

// 预定义的shader路径
export const SHADER_PATHS = {
  vertex: {
    basic: './shaders/basic.vert'
  },
  fragment: {
    gradient: './shaders/gradient.frag',
    timeAnimation: './shaders/time-animation.frag',
    sdfShapes: './shaders/sdf-shapes.frag',
    waveEffects: './shaders/wave-effects.frag',
    advancedSdf: './shaders/advanced-sdf.frag'
  }
} as const

// 便捷的加载函数
export async function loadVertexShader(name: keyof typeof SHADER_PATHS.vertex): Promise<string> {
  return loadShader(SHADER_PATHS.vertex[name])
}

export async function loadFragmentShader(name: keyof typeof SHADER_PATHS.fragment): Promise<string> {
  return loadShader(SHADER_PATHS.fragment[name])
}