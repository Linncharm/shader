import * as THREE from 'three'

export class ShaderScene {
  scene: THREE.Scene
  camera: THREE.OrthographicCamera
  renderer: THREE.WebGLRenderer
  material: THREE.ShaderMaterial | null = null
  geometry: THREE.PlaneGeometry
  mesh: THREE.Mesh | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene()
    
    // 使用正交相机创建全屏效果
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    
    this.renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true 
    })
    this.renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    
    // 创建全屏平面几何体
    this.geometry = new THREE.PlaneGeometry(2, 2)
  }

  createShaderMaterial(vertexShader: string, fragmentShader: string, uniforms: any = {}) {
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    })
    
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
    
    return this.material
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  setSize(width: number, height: number) {
    this.renderer.setSize(width, height)
    
    // 更新shader中的分辨率uniform
    if (this.material && this.material.uniforms.u_resolution) {
      this.material.uniforms.u_resolution.value.set(width, height)
    }
  }

  dispose() {
    this.geometry.dispose()
    if (this.material) this.material.dispose()
    this.renderer.dispose()
  }
}