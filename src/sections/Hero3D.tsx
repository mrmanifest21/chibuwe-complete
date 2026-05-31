import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const YELLOW = '#FFC107'
const WORD_LIST = [
  'CHIBUWE', 'CONSTRUCTION', 'BUILDING', 'EXCELLENCE', 'RENOVATIONS',
  'FOUNDATIONS', 'ROOFING', 'PLUMBING', 'ELECTRICAL', 'PAINTING',
  'TILING', 'CARPENTRY', 'PAVING', 'CONCRETE', 'SANDTON',
  'SOUTH AFRICA', 'QUALITY', 'TRUST', 'PROFESSIONAL', 'SKILLED',
  'CHIBUWE', 'BUILD', 'DREAM', 'HOME', 'FUTURE',
  'CHIBUWE', 'PROJECTS', 'EXPERTS', 'NHBRC', 'CHIBUWE',
  'STRENGTH', 'DURABLE', 'RELIABLE', 'SAFE', 'CHIBUWE',
  'INNOVATE', 'DESIGN', 'CREATE', 'TRANSFORM', 'CHIBUWE',
]
const COLORS = [YELLOW, '#ffffff', '#FFD54F', '#eeeeee']
const WORD_COUNT = 240
const RADIUS = 600

function getWordColor(index: number): string { return COLORS[index % COLORS.length] }

function createWordTexture(text: string, color: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  canvas.width = 512
  canvas.height = 128
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.font = 'bold 64px Arial, sans-serif'
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)
  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

function createWords() {
  const words = []
  for (let i = 0; i < WORD_COUNT; i++) {
    const phi = Math.acos(-1 + (2 * i) / WORD_COUNT)
    const theta = Math.sqrt(WORD_COUNT * Math.PI) * phi
    const word = WORD_LIST[i % WORD_LIST.length]
    words.push({ text: word, theta, phi, index: i })
  }
  return words
}

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000)
    camera.position.set(0, 0, 1200)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(0x0a0a0a, 1)
    container.appendChild(renderer.domElement)

    const textGroup = new THREE.Group()
    scene.add(textGroup)

    const words = createWords()
    const wordMeshes: THREE.Mesh[] = []

    words.forEach((wordData) => {
      const texture = createWordTexture(wordData.text, getWordColor(wordData.index))
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide, depthWrite: false })
      const geometry = new THREE.PlaneGeometry(180, 45)
      const mesh = new THREE.Mesh(geometry, material)
      const r = RADIUS
      const x = r * Math.sin(wordData.phi) * Math.cos(wordData.theta)
      const y = r * Math.cos(wordData.phi)
      const z = r * Math.sin(wordData.phi) * Math.sin(wordData.theta)
      mesh.position.set(x, y, z)
      mesh.lookAt(new THREE.Vector3(0, 0, 0))
      textGroup.add(mesh)
      wordMeshes.push(mesh)
    })

    const mouse = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()

    function onMouseMove(event: MouseEvent) {
      if (!container) return
      const rect = container.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(textGroup.children, false)
      const hovered = new Set(intersects.map((h) => h.object))
      textGroup.children.forEach((child) => {
        const mesh = child as THREE.Mesh
        const target = hovered.has(mesh) ? 1.4 : 1
        mesh.scale.x += (target - mesh.scale.x) * 0.1
        mesh.scale.y += (target - mesh.scale.y) * 0.1
        mesh.scale.z += (target - mesh.scale.z) * 0.1
      })
    }

    container.addEventListener('mousemove', onMouseMove)

    function animate() {
      frameRef.current = requestAnimationFrame(animate)
      textGroup.rotation.y += 0.003
      textGroup.rotation.x += 0.001
      renderer.render(scene, camera)
    }
    animate()

    function onResize() {
      const c = containerRef.current
      if (!c) return
      camera.aspect = c.clientWidth / c.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(c.clientWidth, c.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameRef.current)
      container.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      wordMeshes.forEach((mesh) => {
        mesh.geometry.dispose()
        ;(mesh.material as THREE.MeshBasicMaterial).map?.dispose()
        ;(mesh.material as THREE.MeshBasicMaterial).dispose()
      })
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative w-full" style={{ height: '100vh' }}>
      <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '70%', background: 'linear-gradient(to top, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.7) 50%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />
      <div className="absolute bottom-0 left-0 z-10 w-full" style={{ padding: '0 40px 100px', maxWidth: '900px' }}>
        <span className="font-barlowCondensed uppercase block mb-3" style={{ fontSize: '13px', color: '#FFC107', letterSpacing: '4px' }}>
          NHBRC Registered &middot; Since 2006
        </span>
        <h1 className="font-teko text-white uppercase leading-none" style={{ fontSize: 'clamp(42px, 7vw, 90px)', textShadow: '0 2px 20px rgba(0,0,0,0.6)', letterSpacing: '2px' }}>
          BUILDING SOUTH AFRICA'S FUTURE
        </h1>
        <p className="font-barlow text-white mt-5" style={{ fontSize: 'clamp(16px, 1.5vw, 20px)', maxWidth: '550px', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
          From foundation to finish — quality construction you can trust. Two decades of excellence in residential, commercial, and industrial projects across South Africa.
        </p>
        <button
          onClick={() => scrollTo('contact')}
          className="mt-8 font-barlow font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
          style={{ padding: '18px 48px', fontSize: '14px', letterSpacing: '3px', backgroundColor: '#FFC107', color: '#000000', boxShadow: '0 8px 30px rgba(255,193,7,0.3)' }}
        >
          GET A FREE QUOTE
        </button>
      </div>
    </section>
  )
}
